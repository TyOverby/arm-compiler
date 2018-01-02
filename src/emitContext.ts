import { Schema } from "./compiler";
import { assert, cleanse, isResource, toTitleCase, tryGetGoodName } from "./util";

// TODO: the Module class supports submodules which are currently not used.
class Module {
    private submodules: Map<string, Module> = new Map();
    private definitions: Map<string, string> = new Map();

    public add(path: string[], definition: string) {
        if (path.length === 1) {
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

    public emit(): string {
        const submoduleEmit = Array.from(this.submodules.entries()).map(a => {
            const [name, module] = a;
            return `export module ${name} {\n${module.emit()}\n};`;
        }).join("\n\n");

        const definitionEmit = Array.from(this.definitions.values()).map(d =>
            d,
        ).join("\n\n");

        return submoduleEmit + "\n\n" + definitionEmit;
    }
}

export class EmitContext {
    private root: Module = new Module();
    // A cache from path -> name
    private defined: Map<string, string> = new Map();
    private goodNamesCounter: Map<string, number> = new Map();
    // A list of all the main "resources" names.
    private resourcesList: string[] = [];

    // Creates a unique name for a type with schema `schema` at `path`
    private calculateDotted(path: string, schema: Schema): string {
        const goodName = tryGetGoodName(path, schema) || "t";
        let counter;
        if (this.goodNamesCounter.has(goodName)) {
            counter = this.goodNamesCounter.get(goodName)! + 1;
            this.goodNamesCounter.set(goodName, counter);
        } else {
            this.goodNamesCounter.set(goodName, 0);
            counter = 0;
        }
        if (goodName === "t" && counter === 611) {
            console.log("here");
        }

        return `${goodName}${counter === 0 ? "" : `${counter}`}`;
    }

    // "Preregisters" a type with schema `schema` at `path`.
    // Preregistration is done early in the compilation of a type and
    // is intended to break cycles in the graph that would otherwise
    // recurse forever.
    public preregister(path: string, schema: Schema) {
        const name = this.calculateDotted(path, schema);
        this.defined.set(path, name);
    }

    // Returns the unique name of a path if it has been definied.
    public lookup(path: string): string | null {
        if (this.defined.has(path)) {
            return this.defined.get(path)!;
        } else {
            return null;
        }
    }

    // Adds a definition to emit.
    public add(path: string, definition: string, schema: Schema): string {
        const name = this.defined.get(path) || this.calculateDotted(path, schema);
        const comment = schema.description ?
            `/** ${schema.description}\n${path} */\n` :
            `/** ${path} */\n`;
        this.root.add([name], `${comment}export type ${name} = ${definition};`);

        if (isResource(name)) {
            this.resourcesList.push(name);
        }
        return name;
    }

    // Returns the entire compilation
    public emit(): string {
        const resourceMappings = this.resourcesList.map(r => `    export type ${r} = deployment_template.${r};`);
        return "export module deployment_template {\n" + this.root.emit() + "\n}\n" +
            `export module resources {\n${resourceMappings.join("\n")}\n}`;
    }
}
