import { AssertionError } from "assert";
import { JSONSchema4 } from "json-schema";
import { Schema } from "./compiler";

export function cleanse(s: string): string {
    return s.replace(/[^a-zA-Z0-9_]/g, "");
}

export function toTitleCase(str: string) {
    return str.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1); });
}

export function assert(condition: boolean, message?: string, bonus?: any): void {
    if (!condition) {
        const b = bonus ? JSON.stringify(bonus, null, 2) : "";
        const m = `${message || "Assert Failed!"} ${b}`;
        throw new AssertionError({ message: m });
    }
}

export function tryGetGoodName(path: string, schema: Schema): string | null {
    let type = schema.properties && schema.properties.type;
    if (type) {
        if (type.enum && type.enum.length >= 1) {
            let ret = cleanse(type.enum[0] as string);
            if (schema.description && cleanse(schema.description) === ret) {
                return ret + "Resource"
            }
            return ret;
        }
    }
    return null;
}

export function is_blacklisted(path: string, schema: Schema): boolean {
    if (schema.description === "Microsoft.ServerManagement/nodes/sessions") {
        return true;
    }
    return false;
}

export function clone<T>(a: T): T {
    return JSON.parse(JSON.stringify(a));
}
