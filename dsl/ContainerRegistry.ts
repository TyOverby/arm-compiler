
import { assert } from "../compiler/util";
import { deployment_template, resources } from "../dist/deploymentTemplate";
import { AdditionalDependencies, EmitProperties, Resource, ResourceBase, ResourceEmit } from "./internal/Resource";

export type RegistrySku = "Classic" | "Basic" | "Standard" | "Premium";

export interface ContainerRegistryOptions {
    location: deployment_template.ContainerRegistry_RegistriesLocation3;
    sku: RegistrySku;
}

const defaultOptions: ContainerRegistryOptions = {
    location: "West US",
    sku: "Standard",
};

export class ContainerRegistry extends ResourceBase<ContainerRegistryOptions> implements Resource {
    constructor(name: string, options?: Partial<ContainerRegistryOptions>) {
        assert(!/_/.test(name), `${name}: container registries can't have underscores in the name`);
        super(name, defaultOptions, options);
    }

    public emit(emitProperties: Readonly<EmitProperties>): ResourceEmit[] {
        const registryResource: resources.MicrosoftContainerRegistry_RegistriesResource3 = {
            type: "Microsoft.ContainerRegistry/registries",
            apiVersion: "2017-10-01",
            name: this.name,
            location: this.options.location,
            sku: {
                name: this.options.sku,
            },
            properties: {
                adminUserEnabled: false,
            },
        };

        return [registryResource];
    }
}
