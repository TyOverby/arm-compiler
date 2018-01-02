
import { deployment_template, resources } from "../out/deploymentTemplate";
import { EmitProperties, Resource, ResourceBase, ResourceEmit } from "./Resource";

export type CdnSku = deployment_template.Name3;

export class Cdn extends ResourceBase implements Resource {
    public readonly dependencies: Resource[] = [];
    private readonly hostname: string;
    private readonly originname: string;
    private readonly sku: CdnSku;
    private readonly compressionEnabled: boolean;

    constructor(name: string, hostname: string, originname: string, isCompressionEnabled?: boolean, location?: string, sku?: CdnSku) {
        super(name, location);
        this.hostname = hostname;
        this.originname = originname;
        this.sku = sku || "Standard_Verizon";
        this.compressionEnabled = isCompressionEnabled === undefined ? true : isCompressionEnabled;
    }

    public emit(emitProperties: EmitProperties): ResourceEmit[] {
        const CdnResource: resources.MicrosoftCdnprofilesResource1 & deployment_template.ResourceBase = {
            name: this.name,
            type: "Microsoft.Cdn/profiles",
            apiVersion: "2016-04-02",
            location: this.location,
            sku: {
                name: this.sku,
            },
            resources: [{
                type: "endpoints",
                apiVersion: "2016-04-02",
                location: this.location,
                properties: {
                    originHostHeader: this.hostname,
                    isCompressionEnabled: this.compressionEnabled,
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
