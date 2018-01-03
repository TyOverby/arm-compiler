
import { deployment_template, resources } from "../out/deploymentTemplate";
import { EmitProperties, Resource, ResourceBase, ResourceEmit } from "./Resource";

export type CdnSku = deployment_template.Name3;
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

export class Cdn extends ResourceBase implements Resource {
    public readonly dependencies: Resource[] = [];
    private readonly hostname: string;
    private readonly originname: string;

    private readonly options: Readonly<CdnOptions>;

    constructor(name: string, hostname: string, originname: string, options?: Partial<CdnOptions>) {
        super(name);
        this.hostname = hostname;
        this.originname = originname;
        this.options = { ...defaultOptions, ...options };
    }

    public emit(emitProperties: EmitProperties): ResourceEmit[] {
        const CdnResource: resources.MicrosoftCdnprofilesResource1 & deployment_template.ResourceBase = {
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

        return [CdnResource];
    }

    public validate() { }
}
