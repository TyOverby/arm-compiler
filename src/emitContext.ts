import { cleanse, toTitleCase, assert, tryGetGoodName } from './util';
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
    good_names_counter: Map<string, number> = new Map();
    resources_list: string[] = [];

    private calculateDotted(path: string, schema: Schema): string {
        const good_name = tryGetGoodName(path, schema) || "t";
        let counter;
        if (this.good_names_counter.has(good_name)) {
            counter = this.good_names_counter.get(good_name)! + 1;
            this.good_names_counter.set(good_name, counter);
        } else {
            this.good_names_counter.set(good_name, 0);
            counter = 0;
        }

        return `${good_name}${counter == 0 ? "" : `${counter}`}`;
    }

    preregister(path: string, schema: Schema) {
        const name = this.calculateDotted(path, schema);
        this.defined.set(path, name);
    }

    lookup(path: string): string | null {
        if (this.defined.has(path)) {
            return this.defined.get(path)!;
        } else {
            return null;
        }
    }

    add(path: string, definition: string, schema: Schema): string {
        const name = this.defined.get(path) || this.calculateDotted(path, schema);
        const comment = schema.description ?
            `/** ${schema.description}\n${path} */\n` :
            `/** ${path} */\n`;
        this.root.add([name], `${comment}export type ${name} = ${definition};`);
        if (name.endsWith("Resource")) {
            this.resources_list.push(name);
        }
        return name;
    }

    emit(): string {
        const resource_mappings = this.resources_list.map(r => `    export type ${r} = deployment_template.${r};`)
        return "export module deployment_template {\n" + this.root.emit() + "\n}\n" +
            `export module resources {\n${resource_mappings.join("\n")}\n}`;
    }
}
