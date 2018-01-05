import { compile } from "../dsl/internal/emit";
import { WebSite } from "../dsl/Website";

const website = new WebSite("my_new_website");
console.log(compile("my_subscription", "my-resource-group", website));
