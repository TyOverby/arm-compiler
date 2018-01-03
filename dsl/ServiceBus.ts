import { deployment_template, resources } from "../out/deploymentTemplate";
import { EmitProperties, Resource, ResourceBase, ResourceEmit } from "./internal/Resource";

export type ServiceBusSku = deployment_template.Name15;

interface ServiceBusOptions {
    location: deployment_template.Location11;
    sku: ServiceBusSku;
}

const defaultOptions: ServiceBusOptions = {
    location: "West US",
    sku: "Standard",
};

export class ServiceBus extends ResourceBase implements Resource {
    public readonly dependencies: Resource[] = [];
    private readonly options: Readonly<ServiceBusOptions>;

    constructor(name: string, options?: Partial<ServiceBusOptions>) {
        super(name);
        this.options = { ...defaultOptions, ...options };
    }

    public emit(emitProperties: EmitProperties): ResourceEmit[] {
        const resource: resources.MicrosoftServiceBusnamespacesResource1 & ResourceBase = {
            name: this.name,
            type: "Microsoft.ServiceBus/namespaces",
            apiVersion: "2017-04-01",
            location: this.options.location,
            sku: {
                name: this.options.sku,
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
