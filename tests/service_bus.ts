import { assert, expect } from "chai";
import "mocha";
import { ServiceBus } from "../dsl/ServiceBus";

describe("the service bus resource", () => {
    it("can be constructed", () => {
        const redisCache = new ServiceBus("service_bus_name_here", []);
    });

    it("bans spaces in the name", () => {
        expect(() => {
            const redisCache = new ServiceBus("spaces are present", []);
        }).to.throw();
    });

    it("bans dashes in the name", () => {
        expect(() => {
            const redisCache = new ServiceBus("dashes-are-present", []);
        }).to.throw();
    });

    it("can override the sku", () => {
        const redisCache = new ServiceBus("service_bus_name", [], {
            sku: "Premium",
        });
        const emitInfo = { resource_group_name: "rg_name", subscription_name: "s_name" };
        const [emitted] = redisCache.emit(emitInfo);
        expect((emitted as any).sku.name).to.be.equal("Premium");
    });

    it("produces a reasonable output when emitted directly", () => {
        const redisCache = new ServiceBus("service_bus_name", [{ name: "my_queue" }]);
        const emitInfo = { resource_group_name: "rg_name", subscription_name: "s_name" };
        const [serviceBus, config, queue] = redisCache.emit(emitInfo);

        expect(serviceBus).to.be.deep.equal({
            apiVersion: "2017-04-01",
            location: "West US",
            name: "service_bus_name",
            properties: {
                serviceBusEndpoint: "https://service_bus_name.servicebus.windows.net:443",
            },
            sku: {
                name: "Standard",
            },
            type: "Microsoft.ServiceBus/namespaces",
        });

        expect(config).to.be.deep.equal({
            apiVersion: "2017-04-01",
            dependsOn: [
                "/subscriptions/s_name/resourceGroups/rg_name/providers/Microsoft.ServiceBus/namespaces/service_bus_name",
            ],
            name: "service_bus_name_auth_rules",
            properties: {
                rights: [
                    "Send",
                    "Listen",
                ],
            },
            type: "Microsoft.ServiceBus/namespaces/AuthorizationRules",
        });

        expect(queue).to.be.deep.equal({
            apiVersion: "2017-04-01",
            dependsOn: [
                "/subscriptions/s_name/resourceGroups/rg_name/providers/Microsoft.ServiceBus/namespaces/service_bus_name",
            ],
            location: "West US",
            name: "my_queue",
            properties: {},
            type: "Microsoft.ServiceBus/namespaces/queues",
        });
    });
});
