import { deployment_template } from '../out/deploymentTemplate';
import { assert } from '../src/util';

export type ResourceEmit = deployment_template.ResourcesValue;

export type EmitProperties = {
    subscription_name: string,
    resource_group_name: string,
};

export interface Resource {
    validate(): void;
    dependencies: Resource[];
    emit(emitProperties: EmitProperties): ResourceEmit[];
}

export class ResourceBase {
    name: string;
    location: string;
    constructor(name: string, location?: string) {
        this.name = name;
        this.location = location || "US-West"
    }

    validate(): void {
        assert(/^[a-zA-z_][a-zA-Z0-9_]/.test(this.name), `Illegal name for resource "${this.name}"`);
    }
}
