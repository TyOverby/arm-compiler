import { assert, expect } from "chai";
import "mocha";
import { ContainerRegistry } from "../dsl/ContainerRegistry";

describe("the registry resource", () => {
    it("can be constructed", () => {
        const registry = new ContainerRegistry("registry_name_here");
    });

    it("bans spaces in the name", () => {
        expect(() => {
            const registry = new ContainerRegistry("spaces are present");
        }).to.throw();
    });

    it("bans dashes in the name", () => {
        expect(() => {
            const registry = new ContainerRegistry("dashes-are-present");
        }).to.throw();
    });

    it("produces a reasonable output when emitted directly", () => {
        const registry = new ContainerRegistry("registry_name");
        const emitInfo = { resource_group_name: "rg_name", subscription_name: "s_name" };
        const emitted = registry.emit(emitInfo);
        expect(emitted).to.be.deep.equal([
            {
                apiVersion: "2017-10-01",
                name: "registry_name",
                location: "Central US",
                properties: {
                    adminUserEnabled: false,
                },
                sku: {
                    name: "Standard",
                },
                type: "Microsoft.ContainerRegistry/registries",
            },
        ]);
    });

    it("can have the sku changed manually", () => {
        const registry = new ContainerRegistry("registry_name", "Premium");
        const emitInfo = { resource_group_name: "rg_name", subscription_name: "s_name" };
        const emitted = registry.emit(emitInfo);
        expect(emitted).to.be.deep.equal([
            {
                apiVersion: "2017-10-01",
                name: "registry_name",
                location: "Central US",
                properties: {
                    adminUserEnabled: false,
                },
                sku: {
                    name: "Premium",
                },
                type: "Microsoft.ContainerRegistry/registries",
            },
        ]);
    });
});
