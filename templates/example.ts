import { WebSite } from "../dsl/Website";

const website = new WebSite("my-new-website");

const emitProps = {
    subscription_name: "my-subscription",
    resource_group_name: "my-resource-group",
};

console.log(website.emit(emitProps));
