import { deployment_template, resources } from "../dist/deploymentTemplate";
import { AdditionalDependencies, EmitProperties, Resource, ResourceBase, ResourceEmit } from "./internal/Resource";

export type ServiceBusSku = deployment_template.Name15;

export interface ServiceBusOptions {
    location: deployment_template.Location11;
    sku: ServiceBusSku;
}

const defaultOptions: ServiceBusOptions = {
    location: "West US",
    sku: "Standard",
};

export class ServiceBus extends ResourceBase<ServiceBusOptions> implements Resource {
    constructor(name: string, options?: Partial<ServiceBusOptions>) {
        super(name, defaultOptions, options);
    }

    public emit(emitProperties: Readonly<EmitProperties>): ResourceEmit {
        const resource: resources.MicrosoftServiceBusnamespacesResource1 = {
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

        return resource;
    }
}

export class ServiceBusQueue extends ResourceBase<{}> {
    private readonly serviceBus: ServiceBus;
    constructor(name: string, serviceBus: ServiceBus) {
        super(name, {}, { dependencies: [serviceBus] });
        this.serviceBus = serviceBus;
    }
    public emit() {
        const resource: resources.MicrosoftServiceBusnamespacesqueuesResource1 = {
            type: "Microsoft.ServiceBus/namespaces/queues",
            apiVersion: "2017-04-01",
            name: this.name,
            properties: {},
            location: this.serviceBus.options.location,
        };
        return resource;
    }
}
