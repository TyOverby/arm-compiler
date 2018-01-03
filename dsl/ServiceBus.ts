import { deployment_template, resources } from "../out/deploymentTemplate";
import { EmitProperties, Resource, ResourceBase, ResourceEmit } from "./Resource";

export type ServiceBusSku = deployment_template.Name15;

export class ServiceBus extends ResourceBase implements Resource {
    public readonly dependencies: Resource[] = [];
    private readonly sku: ServiceBusSku;

    constructor(name: string, location?: string, sku?: ServiceBusSku) {
        super(name, location);
        this.sku = sku || "Standard";
    }

    public emit(emitProperties: EmitProperties): ResourceEmit[] {
        const resource: resources.MicrosoftServiceBusnamespacesResource1 & ResourceBase = {
            name: this.name,
            type: "Microsoft.ServiceBus/namespaces",
            apiVersion: "2017-04-01",
            location: this.location,
            sku: {
                name: this.sku,
            },
            properties: {
                serviceBusEndpoint: `https://${this.name}.servicebus.windows.net:443`,
            },
            resources: [{
                type: "AuthorizationRules",
                apiVersion: "2017-04-01",
                properties: {
                    rights: ["Send", "Listen"],
                },
            }],
        };

        return [resource];
    }

    public validate() { }
}
