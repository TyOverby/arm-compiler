import { deployment_template, resources } from "../dist/deploymentTemplate";
import { AdditionalDependencies, EmitProperties, Resource, ResourceBase, ResourceEmit } from "./internal/Resource";

export interface ServerFarmOptions {
    worker_count: number;
    location: string;
}

const defaultOptions: ServerFarmOptions = {
    worker_count: 1,
    location: "West US",
};

export class ServerFarm extends ResourceBase<ServerFarmOptions> implements Resource {
    public readonly type = "Microsoft.Web/serverfarms";
    constructor(name: string, options?: Partial<ServerFarmOptions>) {
        super(name, defaultOptions, options);
    }

    public emit(emitProperties: Readonly<EmitProperties>): ResourceEmit {
        const ret: resources.MicrosoftWebserverfarmsResource2 = {
            type: this.type,
            apiVersion: "2016-09-01",
            name: this.name,
            properties: {
                name: this.name,
                numberOfWorkers: this.options.worker_count,
            },
            location: this.options.location,
        };
        return ret;
    }
}
