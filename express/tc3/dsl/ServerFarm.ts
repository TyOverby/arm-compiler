import { deployment_template, resources } from "../dist/deploymentTemplate";
import { AdditionalDependencies, EmitProperties, Resource, ResourceBase, ResourceEmit } from "./internal/Resource";

export interface ServerFarmOptions {
    worker_count: number;
    location: string;
    sku: deployment_template.t_Web_Serverfarms2;
}

const defaultOptions: ServerFarmOptions = {
    worker_count: 1,
    location: "West US",
    sku: {
        name: "S3",
        tier: "Standard",
        size: "S3",
        family: "S",
        capacity: 10,
    },
};

export class ServerFarm extends ResourceBase<ServerFarmOptions> implements Resource {
    public readonly type = "Microsoft.Web/serverfarms";
    constructor(name: string, options?: Partial<ServerFarmOptions>) {
        super(name, defaultOptions, options);
    }

    public emit(emitProperties: Readonly<EmitProperties>): ResourceEmit[] {
        const ret: resources.MicrosoftWeb_ServerfarmsResource2 = {
            type: this.type,
            apiVersion: "2016-09-01",
            name: this.name,
            sku: this.options.sku,
            properties: {
                name: this.name,
                numberOfWorkers: this.options.worker_count,
            },
            location: this.options.location,
        };
        return [ret];
    }
}
