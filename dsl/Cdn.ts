
import { deployment_template, resources } from "../dist/deploymentTemplate";
import { AdditionalDependencies, EmitProperties, Resource, ResourceBase, ResourceEmit } from "./internal/Resource";

export type CdnSku = "Standard_Verizon" | "Premium_Verizon" | "Custom_Verizon" | "Standard_Akamai";
export interface CdnOptions {
    isCompressionEnabled: boolean;
    location: deployment_template.Location4;
    sku: CdnSku;
}

const defaultOptions: CdnOptions = {
    isCompressionEnabled: true,
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

    public emit(emitProperties: Readonly<EmitProperties>): ResourceEmit {
        const cdnResource: resources.MicrosoftCdnprofilesResource1 = {
            name: this.name,
            type: "Microsoft.Cdn/profiles",
            apiVersion: "2016-04-02",
            location: this.options.location,
            sku: {
                name: this.options.sku,
            },
            resources: [{
                type: "endpoints",
                apiVersion: "2016-04-02",
                location: this.options.location,
                properties: {
                    originHostHeader: this.hostname,
                    isCompressionEnabled: this.options.isCompressionEnabled,
                    origins: [{
                        name: this.originname,
                        properties: {
                            hostName: this.hostname,
                        },
                    }],
                },
            }],
        };

        return cdnResource;
    }
}
