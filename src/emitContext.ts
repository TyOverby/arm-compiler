import { cleanse, toTitleCase, assert, tryGetResourceName } from './util';
import { Schema } from './compiler';

class Module {
    submodules: Map<string, Module> = new Map();
    definitions: Map<string, string> = new Map();

    add(path: string[], definition: string) {
        if (path.length == 1) {
            assert(
                !this.definitions.has(path[0]),
                `already defined \n\n ${path[0]} ${definition} \n\nVS\n\n ${this.definitions.get(path[0])}`);

            this.definitions.set(path[0], definition);
        } else {
            let submodule = path.shift() as string;
            if (/[0-9]/.test(submodule[0])) {
                submodule = "m" + submodule;
            }

            if (!this.submodules.has(submodule)) {
                this.submodules.set(submodule, new Module());
            }
            this.submodules.get(submodule)!.add(path, definition);
        }
    }

    emit(): string {
        const submoduleEmit = Array.from(this.submodules.entries()).map(a => {
            let [name, module] = a;
            return `export module ${name} {\n${module.emit()}\n};`;
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

    private calculateDotted(path: string, schema: Schema): [string, string] {
        let parts = path.split("/").map(a => a.trim()).filter(a => a.length > 0);
        parts.shift(); // remove #
        let name =
            schema.title ||
            tryGetResourceName(schema) ||
            cleanse(parts.pop() as string)
        name = toTitleCase(name);
        parts.push(name);
        parts = parts.map(s => {
            if (/[0-9]*/.test(s)) {
                return `m${s}`;
            } else {
                return s;
            }
        });

        return ["deployment_template." + parts.join("."), name];
    }

    preregister(path: string, schema: Schema) {
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

    add(path: string, definition: string, schema: Schema): string {
        const [dotted, name] = this.calculateDotted(path, schema);

        const parts = path.split("/");
        parts.shift(); // remove '#'
        parts.pop();
        parts.push(name);

        const comment = schema.description ? `/** ${schema.description} */\n` : "";

        this.root.add(parts, `${comment}export type ${name} = ${definition};`);
        return dotted;
    }

    emit(): string {
        return "export module deployment_template {" + this.root.emit() + "}";
    }
}
