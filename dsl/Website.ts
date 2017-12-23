import { Resource, ResourceEmit, ResourceBase, EmitProperties } from './Resource';
import { assert } from '../src/util';

export class WebSite extends ResourceBase implements Resource {
    get dependencies() {
        return [];
    }

    emit(emitProperties: EmitProperties): ResourceEmit[] {
        return [{
            type: "Microsoft.Web/sites",
            apiVersion: "2016-08-01",
            name: this.name,
            properties: {},
        }];
    }
}
