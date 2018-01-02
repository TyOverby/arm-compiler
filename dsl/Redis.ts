import { deployment_template, resources } from "../out/deploymentTemplate";
import { EmitProperties, Resource, ResourceBase, ResourceEmit } from "./Resource";

export class Redis extends ResourceBase implements Resource {
    public dependencies: Resource[] = [];

    public emit(emitProperties: EmitProperties): ResourceEmit[] {
        const redisResource: resources.MicrosoftCacheRedisResource2 & deployment_template.ResourceBase = {
            type: "Microsoft.Cache/Redis",
            name: this.name,
            apiVersion: "2016-04-01",
            location: "West US",
            properties: {
                redisVersion: "3.2.7",
                sku: {
                    name: "Standard",
                    family: "C",
                    capacity: 1,
                },
                enableNonSslPort: false,
                redisConfiguration: {
                    "maxclients": "1000",
                    "maxmemory-reserved": "50",
                    "maxfragmentationmemory-reserved": "50",
                    "maxmemory-delta": "50",
                },
            },
        };

        return [redisResource];
    }
}
