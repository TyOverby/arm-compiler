
import { deployment_template, resources } from "../out/deploymentTemplate";
import { EmitProperties, Resource, ResourceBase, ResourceEmit } from "./Resource";

export type RegistrySku = "Classic" | "Basic" | "Standard" | "Premium";

interface ContainerRegistryOptions {
    location: deployment_template.Location10;
    sku: RegistrySku;
}

const defaultOptions: ContainerRegistryOptions = {
    location: "West US",
    sku: "Standard",
};

export class ContainerRegistry extends ResourceBase implements Resource {
    public dependencies: Resource[] = [];
    private options: ContainerRegistryOptions;

    constructor(name: string, options?: Partial<ContainerRegistryOptions>) {
        super(name);
        this.options = { ...defaultOptions, ...options };
    }

    public emit(emitProperties: EmitProperties): ResourceEmit[] {
        const registryResource: resources.MicrosoftContainerRegistryregistriesResource3 & deployment_template.ResourceBase = {
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
    public validate() { }
}
