import { EmitProperties, Resource, ResourceBase, ResourceEmit } from "./Resource";

export class WebSite extends ResourceBase implements Resource {
    get dependencies() {
        return [];
    }

    public emit(emitProperties: EmitProperties): ResourceEmit[] {
        return [{
            type: "Microsoft.Web/sites",
            apiVersion: "2016-08-01",
            name: this.name,
            properties: {},
        }];
    }

    public validate() { }
}
