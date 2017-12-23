
import { Resource, ResourceEmit, ResourceBase, EmitProperties } from './Resource';
import { resources, deployment_template } from '../out/deploymentTemplate';

export type RegistrySku = "Classic" | "Basic" | "Standard" | "Premium";

export class ContainerRegistry extends ResourceBase implements Resource {
    dependencies: Resource[] = [];
    sku: RegistrySku;

    constructor(name: string, sku: RegistrySku = "Standard") {
        super(name, "Central US");
        this.sku = sku;
    }

    emit(emitProperties: EmitProperties): ResourceEmit[] {
        const registryResource: resources.MicrosoftContainerRegistryregistriesResource3 & deployment_template.ResourceBase = {
            type: "Microsoft.ContainerRegistry/registries",
            apiVersion: "2017-10-01",
            name: this.name,
            location: this.location,
            sku: {
                "name": this.sku,
            },
            properties: {
                "adminUserEnabled": false,
            }
        }

        return [registryResource];
    }
}
