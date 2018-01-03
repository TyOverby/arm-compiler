import { deployment_template, resources } from "../out/deploymentTemplate";

import { EmitProperties, Resource, ResourceBase, ResourceEmit } from "./internal/Resource";

interface WebsiteOptions {
    location: deployment_template.Location;
}

const defaultOptions: WebsiteOptions = {
    location: "West US",
};

export class WebSite extends ResourceBase implements Resource {
    private readonly options: Readonly<WebsiteOptions>;
    constructor(name: string, options?: Partial<WebsiteOptions>) {
        super(name);
        this.options = { ...defaultOptions, ...options };
    }

    get dependencies() {
        return [];
    }

    public emit(emitProperties: EmitProperties): ResourceEmit[] {
        const resource: resources.MicrosoftWebsitesResource & deployment_template.ResourceBase = {
            type: "Microsoft.Web/sites",
            apiVersion: "2016-08-01",
            name: this.name,
            location: this.options.location,
            properties: {},
        };

        return [resource];
    }

    public validate() { }
}
