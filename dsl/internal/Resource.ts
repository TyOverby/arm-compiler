import { assert } from "../../compiler/util";
import { deployment_template } from "../../dist/deploymentTemplate";

export type ResourceEmit = deployment_template.ResourcesValue;

export interface EmitProperties {
    readonly subscription_name: string;
    readonly resource_group_name: string;
}

export interface AdditionalDependencies {
    dependencies: Resource[];
}

export interface Resource {
    readonly name: string;
    readonly dependencies: Resource[];
    emit(emitProperties: Readonly<EmitProperties>): ResourceEmit[];
}

export class ResourceBase<O> {
    public readonly name: string;
    public readonly options: Readonly<O & AdditionalDependencies>;
    public get dependencies() {
        return this.options.dependencies;
    }

    constructor(name: string, defaultOptions: O, providedOptions?: Partial<O & AdditionalDependencies>) {
        assert(/^[a-zA-z_][a-zA-Z0-9_]*$/.test(name), `Illegal name for resource "${name}"`);
        this.name = name;
        this.options = {
            dependencies: [],
            ...defaultOptions as any,
            ...providedOptions as any,
        };
    }
}
