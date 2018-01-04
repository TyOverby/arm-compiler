
import { deployment_template, resources } from "../out/deploymentTemplate";
import { AdditionalDependencies, EmitProperties, Resource, ResourceBase, ResourceEmit } from "./internal/Resource";

export type RegistrySku = "Classic" | "Basic" | "Standard" | "Premium";

export interface ContainerRegistryOptions {
    location: deployment_template.Location10;
    sku: RegistrySku;
}

const defaultOptions: ContainerRegistryOptions = {
    location: "West US",
    sku: "Standard",
};

export class ContainerRegistry extends ResourceBase<ContainerRegistryOptions> implements Resource {
    constructor(name: string, options?: Partial<ContainerRegistryOptions>) {
        super(name, defaultOptions, options);
    }

    public emit(emitProperties: Readonly<EmitProperties>): ResourceEmit {
        const registryResource: resources.MicrosoftContainerRegistryregistriesResource3 = {
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

        return registryResource;
    }
}
