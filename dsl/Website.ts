import { deployment_template, resources } from "../dist/deploymentTemplate";

import { ContainerRegistry, formatId } from "../index";
import { AdditionalDependencies, EmitProperties, Resource, ResourceBase, ResourceEmit } from "./internal/Resource";
import { ServerFarm } from "./ServerFarm";

export type WebsiteOptions = AdditionalDependencies & {
    location: deployment_template.Location,
    serverFarm: ServerFarm | null,
    docker: null | {
        containerRegistry: ContainerRegistry | string,
        image: string,
        tag: string,
    },
};

const defaultOptions: WebsiteOptions = {
    location: "West US",
    serverFarm: null,
    docker: null,
    dependencies: [],
};

interface WebsiteConfigOptions {
    linuxFxVersion: string;
}

class WebsiteConfig extends ResourceBase<WebsiteConfigOptions> implements Resource {
    constructor(name: string, options: WebsiteConfigOptions) {
        super(name, options, options);
    }

    public emit(emitProperties: Readonly<EmitProperties>): ResourceEmit {
        const out: resources.MicrosoftWebsitesconfigResource1 = {
            name: "appsettings",
            type: "Microsoft.Web/sites/config",
            apiVersion: "2016-08-01",
            properties: {
                linuxFxVersion: this.options.linuxFxVersion,
            },
        };

        return out;
    }
}

export class WebSite extends ResourceBase<WebsiteOptions> implements Resource {
    private readonly containerRegistryName: string | null;

    constructor(name: string, options?: Partial<WebsiteOptions>) {
        const deps = (options && options.dependencies) || [];
        if (options && options.serverFarm) {
            deps.push(options.serverFarm);
        }
        if (options && options.docker) {
            if (typeof options.docker.containerRegistry !== "string") {
                deps.push(options.docker.containerRegistry);
            }
        }

        super(name, defaultOptions, { ...options, dependencies: deps });

        if (options && options.docker) {
            if (typeof options.docker.containerRegistry === "string") {
                this.containerRegistryName = options.docker.containerRegistry;
            } else {
                this.containerRegistryName = options.docker.containerRegistry.name;
            }
        } else {
            this.containerRegistryName = null;
        }
    }

    public emit(emitProperties: Readonly<EmitProperties>): ResourceEmit {
        const serverFarmId = this.options.serverFarm === null ? undefined :
            formatId(emitProperties.subscription_name,
                emitProperties.resource_group_name,
                this.options.serverFarm.type,
                this.options.serverFarm.name);

        const linuxFxVersion = this.options.docker === null ? undefined :
            `DOCKER|${this.containerRegistryName}.azurecr.io/${this.options.docker.image}:${this.options.docker.tag}`;

        const resource: resources.MicrosoftWebsitesResource = {
            type: "Microsoft.Web/sites",
            apiVersion: "2016-08-01",
            name: this.name,
            location: this.options.location,
            properties: {
                serverFarmId,
            },
        };

        return resource;
    }
}
