import { assert, expect } from "chai";
import "mocha";
import { compile } from "../dsl/internal/emit";
import { WebSite } from "../dsl/Website";

describe("compilation", () => {
    it("fails when two resources have the same name", () => {
        expect(() => {
            const web1 = new WebSite("foo");
            const web2 = new WebSite("foo");
            compile(web1, web2);
        }).to.throw();
    });

    it("succeeds when called with no resources", () => {
        compile();
    });

    it("succeeds when called with a single valid resource", () => {
        compile(new WebSite("foo"));
    });
});
