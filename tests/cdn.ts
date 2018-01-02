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
        const cdnCache = new Cdn("cdn_name_here", "myhostname", "myoriginname", undefined, "US-East");
        const emitInfo = { resource_group_name: "rg_name", subscription_name: "s_name" };
        const emitted = cdnCache.emit(emitInfo);
        expect(emitted[0].location).equals("US-East");
        expect((emitted[0] as any).resources[0].location).equals("US-East");
    });

    it("can have the compression overridden", () => {
        const cdnCache = new Cdn("cdn_name_here", "myhostname", "myoriginname", false);
        const emitInfo = { resource_group_name: "rg_name", subscription_name: "s_name" };
        const emitted = cdnCache.emit(emitInfo);
        expect((emitted[0] as any).resources[0].properties.isCompressionEnabled).equals(false);
    });

    it("can have the sku overridden", () => {
        const cdnCache = new Cdn("cdn_name_here", "myhostname", "myoriginname", undefined, undefined, "Standard_Akamai");
        const emitInfo = { resource_group_name: "rg_name", subscription_name: "s_name" };
        const emitted = cdnCache.emit(emitInfo);
        expect((emitted[0] as any).sku.name).equals("Standard_Akamai");
    });

    it("produces a reasonable output when emitted directly", () => {
        const cdnCache = new Cdn("cdn_name_here", "myhostname", "myoriginname");
        const emitInfo = { resource_group_name: "rg_name", subscription_name: "s_name" };
        const emitted = cdnCache.emit(emitInfo);
        expect(emitted).to.be.deep.equal([
            {
                apiVersion: "2016-04-02",
                location: "US-West",
                name: "cdn_name_here",
                type: "Microsoft.Cdn/profiles",
                resources: [
                    {
                        apiVersion: "2016-04-02",
                        location: "US-West",
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
                        type: "endpoints",
                    },
                ],
                sku: {
                    name: "Standard_Verizon",
                },
            },
        ]);
    });
});
