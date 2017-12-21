import * as fs from 'fs'
import { JSONSchema4 } from 'json-schema';
import { EmitContext } from './emitContext';

const input_file = process.argv[2];
const output_file = process.argv[3];
const s: JSONSchema4 = JSON.parse(fs.readFileSync(process.argv[2]).toString()) as JSONSchema4;

const emitContext = new EmitContext()

compileSchema("#", s, emitContext);
fs.writeFileSync(output_file, emitContext.emit());

function lookupPath(path: string): JSONSchema4 {
    let parts = path.split("/");
    parts.shift(); // remove #
    let root: any = s;
    for (const part of parts) {
        root = root[part];
    }
    return root;
}

function compileSchema(path: string, schema: JSONSchema4, emitContext: EmitContext): string {
    const already_compiled = emitContext.lookup(path);
    if (already_compiled) {
        return already_compiled;
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
    emitContext.preregister(path, schema);

    //
    // Refs
    //
    if (schema.$ref) {
        return compileSchema(schema.$ref, lookupPath(schema.$ref), emitContext);
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
            return `${p}${req}: ${compileSchema(`${path}/${p}`, s_properties[p], emitContext)}`
        });
    }

    //
    // AdditionalProperties
    //
    let additionalName: string | undefined;;
    if (schema.additionalProperties === true) { return "any /* actually any */" }
    if (schema.additionalProperties) {
        additionalName = compileSchema(`${path}/additionalProperties/`, schema.additionalProperties, emitContext)
    }
    const additionalModifier = additionalName ? `& ${additionalName}` : "";

    //
    // Comments
    //


    //
    // Type
    //
    return emitContext.add(
        path,
        `
        {
            ${fields.join(",\n")}
        } ${additionalModifier};
        `.trim(),
        schema);
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

