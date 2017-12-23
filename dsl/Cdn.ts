
import { Resource, ResourceEmit, ResourceBase, EmitProperties } from './Resource';
import { resources, deployment_template } from '../out/deploymentTemplate';

class CdnProfile extends ResourceBase implements Resource {
    dependencies: Resource[] = [];

    emit(emitProperties: EmitProperties): ResourceEmit[] {
        const cdnProfile: resources.MicrosoftCdnprofilesResource1 & deployment_template.ResourceBase = {
            name: this.name,
            type: "Microsoft.Cdn/profiles",
            apiVersion: "2016-04-02",
            location: "WestUs",
            sku: {
                "name": "Premium_Verizon"
            },
        }
        return [cdnProfile];
    }

}

class CdnProfileEndpoint extends ResourceBase implements Resource {
    hostname: string;
    originName: string;
    dependencies: Resource[];
    constructor(name: string, hostname: string, originName: string, profile: CdnProfile) {
        super(name);
        this.hostname = hostname;
        this.originName = originName;
        this.dependencies = [profile];
    }

    emit(emitProperties: EmitProperties): ResourceEmit[] {
        const cdnProfileEndpoint: resources.MicrosoftCdnprofilesendpointsResource1 & deployment_template.ResourceBase = {
            type: "Microsoft.Cdn/profiles/endpoints",
            name: this.name,
            apiVersion: "2016-04-02",
            location: "WestUs",
            properties: {
                originHostHeader: this.hostname,
                origins: [
                    {
                        name: this.originName,
                        properties: {
                            hostName: this.hostname,
                        }
                    }
                ],
                isCompressionEnabled: true
            },
        };

        return [cdnProfileEndpoint];
    }
}

class CdnProfileEndpointOrigin extends ResourceBase implements Resource {
    hostname: string;
    dependencies: Resource[];

    constructor(name: string, hostname: string, profile: CdnProfile, endpoint: CdnProfileEndpoint) {
        super(name);
        this.hostname = hostname;
        this.dependencies = [profile, endpoint];
    }

    emit(emitProperties: EmitProperties): ResourceEmit[] {
        const endpointOrigin: resources.MicrosoftCdnprofilesendpointsoriginsResource1 & deployment_template.ResourceBase = {
            type: "Microsoft.Cdn/profiles/endpoints/origins",
            name: this.name,
            apiVersion: "2016-04-02",
            properties: {
                hostName: this.hostname
            },
        };

        return [endpointOrigin];
    }
}

export class Cdn extends ResourceBase implements Resource {
    dependencies: Resource[];
    constructor(name: string, hostname: string, originName: string) {
        super(name);
        const profile = new CdnProfile(`${name}_profile`);
        const endpoint = new CdnProfileEndpoint(`${name}_profile_endpoint`, hostname, originName, profile);
        const endpointOrigin = new CdnProfileEndpointOrigin(`${name}_profile_endpoint_origin`, hostname, profile, endpoint);
        this.dependencies = [profile, endpoint, endpointOrigin];
    }

    emit(emitProperties: EmitProperties): ResourceEmit[] {
        return [];
    }
}
