import { deployment_template, resources } from "../dist/deploymentTemplate";

import { AdditionalDependencies, EmitProperties, Resource, ResourceBase, ResourceEmit } from "./internal/Resource";

export type WebsiteOptions = AdditionalDependencies & {
    location: deployment_template.Location;
};

const defaultOptions: WebsiteOptions = {
    location: "West US",
    dependencies: [],
};

export class WebSite extends ResourceBase<WebsiteOptions> implements Resource {
    constructor(name: string, options?: Partial<WebsiteOptions>) {
        super(name, defaultOptions, options);
    }

    public emit(emitProperties: Readonly<EmitProperties>): ResourceEmit {
        const resource: resources.MicrosoftWebsitesResource = {
            type: "Microsoft.Web/sites",
            apiVersion: "2016-08-01",
            name: this.name,
            location: this.options.location,
            properties: {},
        };

        return resource;
    }
}
