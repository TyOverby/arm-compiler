
import { deployment_template, resources } from "../out/deploymentTemplate";
import { EmitProperties, Resource, ResourceBase, ResourceEmit } from "./Resource";

class CdnProfile extends ResourceBase implements Resource {
    public dependencies: Resource[] = [];

    public emit(emitProperties: EmitProperties): ResourceEmit[] {
        const cdnProfile: resources.MicrosoftCdnprofilesResource1 & deployment_template.ResourceBase = {
            name: this.name,
            type: "Microsoft.Cdn/profiles",
            apiVersion: "2016-04-02",
            location: "WestUs",
            sku: {
                name: "Premium_Verizon",
            },
        };
        return [cdnProfile];
    }

    public validate() { }
}

class CdnProfileEndpoint extends ResourceBase implements Resource {
    public hostname: string;
    public originName: string;
    public dependencies: Resource[];
    constructor(name: string, hostname: string, originName: string, profile: CdnProfile) {
        super(name);
        this.hostname = hostname;
        this.originName = originName;
        this.dependencies = [profile];
    }

    public emit(emitProperties: EmitProperties): ResourceEmit[] {
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
                        },
                    },
                ],
                isCompressionEnabled: true,
            },
        };

        return [cdnProfileEndpoint];
    }

    validate() { }
}

class CdnProfileEndpointOrigin extends ResourceBase implements Resource {
    public hostname: string;
    public dependencies: Resource[];

    constructor(name: string, hostname: string, profile: CdnProfile, endpoint: CdnProfileEndpoint) {
        super(name);
        this.hostname = hostname;
        this.dependencies = [profile, endpoint];
    }

    public emit(emitProperties: EmitProperties): ResourceEmit[] {
        const endpointOrigin: resources.MicrosoftCdnprofilesendpointsoriginsResource1 & deployment_template.ResourceBase = {
            type: "Microsoft.Cdn/profiles/endpoints/origins",
            name: this.name,
            apiVersion: "2016-04-02",
            properties: {
                hostName: this.hostname,
            },
        };

        return [endpointOrigin];
    }

    validate() { }
}

export class Cdn extends ResourceBase implements Resource {
    public dependencies: Resource[];
    constructor(name: string, hostname: string, originName: string) {
        super(name);
        const profile = new CdnProfile(`${name}_profile`);
        const endpoint = new CdnProfileEndpoint(`${name}_profile_endpoint`, hostname, originName, profile);
        const endpointOrigin = new CdnProfileEndpointOrigin(`${name}_profile_endpoint_origin`, hostname, profile, endpoint);
        this.dependencies = [profile, endpoint, endpointOrigin];
    }

    public emit(emitProperties: EmitProperties): ResourceEmit[] {
        return [];
    }

    validate() { }
}
