import { fail } from "assert";
import { execSync } from "child_process";
import { bgBlue, bgYellow, black } from "colors/safe";
import * as fs from "fs";
import { JSONSchema4 } from "json-schema";
import { EmitContext } from "./emitContext";
import { assert, cleanse, clone, isResource, toTitleCase, tryGetGoodName } from "./util";

export type Schema = Readonly<JSONSchema4>;

const inputFile = process.argv[2];
const outputFile = process.argv[3];
const whitelistFile = process.argv[4];

const whitelistContents = fs.readFileSync(whitelistFile).toString();
const whitelist = new Set(
    whitelistContents
        .split("\n")
        .map(s => s.trim())
        .filter(a => a.length !== 0)
        .map(s => toTitleCase(cleanse(s) + "Resource")));
const targetSchema: Schema = JSON.parse(fs.readFileSync(inputFile).toString()) as Schema;
const globalEmitContext = new EmitContext();
const locationCache: Map<string, Schema> = new Map();

compileSchema("#", targetSchema, globalEmitContext, true, null);
fs.writeFileSync(outputFile, globalEmitContext.emit());

// Takes a path and finds the correlating schema in the targetSchema
function lookupPath(path: string): Schema {
    const parts = path.split("/");
    parts.shift(); // remove "#" symbol from the front
    let root: any = targetSchema;
    for (const part of parts) {
        root = root[part];
    }
    return root;
}

function lookupLocation(typ: string, name: string, schema: Schema): Schema {
    const combined = `${typ}/${name}`;
    if (locationCache.has(combined)) {
        return locationCache.get(combined)!;
    }

    console.log(bgBlue(black(" INFO ")), `Querying azure for ${schema.description} locations`);

    const query = `az provider show -n ${typ} --query "resourceTypes[?resourceType=='${name}'].locations"`;
    const betterLocations: string[][] = JSON.parse(execSync(query).toString());
    let ret: Schema;
    if (betterLocations.length === 0) {
        ret = {
            type: "string",
        };
    } else {
        ret = {
            description: `Locations available for ${schema.description}`,
            anyOf: betterLocations[0].map(a => ({
                type: "string",
                enum: [a],
            } as Schema)),
        };
    }

    locationCache.set(combined, ret);

    return ret;
}

