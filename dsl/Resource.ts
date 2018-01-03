import { assert } from "../compiler/util";
import { deployment_template } from "../out/deploymentTemplate";

export type ResourceEmit = deployment_template.ResourcesValue;

export interface EmitProperties {
    readonly subscription_name: string;
    readonly resource_group_name: string;
}

export interface Resource {
    validate(): void;
    dependencies: Resource[];
    emit(emitProperties: EmitProperties): ResourceEmit[];
}

export class ResourceBase {
    public readonly name: string;
    constructor(name: string) {
        assert(/^[a-zA-z_][a-zA-Z0-9_]*$/.test(name), `Illegal name for resource "${name}"`);
        this.name = name;
    }
}
