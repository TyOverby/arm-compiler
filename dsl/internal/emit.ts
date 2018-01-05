import { assert } from "../../compiler/util";
import { deployment_template } from "../../dist/deploymentTemplate";
import { Resource } from "./Resource";

type ResourcesValue = deployment_template.ResourcesValue;

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

function flatten(subName: string, rgName: string, resources: Resource[]): deployment_template.ResourcesValue[] {
    const out: deployment_template.ResourcesValue[] = [];
    const visited: Map<string, ResourcesValue> = new Map();

    const flattenIndiv = (resource: Resource): ResourcesValue => {
        if (visited.has(resource.name)) {
            return visited.get(resource.name)!;
        }
        const emitValue = resource.emit({ subscription_name: subName, resource_group_name: rgName });
        visited.set(resource.name, emitValue);

        assert(emitValue.dependsOn === undefined, "resources should not manually emit dependsOn properties");
        emitValue.dependsOn = [];

        for (const dep of resource.dependencies) {
            const depValue = flattenIndiv(dep);
            const dependencyName = `/subscriptions/${subName}/resourceGroups/${rgName}/providers/${depValue.type}/${depValue.name}`;
            emitValue.dependsOn.push(dependencyName);
        }
        out.push(emitValue);

        return emitValue;
    };

    for (const res of resources) {
        flattenIndiv(res);
    }

    return out;
}

export function compile(subName: string, rgName: string, ...resources: Resource[]): deployment_template.t {
    verify_no_duplicate_names(resources);
    const out = flatten(subName, rgName, resources);

    return {
        $schema: "https://schema.management.azure.com/schemas/2015-01-01/deploymentTemplate.json#",
        contentVersion: "1.0.0.0",
        resources: out,
    };
}
