import { AssertionError } from "assert";
import { JSONSchema4 } from "json-schema";
import { Schema } from "./compiler";

export function cleanse(s: string): string {
    return s.replace(/[^a-zA-Z0-9_$]/g, "");
}

// `foo/bar/baz` -> `Foo_Bar_Baz`
export function toTitleCase(str: string): string {
    str = str.trim();
    const splitted = str.split("/");
    return splitted.map(s => s.charAt(0).toUpperCase() + s.substr(1)).join("_");
}

export function assert(condition: boolean, message?: string, bonus?: any): void {
    if (!condition) {
        const b = bonus ? JSON.stringify(bonus, null, 2) : "";
        const m = `${message || "Assert Failed!"} ${b}`;
        throw new AssertionError({ message: m });
    }
}

// Returns true if the name is one that tryGetGoodName would return for a resource.
export function isResource(name: string): boolean {
    return /Resource[0-9]*$/.test(name);
}

// Attempts to choose a good name for the type at `path` with schema `schema`.
// The name doesn't need to be unique, and it doesn't *really* need to be good.
// Decent heuristics are all that are necessary.
export function tryGetGoodName(path: string, schema: Schema): string | null {
    const split = path.split("/");
    split.shift(); // remove #

    //
    // #/../properties/type
    //
    const type = schema.properties && schema.properties.type;
    if (type) {
        if (type.enum && type.enum.length >= 1) {
            const before = type.enum[0] as string;
            const ret = cleanse(before as string);
            if (before.startsWith("Microsoft.")) {
                return toTitleCase(ret + "Resource");
            }
            return toTitleCase(ret);
        }
    }

    //
    // #/definitions/{name}
    //
    if (split[0] === "definitions" && split.length === 2) {
        return toTitleCase(split[1]);
    }

    //
    // #/{name}
    //
    if (split.length === 1) {
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

// Copies a POD.
export function clone<T>(a: T): T {
    return JSON.parse(JSON.stringify(a));
}
