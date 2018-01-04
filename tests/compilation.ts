import { assert, expect } from "chai";
import "mocha";
import { compile } from "../dsl/internal/emit";
import { WebSite } from "../dsl/Website";

describe("compilation", () => {
    it("fails when two resources have the same name", () => {
        expect(() => {
            const web1 = new WebSite("foo");
            const web2 = new WebSite("foo");
            compile("my_subscription", "my_resource_group", web1, web2);
        }).to.throw();
    });

    it("succeeds when called with no resources", () => {
        compile("my_subscription", "my_resource_group");
    });

    it("succeeds when called with a single valid resource", () => {
        compile("my_subscription", "my_resource_group", new WebSite("foo"));
    });

    it("produces reasonable values for a single resource", () => {
        const out = compile("my_subscription", "my_resource_group", new WebSite("foo"));
        expect(out).to.deep.equal({
            $schema: "https://schema.management.azure.com/schemas/2015-01-01/deploymentTemplate.json#",
            contentVersion: "1.0.0.0",
            resources: [{
                name: "foo",
                type: "Microsoft.Web/sites",
                apiVersion: "2016-08-01",
                location: "West US",
                dependsOn: [],
                properties: {},
            }],
        });
    });

    it("tracks dependencies", () => {
        const website1 = new WebSite("website_1");
        const website2 = new WebSite("website_2", { dependencies: [website1] });

        const out = compile("my_subscription", "my_resource_group", website2);
        expect(out.resources.length).to.be.equal(2);

        const found1 = out.resources.find(a => a.name === "website_1");
        const found2 = out.resources.find(a => a.name === "website_2");

        // tslint:disable-next-line
        expect(found1).to.not.be.null;
        // tslint:disable-next-line
        expect(found2).to.not.be.null;

        expect(found2!.dependsOn![0]).to.be.equal(
            "/subscriptions/my_subscription/resourceGroups/my_resource_group/providers/Microsoft.Web/sites/website_1");
    });
});
