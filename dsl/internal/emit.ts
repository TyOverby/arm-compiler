import { assert } from "../../compiler/util";
import { deployment_template } from "../../dist/deploymentTemplate";
import { EmitProperties, Resource, ResourceEmit } from "./Resource";

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

export function formatIdFor(emitProperties: EmitProperties, resourceEmit: ResourceEmit): string {
    return formatId(
        emitProperties.subscription_name,
        emitProperties.resource_group_name,
        resourceEmit.type,
        resourceEmit.name);
}

export function formatId(subName: string, rgName: string, type: string, name: string): string {
    return `[resourceId('${subName}', '${rgName}', '${type}', '${name}')]`;
}

function flatten(subName: string, rgName: string, resources: Resource[]): deployment_template.ResourcesValue[] {
    const out: deployment_template.ResourcesValue[] = [];
    const visited: Map<string, ResourcesValue[]> = new Map();

    const flattenIndiv = (resource: Resource): ResourcesValue[] => {
        if (visited.has(resource.name)) {
            return visited.get(resource.name)!;
        }

        const emitValues = resource.emit({ subscription_name: subName, resource_group_name: rgName });
        visited.set(resource.name, emitValues);
        for (const emitted of emitValues) {

            emitted.dependsOn = emitted.dependsOn || [];

            for (const dep of resource.dependencies) {
                const depValues = flattenIndiv(dep);
                for (const depValue of depValues) {
                    const dependencyName = formatId(subName, rgName, depValue.type, depValue.name);
                    emitted.dependsOn.push(dependencyName);
                    // Only depend on the first item that is emitted
                    // TODO: make this more strongly typed
                    break;
                }
            }

            out.push(emitted);
        }

        return emitValues;
    };

    for (const res of resources) {
        flattenIndiv(res);
    }

    return out;
}

export function compile(subName: string, rgName: string, ...resources: Resource[]): deployment_template.t_ {
    verify_no_duplicate_names(resources);
    const out = flatten(subName, rgName, resources);

    return {
        $schema: "https://schema.management.azure.com/schemas/2015-01-01/deploymentTemplate.json#",
        contentVersion: "1.0.0.0",
        resources: out,
    };
}
