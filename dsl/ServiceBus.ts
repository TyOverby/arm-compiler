import { deployment_template, resources } from "../dist/deploymentTemplate";
import { AdditionalDependencies, EmitProperties, Resource, ResourceBase, ResourceEmit } from "./internal/Resource";

export type ServiceBusSku = "Basic" | "Standard" | "Premium";

export interface ServiceBusOptions {
    location: deployment_template.Location11;
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

    public emit(emitProperties: Readonly<EmitProperties>): ResourceEmit {
        const queueRes: QueueRes[] = this.queues.map(q => ({
            type: "queues",
            apiVersion: "2017-04-01",
            name: q.name,
            location: this.options.location,
            properties: {},
        } as QueueRes));

        interface QueueRes {
            type: "queues";
            apiVersion: "2017-04-01";
            name: string;
            location: deployment_template.Location11;
            properties: {};
        }
        interface AuthRulesRes {
            type: "AuthorizationRules";
            apiVersion: "2017-04-01";
            properties: {
                rights: Array<"Send" | "Listen" | "Manage">;
            };
        }

        const resres: Array<QueueRes | AuthRulesRes> = [
            {
                type: "AuthorizationRules",
                apiVersion: "2017-04-01",
                properties: {
                    rights: ["Send", "Listen"],
                },
            },
            ...queueRes,
        ];

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
            resources: resres,
        };

        return resource;
    }
}
