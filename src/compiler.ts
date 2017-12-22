import * as fs from 'fs'
import { JSONSchema4 } from 'json-schema';
import { EmitContext } from './emitContext';
import { fail } from 'assert';
import { assert, is_blacklisted, clone, cleanse } from './util';

export type Schema = Readonly<JSONSchema4>;

const input_file = process.argv[2];
const output_file = process.argv[3];
const s: Schema = JSON.parse(fs.readFileSync(process.argv[2]).toString()) as Schema;

const emitContext = new EmitContext()

compileSchema("#", s, emitContext, true);
fs.writeFileSync(output_file, emitContext.emit());

function lookupPath(path: string): Schema {
    let parts = path.split("/");
    parts.shift(); // remove #
    let root: any = s;
    for (const part of parts) {
        root = root[part];
    }
    return root;
}

function compileSchema(path: string, schema: Schema, emitContext: EmitContext, shouldDeclare: boolean): string {
    const already_compiled = emitContext.lookup(path);
    if (already_compiled) {
        return already_compiled;
    }

    //
    // Blacklisted
    //
    if (is_blacklisted(path, schema)) {
        return "any /*blacklisted*/";
    }

    //
    // Primitives
    //
    const primitiveAttempt = tryCompilePrimitive(schema);
    if (primitiveAttempt) {
        return primitiveAttempt;
    }

    //
    // Pre-register (done to prevent infinite cycles)
    //
    if (shouldDeclare) {
        emitContext.preregister(path, schema);
    }

    //
    // Refs
    //
    if (schema.$ref) {
        return compileSchema(schema.$ref, lookupPath(schema.$ref), emitContext, true);
    }

    //
    // Array
    //
    if (schema.type === 'array') {
        if (schema.items === undefined) { return "any[]"; }

        assert(
            !Array.isArray(schema.items),
            "did not expect array item to be an array.");

        const contents = compileSchema(path + "Value", schema.items as Schema, emitContext, false);
        return emitContext.add(path, `(${contents})[]`, schema);
    }

    //
    // Operators
    //
    const joinOperator = (op: string, appender: string, schemas: Schema[], merger: Schema | null): string => {
        return schemas.map((s, i) => {
            if (merger !== null) {
                s = Object.assign(Object.assign({}, merger), s);
            }
            return compileSchema(path + `/${appender}${i}`, s, emitContext, true);
        }).join(op)
    };

    if (schema.anyOf || schema.oneOf) {
        let out: string;
        if (schema.properties || schema.additionalItems || schema.additionalProperties) {
            let cloned = clone(schema) as JSONSchema4;
            cloned.anyOf = undefined;
            cloned.oneOf = undefined;
            out = joinOperator('|', "AnyOfValue", (schema.anyOf || schema.oneOf) as Schema[], cloned);
        } else {
            out = joinOperator('|', "AnyOfValue", (schema.anyOf || schema.oneOf) as Schema[], null);
        }
        return emitContext.add(path, out, schema);
    }

    if (schema.allOf) {
        let out: string;
        if (schema.properties || schema.additionalItems || schema.additionalProperties) {
            let cloned = clone(schema) as JSONSchema4;
            cloned.anyOf = undefined;
            cloned.oneOf = undefined;
            out = joinOperator('&', "AllOfValue", schema.allOf, cloned);
        } else {
            out = joinOperator('&', "AllOfValue", schema.allOf, null);
        }
        return emitContext.add(path, out, schema);
    }

    //
    // Properties
    //
    let fields: string[] = [];
    if (schema.properties) {
        const s_properties = schema.properties;
        const requiredFields = new Set(schema.required || []);
        const properties = Object.keys(schema.properties);
        fields = properties.map(p => {
            const psan = cleanse(p);
            const req = requiredFields.has(p) ? "" : "?";
            return `${psan}${req}: ${compileSchema(`${path}/${p}`, s_properties[p], emitContext, true)}`
        });
    }

    //
    // AdditionalProperties
    //
    let additionalName: string | undefined;;
    if (schema.additionalProperties) {
        if (schema.additionalProperties === true) {
            fields.push("[p: string]: any")
        } else {
            additionalName = compileSchema(`${path}/additionalProperties/`, schema.additionalProperties, emitContext, true);
            fields.push(`[p: string]: ${additionalName}`)
        }
    }

    //
    // Type
    //
    let type = `
{
    ${fields.join(",\n    ")}
}
    `;

    if (fields.length === 0 && additionalName === undefined) {
        let p = path.split("/");
        console.log([p.pop()].reverse(), schema);
    }

    if (shouldDeclare) {
        return emitContext.add(
            path,
            type.trim(),
            schema);
    } else {
        return type.trim();
    }
}

function tryCompilePrimitive(schema: Schema): string | null {
    if (Array.isArray(schema.type)) {
        return schema.type
            .map(a => tryCompilePrimitive({ 'type': a }))
            .filter(a => a != null) // TODO: warn on this
            .join(" | ");
    }

    if (schema.enum) {
        return schema.enum.map(a => `"${a}"`).join(" | ");
    }

    /// Only has a description field
    if (schema.description && Object.keys(schema).length === 1) {
        const desc_hack = descriptionHack(schema.description);
        if (desc_hack) { return desc_hack; }
    }

    if (Object.keys(schema).length === 0) {
        return "any"
    }

    switch (schema.type) {
        case "number": return "number";
        case "integer": return "number";
        case "null": return "null";
        case "boolean": return "boolean";
        case "string": return "string";
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

function descriptionHack(description: string): string | null {
    const explicitTypeRegex = /Type: (string|integer|number|boolean|object)/;
    const explicitResult = explicitTypeRegex.exec(description);
    if (explicitResult) {
        return tryCompilePrimitive({ type: explicitResult[1] } as Schema);
    }

    if (/The default value is (false|true)/.test(description)) {
        return tryCompilePrimitive({ type: 'boolean' } as Schema);
    }

    return null;
}
