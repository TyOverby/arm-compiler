
import { deployment_template, resources } from "../out/deploymentTemplate";
import { EmitProperties, Resource, ResourceBase, ResourceEmit } from "./Resource";

export type RegistrySku = "Classic" | "Basic" | "Standard" | "Premium";

export class ContainerRegistry extends ResourceBase implements Resource {
    public dependencies: Resource[] = [];
    public sku: RegistrySku;

    constructor(name: string, sku: RegistrySku = "Standard") {
        super(name, "Central US");
        this.sku = sku;
    }

    public emit(emitProperties: EmitProperties): ResourceEmit[] {
        const registryResource: resources.MicrosoftContainerRegistryregistriesResource3 & deployment_template.ResourceBase = {
            type: "Microsoft.ContainerRegistry/registries",
            apiVersion: "2017-10-01",
            name: this.name,
            location: this.location,
            sku: {
                name: this.sku,
            },
            properties: {
                adminUserEnabled: false,
            },
        };

        return [registryResource];
    }
    public validate() { }
}
