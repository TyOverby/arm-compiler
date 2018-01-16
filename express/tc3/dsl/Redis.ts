import { assert } from "../compiler/util";
import { deployment_template, resources } from "../dist/deploymentTemplate";
import { AdditionalDependencies, EmitProperties, Resource, ResourceBase, ResourceEmit } from "./internal/Resource";

// tslint:disable-next-line
export interface RedisOptions {
    location: deployment_template.Cache_RedisLocation;
    sku: deployment_template.Cache_RedisSku2;
}

const defaultOptions: RedisOptions = {
    location: "West US",
    sku: {
        name: "Standard",
        family: "C",
        capacity: 1,
    },
};

export class Redis extends ResourceBase<RedisOptions> implements Resource {
    constructor(name: string, options?: RedisOptions) {
        const validName = /^[a-zA-Z0-9]+$/;
        assert(validName.test(name), "redis names must alphanumeric only");
        super(name, defaultOptions, options);
    }

    public emit(emitProperties: Readonly<EmitProperties>): ResourceEmit[] {
        const redisResource: resources.MicrosoftCache_RedisResource2 = {
            type: "Microsoft.Cache/Redis",
            name: this.name,
            location: this.options.location,
            apiVersion: "2016-04-01",
            properties: {
                sku: this.options.sku,
                enableNonSslPort: false,
            },
        };

        return [redisResource];
    }
}
