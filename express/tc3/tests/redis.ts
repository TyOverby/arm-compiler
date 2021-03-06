import { assert, expect } from "chai";
import "mocha";
import { Redis } from "../dsl/Redis";

describe("the redis resource", () => {
    it("can be constructed", () => {
        const redisCache = new Redis("redisnamehere");
    });

    it("bans underscores in the name", () => {
        expect(() => {
            const redisCache = new Redis("redis_name_here");
        }).to.throw();
    });

    it("bans spaces in the name", () => {
        expect(() => {
            const redisCache = new Redis("spaces are present");
        }).to.throw();
    });

    it("bans dashes in the name", () => {
        expect(() => {
            const redisCache = new Redis("dashes-are-present");
        }).to.throw();
    });

    it("produces a reasonable output when emitted directly", () => {
        const redisCache = new Redis("redisname");
        const emitInfo = { resource_group_name: "rg_name", subscription_name: "s_name" };
        const [emitted] = redisCache.emit(emitInfo);
        expect(emitted).to.be.deep.equal({
            apiVersion: "2016-04-01",
            name: "redisname",
            location: "West US",
            properties: {
                enableNonSslPort: false,
                sku: {
                    capacity: 1,
                    family: "C",
                    name: "Standard",
                },
            },
            type: "Microsoft.Cache/Redis",
        });
    });
});
