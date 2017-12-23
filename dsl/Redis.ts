import { Resource, ResourceEmit, ResourceBase, EmitProperties } from './Resource';
import { resources, deployment_template } from '../out/deploymentTemplate';

export class Redis extends ResourceBase implements Resource {
    dependencies: Resource[] = [];

    emit(emitProperties: EmitProperties): ResourceEmit[] {
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
                    capacity: 1
                },
                enableNonSslPort: false,
                redisConfiguration: {
                    "maxclients": "1000",
                    "maxmemory-reserved": "50",
                    "maxfragmentationmemory-reserved": "50",
                    "maxmemory-delta": "50"
                }
            }
        };

        return [redisResource];
    }
}
