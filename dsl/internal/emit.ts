import { assert } from "../../compiler/util";
import { deployment_template } from "../../out/deploymentTemplate";
import { Resource } from "./Resource";

function verify_no_duplicate_names(resources: Resource[]) {
    const nameToResource: Map<string, Resource> = new Map();
    const registerResource = (resource: Resource) => {
        if (nameToResource.has(resource.name)) {
            const previous = nameToResource.get(resource.name)!;
            assert(previous === resource, `Two resources with the same name ${previous} and ${resource}`);
            return;
        } else {
            nameToResource.set(resource.name, resource);
            for (const dep of resource.dependencies) {
                registerResource(dep);
            }
        }
    };
    for (const res of resources) {
        registerResource(res);
    }
}

export function compile(...resources: Resource[]): deployment_template.t {
    verify_no_duplicate_names(resources);

    return {
        $schema: "https://schema.management.azure.com/schemas/2015-01-01/deploymentTemplate.json#",
        contentVersion: "1.0.0.0",
        resources: [],
    };
}