function compileSchema(path: string, schema: Schema, emitContext: EmitContext, shouldDeclare: boolean, insideResource: string | null): string {
    const alreadyCompiled = emitContext.lookup(path);
    if (alreadyCompiled) {
        return alreadyCompiled;
    }

    //
    // Ways to back out of shouldDeclare = false
    //

    // Back out if you are a resource
    const goodNameAttempt = tryGetGoodName(path, schema, insideResource);
    if (goodNameAttempt && isResource(goodNameAttempt)) {
        insideResource = goodNameAttempt.replace("Resource", "").replace("Microsoft", "");
        shouldDeclare = true;

        // Don't include any resource groups that arent in the whitelist.
        // By returning early here, you avoid emitting any dependencies.
        if (!whitelist.has(goodNameAttempt)) {
            console.warn(black(bgYellow(" WARNING ")), `skipping ${goodNameAttempt}`);
            return "never";
        }
        if (schema.description && /[a-zA-Z]+\.[a-zA-Z]+\/[a-zA-Z]+/.test(schema.description)) {
            const [typ, name] = schema.description.split("/");
            (schema as any).properties.location = lookupLocation(typ, name, schema);
        }
    }
    // If it's good enough for a comment, it's good enough for a type!
    if (schema.description) {
        shouldDeclare = true;
    }

    //
    // Primitives
    //
    const primitiveAttempt = tryCompilePrimitive(schema);
    if (primitiveAttempt) {
        return primitiveAttempt;
    }
    // Abandon empty objects
    if (Object.keys(schema).length === 0) {
        return "any";
    }

    //
    // Pre-register (done to prevent infinite cycles)
    //
    if (shouldDeclare) {
        emitContext.preregister(path, schema, insideResource);
    }

    //
    // Refs
    //
    if (schema.$ref) {
        return compileSchema(schema.$ref, lookupPath(schema.$ref), emitContext, true, insideResource);
    }

    //
    // Array
    //
    if (schema.type === "array") {
        if (schema.items === undefined) { return "any[]"; }

        assert(
            !Array.isArray(schema.items),
            "did not expect array item to be an array.");
        const shouldDeclareArray = tryGetGoodName(path, schema, insideResource) === "Resources";
        const contents = compileSchema(path + "Value", schema.items as Schema, emitContext, shouldDeclareArray, insideResource);
        return emitContext.add(path, `(${contents})[]`, schema, insideResource);
    }

    //
    // Operators
    //
    const joinOperator = (op: string, appender: string, schemas: Schema[], merger: Schema | null): string => {
        let ret = schemas.map((s, i) => {
            if (merger !== null) {
                s = Object.assign(Object.assign({}, merger), s);
            }
            return compileSchema(path + `/${appender}${i}`, s, emitContext, false, insideResource);
        }).join(op);
        ret = `(${ret})`;

        if (shouldDeclare || schemas.length > 4) {
            return emitContext.add(path, ret, schema, insideResource);
        } else {
            return ret;
        }
    };

    if (schema.anyOf || schema.oneOf || schema.allOf) {
        assert((!(schema.anyOf || schema.oneOf) && !!schema.allOf) ||
            (!!(schema.anyOf || schema.oneOf) && !schema.allOf));

        const operator = (schema.anyOf || schema.oneOf) ? "|" : "&";
        const name = (schema.anyOf || schema.oneOf) ? "AnyOfValue" : "AllOfValue";
        if (schema.properties || schema.additionalItems || schema.additionalProperties) {
            const cloned = clone(schema) as JSONSchema4;
            cloned.anyOf = undefined;
            cloned.oneOf = undefined;
            cloned.allOf = undefined;
            return joinOperator(operator, name, (schema.anyOf || schema.oneOf || schema.allOf) as Schema[], cloned);
        } else {
            return joinOperator(operator, name, (schema.anyOf || schema.oneOf || schema.allOf) as Schema[], null);
        }
    }

    //
    // Properties
    //
    let fields: string[] = [];
    if (schema.properties) {
        const sProperties = schema.properties;
        const requiredFields = new Set(schema.required || []);
        const properties = Object.keys(schema.properties);
        fields = properties.map((p) => {
            const propName = /^[$_a-zA-Z][$_a-zA-Z0-9]*$/.test(p) ? p : `"${p}"`;
            const req = requiredFields.has(p) ? "" : "?";
            return `${propName}${req}: ${compileSchema(`${path}/${p}`, sProperties[p], emitContext, false, insideResource)}`;
        });
    }

    //
    // AdditionalProperties
    //
    let additionalName: string | undefined;
    if (schema.additionalProperties) {
        if (schema.additionalProperties === true) {
            fields.push("[p: string]: any");
        } else {
            additionalName = compileSchema(
                `${path}/additionalProperties/`,
                schema.additionalProperties,
                emitContext,
                false,
                insideResource);
            fields.push(`[p: string]: ${additionalName}`);
        }
    }

    //
    // Type
    //
    const type = `
{
    ${fields.join(",\n    ")}
}
    `;

    if (fields.length === 0 && additionalName === undefined) {
        const p = path.split("/");
        console.warn(black(bgYellow(" WARNING ")), "nothing to do for", p.pop(), schema);
    }

    if (shouldDeclare) {
        return emitContext.add(
            path,
            type.trim(),
            schema,
            insideResource);
    } else {
        return type.trim();
    }
}

function tryCompilePrimitive(schema: Schema): string | null {
    if (Array.isArray(schema.type)) {
        return schema.type
            .map((a) => tryCompilePrimitive({ type: a }))
            .filter((a) => a != null) // TODO: warn on this
            .join(" | ");
    }

    if (schema.enum) {
        return schema.enum.map((a) => `"${a}"`).join(" | ");
    }

    /// Only has a description field
    if ((schema.description && Object.keys(schema).length === 1) ||
        (schema.description && Object.keys(schema).length === 2 && schema.type)) {
        const descHack = descriptionHack(schema.description);
        if (descHack) { return descHack; }
    }

    switch (schema.type) {
        case "number": return "number";
        case "integer": return "number";
        case "null": return "null";
        case "boolean": return "boolean";
        case "string": {
            if (schema.description && schema.description.startsWith("Deployment template expression.")) {
                // We never use deployment template expressions, so instead of allowing practically every
                // property to also be a string, we cut that all out.
                return "never";
            } else {
                return "string";
            }
        }
        case "object": {
            // If this is an object that only has "type: object",
            if (Object.keys(schema).length === 1) {
                return "any";
            } else {
                break;
            }
        }
    }
    return null;
}

// Some of the types in the schema are things like
// * { description: "Type: string" }
// * { description: "The default value is true" }
// Why this is done, no one knows, but we can catch it and turn them into actual types.
function descriptionHack(description: string): string | null {
    const explicitTypeRegex = /Type: (string|integer|number|boolean|object)/;
    const explicitResult = explicitTypeRegex.exec(description);
    if (explicitResult) {
        return tryCompilePrimitive({ type: explicitResult[1] } as Schema);
    }

    if (/The default value is (false|true)/.test(description)) {
        return tryCompilePrimitive({ type: "boolean" } as Schema);
    }

    if (description === "Name-value pairs to add to the resource") {
        return "{[p: string]: any}";
    }
    if (description.indexOf("can be any valid JSON object") !== -1) {
        return "any";
    }
    if (description === "Variable definitions") {
        return "never";
    }
    if (description === "The properties of a replication.") {
        return "never";
    }

    return null;
}
