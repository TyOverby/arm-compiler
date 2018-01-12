import { deployment_template, resources } from "../dist/deploymentTemplate";
import { AdditionalDependencies, EmitProperties, Resource, ResourceBase, ResourceEmit } from "./internal/Resource";
import { formatIdFor } from "../index";

export type ServiceBusSku = "Basic" | "Standard" | "Premium";

export interface ServiceBusOptions {
    location: deployment_template.ServiceBus_NamespacesLocation1;
    sku: ServiceBusSku;
}

const defaultOptions: ServiceBusOptions = {
    location: "West US",
    sku: "Standard",
};

export interface Queue {
    name: string;
}

export class ServiceBus extends ResourceBase<ServiceBusOptions> implements Resource {
    private readonly queues: Queue[];
    constructor(name: string, queues: Queue[], options?: Partial<ServiceBusOptions>) {
        super(name, defaultOptions, options);
        this.queues = queues;
    }

    public emit(emitProperties: Readonly<EmitProperties>): ResourceEmit[] {
        const resource: resources.MicrosoftServiceBus_NamespacesResource1 = {
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
        };

        const queues: resources.MicrosoftServiceBus_Namespaces_QueuesResource1[] = this.queues.map(q => ({
            type: "Microsoft.ServiceBus/namespaces/queues",
            apiVersion: "2017-04-01",
            name: q.name,
            properties: {},
            location: this.options.location,
            dependsOn: [formatIdFor(emitProperties, resource)],
        } as resources.MicrosoftServiceBus_Namespaces_QueuesResource1));

        const authRules: resources.MicrosoftServiceBus_Namespaces_AuthorizationRulesResource1 = {
            type: "Microsoft.ServiceBus/namespaces/AuthorizationRules",
            name: `${this.name}_auth_rules`,
            apiVersion: "2017-04-01",
            properties: {
                rights: ["Send", "Listen"],
            },
            dependsOn: [formatIdFor(emitProperties, resource)],
        };

        return [resource, authRules, ...queues];
    }
}
