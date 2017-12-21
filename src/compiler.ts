import * as fs from 'fs'
import { JSONSchema4 } from 'json-schema';

const s: JSONSchema4 = JSON.parse(fs.readFileSync(process.argv[2]).toString()) as JSONSchema4;

const definitions: string[] = [];

compileSchema("#", s, new Map(), definitions);
console.log(definitions.join("\n\n"));

function lookupPath(path: string): JSONSchema4 {
    let parts = path.split("/");
    parts.shift(); // remove #
    let root: any = s;
    for (const part of parts) {
        root = root[part];
    }
    return root;
}

function compileSchema(path: string, schema: JSONSchema4, pathToType: Map<string, string>, buffer: string[]): string {
    if (pathToType.has(path)) {
        return pathToType.get(path)!;
    }

    //
    // Primitives
    //
    const primitiveAttempt = tryCompilePrimitive(schema);
    if (primitiveAttempt) {
        return primitiveAttempt;
    }

    //
    // Name
    //
    const name = schema.title || cleanse(path);
    if (name === undefined) {
        throw new Error("cant find name for ");
    }
    // Set is done here to prevent infinite recursion later on.
    pathToType.set(path, name);

    //
    // Refs
    //
    if (schema.$ref) {
        return compileSchema(schema.$ref, lookupPath(schema.$ref), pathToType, buffer);
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
            const req = requiredFields.has(p) ? "" : "?";
            return `${p}${req}: ${compileSchema(`${path}/${p}`, s_properties[p], pathToType, buffer)}`
        });
    }

    //
    // AdditionalProperties
    //
    let additionalName: string | undefined;;
    if (schema.additionalProperties === true) { return "any /* actually any */" }
    if (schema.additionalProperties) {
        additionalName = compileSchema(`${path}/additionalProperties/`, schema.additionalProperties, pathToType, buffer)
    }
    const additionalModifier = additionalName ? `& ${additionalName}` : "";

    //
    // Comments
    //
    const comment = schema.description ? `/** ${schema.description} */` : "";


    //
    // Type
    //
    buffer.push(`
            ${comment}
            type ${name} = {
                ${fields.join(",\n")}
            } ${additionalModifier};
        `.trim());

    return name;
}

function tryCompilePrimitive(schema: JSONSchema4): string | null {
    if (Array.isArray(schema.type)) {
        return schema.type
            .map(a => tryCompilePrimitive({ 'type': a }))
            .filter(a => a != null) // TODO: warn on this
            .join(" | ");
    }

    switch (schema.type) {
        case "number": return "number";
        case "integer": return "number";
        case "null": return "null";
        case "boolean": return "boolean";
        case "string": {
            if (schema.enum) {
                return schema.enum.map(a => `"${a}"`).join("|");
            }
            return "string"
        }
    }
    return null;
}

function cleanse(s: string): string {
    return s.replace(/[^a-zA-Z]/g, "");
}
