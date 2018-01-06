import { deployment_template, resources } from "../dist/deploymentTemplate";
import { AdditionalDependencies, EmitProperties, Resource, ResourceBase, ResourceEmit } from "./internal/Resource";

// tslint:disable-next-line
export interface RedisOptions { }

const defaultOptions: RedisOptions = {};

export class Redis extends ResourceBase<RedisOptions> implements Resource {
    constructor(name: string, options?: RedisOptions) {
        super(name, defaultOptions, options);
    }

    public emit(emitProperties: Readonly<EmitProperties>): ResourceEmit[] {
        const redisResource: resources.MicrosoftCache_RedisResource2 = {
            type: "Microsoft.Cache/Redis",
            name: this.name,
            apiVersion: "2016-04-01",
            properties: {
                sku: {
                    name: "Standard",
                    family: "C",
                    capacity: 1,
                },
                enableNonSslPort: false,
            },
        };

        return [redisResource];
    }
}
