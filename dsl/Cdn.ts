
import { deployment_template, resources } from "../dist/deploymentTemplate";
import { formatIdFor } from "../index";
import { AdditionalDependencies, EmitProperties, Resource, ResourceBase, ResourceEmit } from "./internal/Resource";

export type CdnSku = "Standard_Verizon" | "Premium_Verizon" | "Custom_Verizon" | "Standard_Akamai";
export interface CdnOptions {
    isCompressionEnabled: boolean;
    location: deployment_template.Cdn_ProfilesLocation1;
    compressionForMimeTypes: string[];
    sku: CdnSku;
}

const defaultOptions: CdnOptions = {
    isCompressionEnabled: false,
    compressionForMimeTypes: [],
    location: "West US",
    sku: "Standard_Verizon",
};

export class Cdn extends ResourceBase<CdnOptions> implements Resource {
    private readonly hostname: string;
    private readonly originname: string;

    constructor(name: string, hostname: string, originname: string, options?: Partial<CdnOptions>) {
        super(name, defaultOptions, options);
        this.hostname = hostname;
        this.originname = originname;
    }

    public emit(emitProperties: Readonly<EmitProperties>): ResourceEmit[] {
        const cdnResource: resources.MicrosoftCdn_ProfilesResource1 = {
            name: this.name,
            type: "Microsoft.Cdn/profiles",
            apiVersion: "2016-04-02",
            location: this.options.location,
            sku: {
                name: this.options.sku,
            },
        };

        const cdnEndpointResource: resources.MicrosoftCdn_Profiles_EndpointsResource1 = {
            type: "Microsoft.Cdn/profiles/endpoints",
            apiVersion: "2016-04-02",
            name: `${this.name}/${this.name}endpoint`,
            location: this.options.location,
            properties: {
                originHostHeader: this.hostname,
                isCompressionEnabled: this.options.isCompressionEnabled,
                contentTypesToCompress: this.options.compressionForMimeTypes,
                origins: [{
                    name: this.originname,
                    properties: {
                        hostName: this.hostname,
                    },
                }],
            },
            dependsOn: [formatIdFor(emitProperties, cdnResource)],
        };

        return [cdnResource, cdnEndpointResource];
    }
}
