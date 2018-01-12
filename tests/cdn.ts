import { assert, expect } from "chai";
import "mocha";
import { Cdn } from "../dsl/Cdn";

describe("the cdn resource", () => {
    it("can be constructed", () => {
        const cdnCache = new Cdn("cdn_name_here", "myhostname", "myoriginname");
    });

    it("bans spaces in the name", () => {
        expect(() => {
            const cdnCache = new Cdn("cdn name here", "myhostname", "myoriginname");
        }).to.throw();
    });

    it("bans dashes in the name", () => {
        expect(() => {
            const cdnCache = new Cdn("cdn-name-here", "myhostname", "myoriginname");
        }).to.throw();
    });

    it("can have the location overridden", () => {
        const cdnCache = new Cdn("cdn_name_here", "myhostname", "myoriginname", {
            location: "East US",
        });

        const emitInfo = { resource_group_name: "rg_name", subscription_name: "s_name" };
        const [emitted, endpoint] = cdnCache.emit(emitInfo);
        expect(emitted.location).equals("East US");
        expect((endpoint as any).location).equals("East US");
    });

    it("can have the compression overridden", () => {
        const cdnCache = new Cdn("cdn_name_here", "myhostname", "myoriginname", {
            isCompressionEnabled: false,
        });

        const emitInfo = { resource_group_name: "rg_name", subscription_name: "s_name" };
        const [emitted, endpoint] = cdnCache.emit(emitInfo);
        expect((endpoint as any).properties.isCompressionEnabled).equals(false);
    });

    it("can have the sku overridden", () => {
        const cdnCache = new Cdn("cdn_name_here", "myhostname", "myoriginname", {
            sku: "Standard_Akamai",
        });

        const emitInfo = { resource_group_name: "rg_name", subscription_name: "s_name" };
        const [emitted] = cdnCache.emit(emitInfo);
        expect((emitted as any).sku.name).equals("Standard_Akamai");
    });

    it("produces a reasonable output when emitted directly", () => {
        const cdnCache = new Cdn("cdn_name_here", "myhostname", "myoriginname");
        const emitInfo = { resource_group_name: "rg_name", subscription_name: "s_name" };
        const [emitted, endpoint] = cdnCache.emit(emitInfo);
        expect(emitted).to.be.deep.equal({
            apiVersion: "2016-04-02",
            location: "West US",
            name: "cdn_name_here",
            type: "Microsoft.Cdn/profiles",
            sku: {
                name: "Standard_Verizon",
            },
        });
        expect(endpoint).to.be.deep.equal({
            type: "Microsoft.Cdn/profiles/endpoints",
            apiVersion: "2016-04-02",
            location: "West US",
            name: "cdn_name_here_endpoint",
            properties: {
                isCompressionEnabled: true,
                originHostHeader: "myhostname",
                origins: [
                    {
                        name: "myoriginname",
                        properties: {
                            hostName: "myhostname",
                        },
                    },
                ],
            },
            dependsOn: [
                "/subscriptions/s_name/resourceGroups/rg_name/providers/Microsoft.Cdn/profiles/cdn_name_here",
            ],
        });
    });
});
