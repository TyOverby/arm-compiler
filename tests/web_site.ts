import { assert, expect } from "chai";
import "mocha";
import { WebSite } from "../dsl/Website";

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
        expect(emitted).to.be.deep.equal([
            {
                apiVersion: "2016-08-01",
                name: "site_name",
                properties: {},
                type: "Microsoft.Web/sites",
                location: "West US",
            },
        ]);
    });
});
