import { JSONSchema4 } from "json-schema";


class Module {
    submodules: Map<string, Module> = new Map();
    definitions: Map<string, string> = new Map();

    add(path: string[], definition: string) {
        if (path.length == 1) {
            this.definitions.set(path[0], definition);
        } else {
            let submodule = path.shift() as string;
            if (!this.submodules.has(submodule)) {
                this.submodules.set(submodule, new Module());
            }
            this.submodules.get(submodule)!.add(path, definition);
        }
    }

    emit(): string {
        const submoduleEmit = Array.from(this.submodules.entries()).map(a => {
            let [name, module] = a;
            return `export module ${name} {${module.emit()}}`;
        }).join("\n\n");

        const definitionEmit = Array.from(this.definitions.values()).map(d =>
            d
        ).join("\n\n");

        return submoduleEmit + "\n\n" + definitionEmit;
    }
}

export class EmitContext {
    root: Module = new Module();
    defined: Map<string, string> = new Map();

    private calculateDotted(path: string, schema: JSONSchema4): [string, string] {
        const parts = path.split("/");
        parts.shift(); // remove #
        let name = schema.title || cleanse(parts.pop() as string)
        name = toTitleCase(name);
        parts.push(name);

        return [parts.join("."), name];
    }

    preregister(path: string, schema: JSONSchema4) {
        const [dottedPath, _name] = this.calculateDotted(path, schema);
        this.defined.set(path, dottedPath);
    }

    lookup(path: string): string | null {
        if (this.defined.has(path)) {
            return this.defined.get(path)!;
        } else {
            return null;
        }
    }

    add(path: string, definition: string, schema: JSONSchema4): string {
        const [dotted, name] = this.calculateDotted(path, schema);

        const parts = path.split("/");
        parts.shift(); // remove '#'
        parts.pop();
        parts.push(name);

        const comment = schema.description ? `/** ${schema.description} */\n` : "";

        this.root.add(parts, `${comment}export type ${name} = ${definition}`);
        return dotted;
    }

    emit(): string {
        return this.root.emit();
    }
}

function cleanse(s: string): string {
    return s.replace(/[^a-zA-Z]/g, "");
}

function toTitleCase(str: string) {
    return str.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
}
