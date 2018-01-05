import { assert, expect } from "chai";
import "mocha";
import { WebSite } from "../dsl/Website";
import { ContainerRegistry, ServerFarm, compile } from "../index";

describe("the website resource", () => {
    it("can be constructed", () => {
        const website = new WebSite("site_name_here");
    });

    it("bans spaces in the name", () => {
        expect(() => {
            const website = new WebSite("spaces are present");
        }).to.throw();
    });

    it("bans dashes in the name", () => {
        expect(() => {
            const website = new WebSite("dashes-are-present");
        }).to.throw();
    });

    it("produces a reasonable output when emitted directly", () => {
        const website = new WebSite("site_name");
        const emitInfo = { resource_group_name: "rg_name", subscription_name: "s_name" };
        const emitted = website.emit(emitInfo);
        expect(emitted).to.be.deep.equal({
            apiVersion: "2016-08-01",
            type: "Microsoft.Web/sites",
            name: "site_name",
            location: "West US",
            properties: {
                serverFarmId: undefined,
            },
            resources: [
                {
                    apiVersion: "2016-08-01",
                    type: "config",
                    name: "appsettings",
                    properties: {
                        linuxFxVersion: undefined,
                    },
                },
            ],
        });
    });

    it("can depend on a server farm", () => {
        const serverFarm = new ServerFarm("farm_name");
        const website = new WebSite("site_name", { serverFarm });
        const emitInfo = { resource_group_name: "rg_name", subscription_name: "s_name" };
        const emitted = website.emit(emitInfo);
        expect(emitted).to.be.deep.equal({
            apiVersion: "2016-08-01",
            name: "site_name",
            properties: {
                serverFarmId: "/subscriptions/s_name/resourceGroups/rg_name/providers/Microsoft.Web/serverfarms/farm_name",
            },
            resources: [
                {
                    apiVersion: "2016-08-01",
                    type: "config",
                    name: "appsettings",
                    properties: {
                        linuxFxVersion: undefined,
                    },
                },
            ],
            type: "Microsoft.Web/sites",
            location: "West US",
        });
    });

    it("can be built from a docker image", () => {
        const containerRegistry = new ContainerRegistry("mycontainers");
        const website = new WebSite("site_name", {
            docker: {
                containerRegistry,
                image: "image_name",
                tag: "latest",
            },
        });
        const emitInfo = { resource_group_name: "rg_name", subscription_name: "s_name" };
        const emitted = website.emit(emitInfo);
        expect(emitted).to.be.deep.equal({
            apiVersion: "2016-08-01",
            name: "site_name",
            type: "Microsoft.Web/sites",
            location: "West US",
            properties: {
                serverFarmId: undefined,
            },
            resources: [
                {
                    apiVersion: "2016-08-01",
                    type: "config",
                    name: "appsettings",
                    properties: {
                        linuxFxVersion: "DOCKER|mycontainers.azurecr.io/image_name:latest",
                    },
                },
            ],
        });
    });

    it("includes docker and server farm resources as dependson", () => {
        const containerRegistry = new ContainerRegistry("mycontainers");
        const serverFarm = new ServerFarm("farm_name");
        const website = new WebSite("site_name", {
            serverFarm,
            docker: {
                containerRegistry,
                image: "image_name",
                tag: "latest",
            },
        });

        const out = compile("my_subscription_name", "my_resource_group", website);

        expect(out.resources.length).to.be.equal(3);
        expect(out.resources.some(r => r.type === "Microsoft.Web/sites")).to.be.equal(true);
        expect(out.resources.some(r => r.type === "Microsoft.ContainerRegistry/registries")).to.be.equal(true);
        expect(out.resources.some(r => r.type === "Microsoft.Web/serverfarms")).to.be.equal(true);
    });
});
