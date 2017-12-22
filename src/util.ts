import { AssertionError } from "assert";
import { JSONSchema4 } from "json-schema";
import { Schema } from "./compiler";

export function cleanse(s: string): string {
    const splitted = s.split("/");
    s = splitted.map(toTitleCase).join("_");
    return s.replace(/[^a-zA-Z0-9_]/g, "");
}

export function toTitleCase(str: string) {
    str = str.trim();
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
    const split = path.split("/");
    split.shift();

    //
    // #/../properties/type
    //
    let type = schema.properties && schema.properties.type;
    if (type) {
        if (type.enum && type.enum.length >= 1) {
            let ret = cleanse(type.enum[0] as string);
            if (schema.description && cleanse(schema.description) === ret) {
                return toTitleCase(ret + "Resource");
            }
            return toTitleCase(ret);
        }
    }

    //
    // #/definitions/{name}
    //
    if (split[0] === 'definitions' && split.length == 2) {
        return toTitleCase(split[1]);
    }

    //
    // #/{name}
    //
    if (split.length == 1) {
        return toTitleCase(split[0]);
    }

    //
    // #/../{name} if name isn't AllOf/AnyOf/OneOf and is a valid identifier
    //
    const last = split[split.length - 1];
    if (last &&
        !/^(AllOf|AnyOf|OneOf).*$/.test(last) &&
        /^[A-Za-z_][0-9A-Za-z_]+$/.test(last) &&
        last !== "object") {

        return toTitleCase(last);
    }

    return null;
}

export function is_blacklisted(path: string, schema: Schema): boolean {
    return false;
}

export function clone<T>(a: T): T {
    return JSON.parse(JSON.stringify(a));
}
