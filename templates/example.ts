import { WebSite } from "../dsl/Website";

const website = new WebSite("my_new_website");

const emitProps = {
    subscription_name: "my-subscription",
    resource_group_name: "my-resource-group",
};

console.log(website.emit(emitProps));
