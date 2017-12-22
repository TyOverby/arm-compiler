import { deployment_template } from "./out/deploymentTemplate"

let t: deployment_template.t =

{
    "schema": "https://schema.management.azure.com/schemas/2015-01-01/deploymentTemplate.json#",
    "contentVersion": "1.0.0.0",
    "parameters": {
        "registryName": {
            "type": "string",
            "defaultValue": "trydotnet2cr",
            "metadata": {
                "description": "The name of the container registry."
            }
        },
        "registryLocation": {
            "type": "string",
            "defaultValue": "Central US",
            "metadata": {
                "description": "The location of the container registry. This cannot be changed after the resource is created."
            }
        },
        "registrySku": {
            "type": "string",
            "defaultValue": "Standard",
            "metadata": {
                "description": "The SKU of the container registry."
            }
        },
        "registryApiVersion": {
            "type": "string",
            "defaultValue": "2017-10-01",
            "metadata": {
                "description": "The API version of the container registry."
            }
        },
        "adminUserEnabled": {
            "type": "bool",
            "defaultValue": false,
            "metadata": {
                "description": "The value that indicates whether the admin user is enabled."
            }
        },
        "registries_MLSContainerRegistry_name": {
            "defaultValue": "mlscontainerregistry2.azurecr.io",
            "type": "securestring"
        },
        "registries_MLSContainerRegistry_accessKey": {
            "defaultValue": "xPSReNimrOlh4RnFn1iG8Ec/JjXSLbRe",
            "type": "securestring"
        },
        "databaseAccounts_trydotnet_name": {
            "defaultValue": "trydotnet2",
            "type": "securestring"
        },
        "Redis_mls_name": {
            "defaultValue": "mls2redis",
            "type": "string"
        },
        "sites_trydotnet_name": {
            "defaultValue": "trydotnet2",
            "type": "string"
        },
        "profiles_MLS_CDN_name": {
            "defaultValue": "MLSCDN2",
            "type": "string"
        },
        "vaults_MLS_KEYs_name": {
            "defaultValue": "MLS-KEYs2",
            "type": "string"
        },
        "sites_MLS_Monitoring_name": {
            "defaultValue": "MLS-Monitoring2",
            "type": "string"
        },
        "sites_trydotnetagent_name": {
            "defaultValue": "trydotnetagent2",
            "type": "string"
        },
        "sites_trydotnet_staging_name": {
            "defaultValue": "trydotnet-staging2",
            "type": "string"
        },
        "actionGroups_MLS_DEV_name": {
            "defaultValue": "MLS-DEV2",
            "type": "string"
        },
        "components_trydotnet_name": {
            "defaultValue": "trydotnet2",
            "type": "string"
        },
        "config_web_name": {
            "defaultValue": "web",
            "type": "string"
        },
        "storageAccounts_mlsagent_name": {
            "defaultValue": "mlsagent2",
            "type": "string"
        },
        "sites_trydotnetagent_staging_name": {
            "defaultValue": "trydotnetagent-staging2",
            "type": "string"
        },
        "storageAccounts_trydotnet_name": {
            "defaultValue": "trydotnet2",
            "type": "string"
        },
        "autoscalesettings_default_name": {
            "defaultValue": "default",
            "type": "string"
        },
        "components_trydotnet_test_name": {
            "defaultValue": "trydotnet-test2",
            "type": "string"
        },
        "serverfarms_MLS_Web_ServicePlan_name": {
            "defaultValue": "MLS-Web-ServicePlan2",
            "type": "string"
        },
        "config_web_name_1": {
            "defaultValue": "web",
            "type": "string"
        },
        "config_web_name_2": {
            "defaultValue": "web",
            "type": "string"
        },
        "alertrules_File_load_failed_name": {
            "defaultValue": "File load failed",
            "type": "string"
        },
        "databaseAccounts_trydotnet_name_1": {
            "defaultValue": "trydotnetdbname2",
            "type": "string"
        },
        "webtests_index_200_trydotnet_name": {
            "defaultValue": "index 200-trydotnet",
            "type": "string"
        },
        "alertrules_Request_500_errors_name": {
            "defaultValue": "Request 500 errors",
            "type": "string"
        },
        "webtests_editor_200_trydotnet_name": {
            "defaultValue": "editor 200-trydotnet",
            "type": "string"
        },
        "namespaces_mls_orchestrator_name": {
            "defaultValue": "mls-orchestrator-2",
            "type": "string"
        },
        "config_web_name_3": {
            "defaultValue": "web",
            "type": "string"
        },
        "endpoints_trydotnet_name": {
            "defaultValue": "trydotnet",
            "type": "string"
        },
        "namespaces_mls_orchestrator_test_name": {
            "defaultValue": "mls-orchestrator-test2",
            "type": "string"
        },
        "serverfarms_MLS_Web_Staging_ServicePlan_name": {
            "defaultValue": "MLS-Web-Staging-ServicePlan",
            "type": "string"
        },
        "webtests_basic_availability_trydotnet_name": {
            "defaultValue": "basic availability-trydotnet",
            "type": "string"
        },
        "jobCollections_MLS_Orchestrator_jobs_name": {
            "defaultValue": "MLS-Orchestrator-jobs",
            "type": "string"
        },
        "storageAccounts_mlsdockerregistry143619_name": {
            "defaultValue": "mlsdockerregistry1436192",
            "type": "string"
        },
        "alertrules_Min_Development_environments_name": {
            "defaultValue": "Min Development environments",
            "type": "string"
        },
        "hostNameBindings_try.dot.net_name": {
            "defaultValue": "try.dot.net",
            "type": "string"
        },
        "alertrules_Failure_Anomalies___trydotnet_name": {
            "defaultValue": "Failure Anomalies - trydotnet",
            "type": "string"
        },
        "serverfarms_WebApplication1220170118014620Plan_name": {
            "defaultValue": "WebApplication1220170118014620Plan",
            "type": "string"
        },
        "alertrules_Failed_request___HTTP_error_500_name": {
            "defaultValue": "Failed request - HTTP error 500",
            "type": "string"
        },
        "queues_create_name": {
            "defaultValue": "create",
            "type": "string"
        },
        "alertrules_Failure_Anomalies___trydotnet_test_name": {
            "defaultValue": "Failure Anomalies - trydotnet-test",
            "type": "string"
        },
        "webtests_compile_the_same_valid_code_trydotnet_name": {
            "defaultValue": "compile the same valid code-trydotnet",
            "type": "string"
        },
        "deployments_637861512697004611_name": {
            "defaultValue": "6378615126970046112",
            "type": "string"
        },
        "deployments_637851512696845555_name": {
            "defaultValue": "6378515126968455552",
            "type": "string"
        },
        "deployments_637841512696753691_name": {
            "defaultValue": "6378415126967536912",
            "type": "string"
        },
        "deployments_531601508613608512_name": {
            "defaultValue": "5316015086136085122",
            "type": "string"
        },
        "deployments_531591508612942085_name": {
            "defaultValue": "5315915086129420852",
            "type": "string"
        },
        "deployments_531581508612175873_name": {
            "defaultValue": "5315815086121758732",
            "type": "string"
        },
        "deployments_531571508611907534_name": {
            "defaultValue": "5315715086119075342",
            "type": "string"
        },
        "deployments_531561508611805568_name": {
            "defaultValue": "5315615086118055682",
            "type": "string"
        },
        "deployments_531551508610276229_name": {
            "defaultValue": "5315515086102762292",
            "type": "string"
        },
        "deployments_531541508607505636_name": {
            "defaultValue": "5315415086075056362",
            "type": "string"
        },
        "queues_create_name_1": {
            "defaultValue": "create",
            "type": "string"
        },
        "queues_assignlease_name": {
            "defaultValue": "assignlease",
            "type": "string"
        },
        "queues_deprovision_name": {
            "defaultValue": "deprovision",
            "type": "string"
        },
        "origins_try_dot_net_name": {
            "defaultValue": "try-dot-net",
            "type": "string"
        },
        "queues_assignlease_name_1": {
            "defaultValue": "assignlease",
            "type": "string"
        },
        "queues_deprovision_name_1": {
            "defaultValue": "deprovision",
            "type": "string"
        },
        "queues_pollforreadiness_name": {
            "defaultValue": "pollforreadiness",
            "type": "string"
        },
        "hostNameBindings_trydotnet.azurewebsites.net_name": {
            "defaultValue": "trydotnet-2.azurewebsites.net",
            "type": "string"
        },
        "queues_checkcontainerhealth_name": {
            "defaultValue": "checkcontainerhealth",
            "type": "string"
        },
        "queues_pollforreadiness_name_1": {
            "defaultValue": "pollforreadiness",
            "type": "string"
        },
        "AuthorizationRules_orchestrator_name": {
            "defaultValue": "orchestrator",
            "type": "string"
        },
        "queues_checkcontainerhealth_name_1": {
            "defaultValue": "checkcontainerhealth",
            "type": "string"
        },
        "hostNameBindings_mls_monitoring.azurewebsites.net_name": {
            "defaultValue": "mls-monitoring2.azurewebsites.net",
            "type": "string"
        },
        "alertrules_index_200_trydotnet_95ca58e5_e123_49f3_bbcf_fd2fdc71ee1b_name": {
            "defaultValue": "index 200-trydotnet-95ca58e5-e123-49f3-bbcf-fd2fdc71ee1b",
            "type": "string"
        },
        "alertrules_editor_200_trydotnet_23698f60_e608_4c9e_bfd0_bb02d7ac4456_name": {
            "defaultValue": "editor 200-trydotnet-23698f60-e608-4c9e-bfd0-bb02d7ac4456",
            "type": "string"
        },
        "certificates_2C6DC7B7612545869CA9536BCC758F5CA00B342B#MLS_RG_WestUSwebspace_name": {
            "defaultValue": "2C6DC7B7612545869CA9536BCC758F5CA00B342B#MLS-RG-WestUSwebspace",
            "type": "string"
        },
        "certificates_7B090701A45E4E032CB81DEF59112054B486E52B#MLS_RG_WestUSwebspace_name": {
            "defaultValue": "7B090701A45E4E032CB81DEF59112054B486E52B#MLS-RG-WestUSwebspace",
            "type": "string"
        },
        "AuthorizationRules_orchestrator_dev_name": {
            "defaultValue": "orchestrator-dev",
            "type": "string"
        },
        "jobs_mls_orchestrator_pool_topoff_name": {
            "defaultValue": "mls-orchestrator-pool-topoff",
            "type": "string"
        },
        "hostNameBindings_trydotnet_staging.azurewebsites.net_name": {
            "defaultValue": "trydotnet-staging-2.azurewebsites.net",
            "type": "string"
        },
        "jobs_mls_orchestrator_pool_refresh_name": {
            "defaultValue": "mls-orchestrator-pool-refresh",
            "type": "string"
        },
        "AuthorizationRules_RootManageSharedAccessKey_name": {
            "defaultValue": "RootManageSharedAccessKey",
            "type": "string"
        },
        "alertrules_basic_availability_trydotnet_72f655dc_42c2_4582_81e8_af7ac2200131_name": {
            "defaultValue": "basic availability-trydotnet-72f655dc-42c2-4582-81e8-af7ac2200131",
            "type": "string"
        },
        "AuthorizationRules_RootManageSharedAccessKey_name_1": {
            "defaultValue": "RootManageSharedAccessKey",
            "type": "string"
        },
        "hostNameBindings_trydotnetagent_staging.azurewebsites.net_name": {
            "defaultValue": "trydotnetagent-staging-2.azurewebsites.net",
            "type": "string"
        },
        "alertrules_compile_the_same_valid_code_trydotnet_ebbac66d_8aea_4083_aca9_75c73874d36c_name": {
            "defaultValue": "compile the same valid code-trydotnet-ebbac66d-8aea-4083-aca9-75c73874d36c",
            "type": "string"
        },
        "jobs_mls_orchestrator_pool_check_container_health_name": {
            "defaultValue": "mls-orchestrator-pool-check_container_health",
            "type": "string"
        }
    },
    "variables": {},
    "resources": [
        {
            "name": "[parameters('registryName')]",
            "type": "Microsoft.ContainerRegistry/registries",
            "location": "[parameters('registryLocation')]",
            "apiVersion": "[parameters('registryApiVersion')]",
            "sku": {
                "name": "[parameters('registrySku')]"
            },
            "properties": {
                "adminUserEnabled": "[parameters('adminUserEnabled')]"
            }
        },
        {
            "comments": "Generalized from resource: '/subscriptions/fea3a3c9-c4a3-4743-9835-1502a54705e9/resourceGroups/MLS-RG/providers/Microsoft.Cache/Redis/mls'.",
            "type": "Microsoft.Cache/Redis",
            "name": "[parameters('Redis_mls_name')]",
            "apiVersion": "2016-04-01",
            "location": "West US",
            "tags": {},
            "scale": null,
            "properties": {
                "redisVersion": "3.2.7",
                "sku": {
                    "name": "Standard",
                    "family": "C",
                    "capacity": 1
                },
                "enableNonSslPort": false,
                "redisConfiguration": {
                    "maxclients": "1000",
                    "maxmemory-reserved": "50",
                    "maxfragmentationmemory-reserved": "50",
                    "maxmemory-delta": "50"
                }
            },
            "dependsOn": []
        },
        {
            "comments": "Generalized from resource: '/subscriptions/fea3a3c9-c4a3-4743-9835-1502a54705e9/resourcegroups/MLS-RG/providers/Microsoft.Cdn/profiles/MLS-CDN'.",
            "type": "Microsoft.Cdn/profiles",
            "sku": {
                "name": "Premium_Verizon"
            },
            "name": "[parameters('profiles_MLS_CDN_name')]",
            "apiVersion": "2016-04-02",
            "location": "WestUs",
            "tags": {},
            "scale": null,
            "properties": {
                "provisioningState": "Succeeded",
                "resourceState": "Active"
            },
            "dependsOn": []
        },
        {
            "comments": "Generalized from resource: '/subscriptions/fea3a3c9-c4a3-4743-9835-1502a54705e9/resourceGroups/MLS-RG/providers/Microsoft.DocumentDB/databaseAccounts/trydotnet'.",
            "type": "Microsoft.DocumentDB/databaseAccounts",
            "kind": "GlobalDocumentDB",
            "name": "[parameters('databaseAccounts_trydotnet_name_1')]",
            "apiVersion": "2015-04-08",
            "location": "West US",
            "tags": {
                "defaultExperience": "DocumentDB"
            },
            "scale": null,
            "properties": {
                "databaseAccountOfferType": "Standard",
                "consistencyPolicy": {
                    "defaultConsistencyLevel": "Session",
                    "maxIntervalInSeconds": 5,
                    "maxStalenessPrefix": 100
                },
                "name": "[parameters('databaseAccounts_trydotnet_name')]"
            },
            "dependsOn": []
        },
        {
            "comments": "Generalized from resource: '/subscriptions/fea3a3c9-c4a3-4743-9835-1502a54705e9/resourceGroups/MLS-RG/providers/Microsoft.KeyVault/vaults/MLS-KEYs'.",
            "type": "Microsoft.KeyVault/vaults",
            "name": "[parameters('vaults_MLS_KEYs_name')]",
            "apiVersion": "2015-06-01",
            "location": "westus",
            "tags": {},
            "scale": null,
            "properties": {
                "sku": {
                    "family": "A",
                    "name": "standard"
                },
                "tenantId": "72f988bf-86f1-41af-91ab-2d7cd011db47",
                "accessPolicies": [
                    {
                        "tenantId": "72f988bf-86f1-41af-91ab-2d7cd011db47",
                        "objectId": "c3afdbd9-31b9-4b45-871a-72e7a0dcce3c",
                        "permissions": {
                            "keys": [
                                "Backup",
                                "Create",
                                "Delete",
                                "Get",
                                "Import",
                                "List",
                                "Restore",
                                "Update"
                            ],
                            "secrets": [
                                "All"
                            ]
                        }
                    },
                    {
                        "tenantId": "72f988bf-86f1-41af-91ab-2d7cd011db47",
                        "objectId": "c69d628d-1c0f-4c3f-847b-dc99d8fce83e",
                        "permissions": {
                            "keys": [
                                "All"
                            ],
                            "secrets": [
                                "All"
                            ]
                        }
                    },
                    {
                        "tenantId": "72f988bf-86f1-41af-91ab-2d7cd011db47",
                        "objectId": "1145ac3c-0fde-4a07-8a9d-fa18f153dec0",
                        "permissions": {
                            "keys": [
                                "All"
                            ],
                            "secrets": [
                                "All"
                            ]
                        }
                    },
                    {
                        "tenantId": "72f988bf-86f1-41af-91ab-2d7cd011db47",
                        "objectId": "1102b3e6-c327-4944-a87a-10b84eab942b",
                        "permissions": {
                            "keys": [
                                "All"
                            ],
                            "secrets": [
                                "Get",
                                "List"
                            ]
                        }
                    }
                ],
                "enabledForDeployment": true
            },
            "dependsOn": []
        },
        {
            "comments": "Generalized from resource: '/subscriptions/fea3a3c9-c4a3-4743-9835-1502a54705e9/resourceGroups/MLS-RG/providers/Microsoft.Scheduler/jobCollections/MLS-Orchestrator-jobs'.",
            "type": "Microsoft.Scheduler/jobCollections",
            "name": "[parameters('jobCollections_MLS_Orchestrator_jobs_name')]",
            "apiVersion": "2016-03-01",
            "location": "West US",
            "scale": null,
            "properties": {
                "sku": {
                    "name": "Standard"
                },
                "state": "Enabled",
                "quota": {
                    "maxJobCount": 50,
                    "maxRecurrence": {
                        "frequency": "minute",
                        "interval": 1
                    }
                }
            },
            "dependsOn": []
        },
        {
            "comments": "Generalized from resource: '/subscriptions/fea3a3c9-c4a3-4743-9835-1502a54705e9/resourceGroups/MLS-RG/providers/Microsoft.ServiceBus/namespaces/mls-orchestrator-test'.",
            "type": "Microsoft.ServiceBus/namespaces",
            "sku": {
                "name": "Standard",
                "tier": "Standard"
            },
            "name": "[parameters('namespaces_mls_orchestrator_test_name')]",
            "apiVersion": "2017-04-01",
            "location": "West US",
            "tags": {},
            "scale": null,
            "properties": {
                "provisioningState": "Succeeded",
                "metricId": "[concat('fea3a3c9-c4a3-4743-9835-1502a54705e9:', parameters('namespaces_mls_orchestrator_test_name'))]",
                "createdAt": "2017-11-02T21:39:41.41Z",
                "updatedAt": "2017-11-02T21:42:43.793Z",
                "serviceBusEndpoint": "[concat('https://', parameters('namespaces_mls_orchestrator_test_name'),'.servicebus.windows.net:443/')]"
            },
            "dependsOn": []
        },
        {
            "comments": "Generalized from resource: '/subscriptions/fea3a3c9-c4a3-4743-9835-1502a54705e9/resourceGroups/MLS-RG/providers/Microsoft.ServiceBus/namespaces/mls-orchestrator'.",
            "type": "Microsoft.ServiceBus/namespaces",
            "sku": {
                "name": "Standard",
                "tier": "Standard"
            },
            "name": "[parameters('namespaces_mls_orchestrator_name')]",
            "apiVersion": "2017-04-01",
            "location": "West US",
            "tags": {},
            "scale": null,
            "properties": {
                "provisioningState": "Succeeded",
                "metricId": "[concat('fea3a3c9-c4a3-4743-9835-1502a54705e9:', parameters('namespaces_mls_orchestrator_name'))]",
                "createdAt": "2017-09-29T21:17:17.33Z",
                "updatedAt": "2017-11-14T01:05:22.027Z",
                "serviceBusEndpoint": "[concat('https://', parameters('namespaces_mls_orchestrator_name'),'.servicebus.windows.net:443/')]"
            },
            "dependsOn": []
        },
        {
            "comments": "Generalized from resource: '/subscriptions/fea3a3c9-c4a3-4743-9835-1502a54705e9/resourceGroups/mls-rg/providers/Microsoft.Storage/storageAccounts/mlsagent'.",
            "type": "Microsoft.Storage/storageAccounts",
            "sku": {
                "name": "Standard_LRS",
                "tier": "Standard"
            },
            "kind": "Storage",
            "name": "[parameters('storageAccounts_mlsagent_name')]",
            "apiVersion": "2017-06-01",
            "location": "westus",
            "tags": {},
            "scale": null,
            "properties": {
                "encryption": {
                    "keySource": "Microsoft.Storage",
                    "services": {
                        "blob": {
                            "enabled": true
                        },
                        "file": {
                            "enabled": true
                        }
                    }
                },
                "networkAcls": {
                    "bypass": "AzureServices",
                    "defaultAction": "Allow",
                    "ipRules": [],
                    "virtualNetworkRules": []
                },
                "supportsHttpsTrafficOnly": false
            },
            "dependsOn": []
        },
        {
            "comments": "Generalized from resource: '/subscriptions/fea3a3c9-c4a3-4743-9835-1502a54705e9/resourceGroups/mls-rg/providers/Microsoft.Storage/storageAccounts/mlsdockerregistry143619'.",
            "type": "Microsoft.Storage/storageAccounts",
            "sku": {
                "name": "Standard_LRS",
                "tier": "Standard"
            },
            "kind": "Storage",
            "name": "[parameters('storageAccounts_mlsdockerregistry143619_name')]",
            "apiVersion": "2017-06-01",
            "location": "westus",
            "tags": {
                "containerregistry": "MLSDockerRegistry"
            },
            "scale": null,
            "properties": {
                "encryption": {
                    "keySource": "Microsoft.Storage",
                    "services": {
                        "blob": {
                            "enabled": true
                        },
                        "file": {
                            "enabled": true
                        }
                    }
                },
                "networkAcls": {
                    "bypass": "AzureServices",
                    "defaultAction": "Allow",
                    "ipRules": [],
                    "virtualNetworkRules": []
                },
                "supportsHttpsTrafficOnly": false
            },
            "dependsOn": []
        },
        {
            "comments": "Generalized from resource: '/subscriptions/fea3a3c9-c4a3-4743-9835-1502a54705e9/resourceGroups/mls-rg/providers/Microsoft.Storage/storageAccounts/trydotnet'.",
            "type": "Microsoft.Storage/storageAccounts",
            "sku": {
                "name": "Standard_RAGRS",
                "tier": "Standard"
            },
            "kind": "Storage",
            "name": "[parameters('storageAccounts_trydotnet_name')]",
            "apiVersion": "2017-06-01",
            "location": "westus",
            "tags": {},
            "scale": null,
            "properties": {
                "encryption": {
                    "keySource": "Microsoft.Storage",
                    "services": {
                        "blob": {
                            "enabled": true
                        }
                    }
                },
                "networkAcls": {
                    "bypass": "AzureServices",
                    "defaultAction": "Allow",
                    "ipRules": [],
                    "virtualNetworkRules": []
                },
                "supportsHttpsTrafficOnly": false
            },
            "dependsOn": []
        },
        {
            "comments": "Generalized from resource: '/subscriptions/fea3a3c9-c4a3-4743-9835-1502a54705e9/resourceGroups/MLS-RG/providers/Microsoft.Web/serverfarms/WebApplication1220170118014620Plan'.",
            "type": "Microsoft.Web/serverfarms",
            "sku": {
                "name": "F1",
                "tier": "Free",
                "size": "F1",
                "family": "F",
                "capacity": 0
            },
            "kind": "app",
            "name": "[parameters('serverfarms_WebApplication1220170118014620Plan_name')]",
            "apiVersion": "2016-09-01",
            "location": "South Central US",
            "scale": null,
            "properties": {
                "name": "[parameters('serverfarms_WebApplication1220170118014620Plan_name')]",
                "workerTierName": null,
                "adminSiteName": null,
                "hostingEnvironmentProfile": null,
                "perSiteScaling": false,
                "reserved": false,
                "targetWorkerCount": 0,
                "targetWorkerSizeId": 0
            },
            "dependsOn": []
        },
        {
            "comments": "Generalized from resource: '/subscriptions/fea3a3c9-c4a3-4743-9835-1502a54705e9/resourceGroups/MLS-RG/providers/Microsoft.Web/serverfarms/MLS-Web-ServicePlan'.",
            "type": "Microsoft.Web/serverfarms",
            "sku": {
                "name": "S3",
                "tier": "Standard",
                "size": "S3",
                "family": "S",
                "capacity": 10
            },
            "kind": "linux",
            "name": "[parameters('serverfarms_MLS_Web_ServicePlan_name')]",
            "apiVersion": "2016-09-01",
            "location": "West US",
            "scale": null,
            "properties": {
                "name": "[parameters('serverfarms_MLS_Web_ServicePlan_name')]",
                "workerTierName": null,
                "adminSiteName": null,
                "hostingEnvironmentProfile": null,
                "perSiteScaling": false,
                "reserved": true,
                "targetWorkerCount": 0,
                "targetWorkerSizeId": 0
            },
            "dependsOn": []
        },
        {
            "comments": "Generalized from resource: '/subscriptions/fea3a3c9-c4a3-4743-9835-1502a54705e9/resourceGroups/MLS-RG/providers/Microsoft.Web/serverfarms/MLS-Web-Staging-ServicePlan'.",
            "type": "Microsoft.Web/serverfarms",
            "sku": {
                "name": "S1",
                "tier": "Standard",
                "size": "S1",
                "family": "S",
                "capacity": 1
            },
            "kind": "linux",
            "name": "[parameters('serverfarms_MLS_Web_Staging_ServicePlan_name')]",
            "apiVersion": "2016-09-01",
            "location": "West US",
            "scale": null,
            "properties": {
                "name": "[parameters('serverfarms_MLS_Web_Staging_ServicePlan_name')]",
                "workerTierName": null,
                "adminSiteName": null,
                "hostingEnvironmentProfile": null,
                "perSiteScaling": false,
                "reserved": true,
                "targetWorkerCount": 0,
                "targetWorkerSizeId": 0
            },
            "dependsOn": []
        },
        {
            "comments": "Generalized from resource: '/subscriptions/fea3a3c9-c4a3-4743-9835-1502a54705e9/resourceGroups/MLS-RG/providers/Microsoft.Web/sites/MLS-Monitoring'.",
            "type": "Microsoft.Web/sites",
            "kind": "WebApp",
            "name": "[parameters('sites_MLS_Monitoring_name')]",
            "apiVersion": "2016-08-01",
            "location": "South Central US",
            "tags": {
                "hidden-related:/subscriptions/fea3a3c9-c4a3-4743-9835-1502a54705e9/resourceGroups/Group/providers/Microsoft.Web/serverfarms/WebApplication1220170118014620Plan": "empty"
            },
            "scale": null,
            "properties": {
                "enabled": true,
                "hostNameSslStates": [
                    {
                        "name": "[concat(parameters('sites_MLS_Monitoring_name'),'mls-monitoring2.azurewebsites.net')]",
                        "sslState": "Disabled",
                        "virtualIP": null,
                        "thumbprint": null,
                        "toUpdate": null,
                        "hostType": "Standard"
                    },
                    {
                        "name": "[concat(parameters('sites_MLS_Monitoring_name'),'mls-monitoring.scm.azurewebsites.net')]",
                        "sslState": "Disabled",
                        "virtualIP": null,
                        "thumbprint": null,
                        "toUpdate": null,
                        "hostType": "Repository"
                    }
                ],
                "serverFarmId": "[resourceId('Microsoft.Web/serverfarms', parameters('serverfarms_WebApplication1220170118014620Plan_name'))]",
                "reserved": false,
                "siteConfig": null,
                "scmSiteAlsoStopped": false,
                "hostingEnvironmentProfile": null,
                "clientAffinityEnabled": true,
                "clientCertEnabled": false,
                "hostNamesDisabled": false,
                "containerSize": 0,
                "dailyMemoryTimeQuota": 0,
                "cloningInfo": null
            },
            "dependsOn": [
                "[resourceId('Microsoft.Web/serverfarms', parameters('serverfarms_WebApplication1220170118014620Plan_name'))]"
            ]
        },
        {
            "comments": "Generalized from resource: '/subscriptions/fea3a3c9-c4a3-4743-9835-1502a54705e9/resourceGroups/MLS-RG/providers/Microsoft.Web/sites/trydotnet-staging'.",
            "type": "Microsoft.Web/sites",
            "kind": "app,linux",
            "name": "[parameters('sites_trydotnet_staging_name')]",
            "apiVersion": "2016-08-01",
            "location": "West US",
            "scale": null,
            "properties": {
                "enabled": true,
                "hostNameSslStates": [
                    {
                        "name": "[concat(parameters('sites_trydotnet_staging_name'),'.azurewebsites.net')]",
                        "sslState": "Disabled",
                        "virtualIP": null,
                        "thumbprint": null,
                        "toUpdate": null,
                        "hostType": "Standard"
                    },
                    {
                        "name": "[concat(parameters('sites_trydotnet_staging_name'),'.scm.azurewebsites.net')]",
                        "sslState": "Disabled",
                        "virtualIP": null,
                        "thumbprint": null,
                        "toUpdate": null,
                        "hostType": "Repository"
                    }
                ],
                "serverFarmId": "[resourceId('Microsoft.Web/serverfarms', parameters('serverfarms_MLS_Web_Staging_ServicePlan_name'))]",
                "reserved": true,
                "siteConfig": null,
                "scmSiteAlsoStopped": false,
                "hostingEnvironmentProfile": null,
                "clientAffinityEnabled": true,
                "clientCertEnabled": false,
                "hostNamesDisabled": false,
                "containerSize": 0,
                "dailyMemoryTimeQuota": 0,
                "cloningInfo": null
            },
            "dependsOn": [
                "[resourceId('Microsoft.Web/serverfarms', parameters('serverfarms_MLS_Web_Staging_ServicePlan_name'))]"
            ]
        },
        {
            "comments": "Generalized from resource: '/subscriptions/fea3a3c9-c4a3-4743-9835-1502a54705e9/resourceGroups/MLS-RG/providers/Microsoft.Web/sites/trydotnet'.",
            "type": "Microsoft.Web/sites",
            "kind": "app,linux",
            "name": "[parameters('sites_trydotnet_name')]",
            "apiVersion": "2016-08-01",
            "location": "West US",
            "scale": null,
            "properties": {
                "enabled": true,
                "hostNameSslStates": [
                    {
                        "name": "try.dot.net",
                        "sslState": "SniEnabled",
                        "virtualIP": null,
                        "thumbprint": "7B090701A45E4E032CB81DEF59112054B486E52B",
                        "toUpdate": null,
                        "hostType": "Standard"
                    },
                    {
                        "name": "[concat(parameters('sites_trydotnet_name'),'.azurewebsites.net')]",
                        "sslState": "Disabled",
                        "virtualIP": null,
                        "thumbprint": null,
                        "toUpdate": null,
                        "hostType": "Standard"
                    },
                    {
                        "name": "[concat(parameters('sites_trydotnet_name'),'.scm.azurewebsites.net')]",
                        "sslState": "Disabled",
                        "virtualIP": null,
                        "thumbprint": null,
                        "toUpdate": null,
                        "hostType": "Repository"
                    }
                ],
                "serverFarmId": "[resourceId('Microsoft.Web/serverfarms', parameters('serverfarms_MLS_Web_ServicePlan_name'))]",
                "reserved": true,
                "siteConfig": null,
                "scmSiteAlsoStopped": false,
                "hostingEnvironmentProfile": null,
                "clientAffinityEnabled": true,
                "clientCertEnabled": false,
                "hostNamesDisabled": false,
                "containerSize": 0,
                "dailyMemoryTimeQuota": 0,
                "cloningInfo": null
            },
            "dependsOn": [
                "[resourceId('Microsoft.Web/serverfarms', parameters('serverfarms_MLS_Web_ServicePlan_name'))]"
            ]
        },
        {
            "comments": "Generalized from resource: '/subscriptions/fea3a3c9-c4a3-4743-9835-1502a54705e9/resourceGroups/MLS-RG/providers/Microsoft.Web/sites/trydotnetagent-staging'.",
            "type": "Microsoft.Web/sites",
            "kind": "app,linux",
            "name": "[parameters('sites_trydotnetagent_staging_name')]",
            "apiVersion": "2016-08-01",
            "location": "West US",
            "scale": null,
            "properties": {
                "enabled": true,
                "hostNameSslStates": [
                    {
                        "name": "[concat(parameters('sites_trydotnetagent_staging_name'),'.azurewebsites.net')]",
                        "sslState": "Disabled",
                        "virtualIP": null,
                        "thumbprint": null,
                        "toUpdate": null,
                        "hostType": "Standard"
                    },
                    {
                        "name": "[concat(parameters('sites_trydotnetagent_staging_name'),'.scm.azurewebsites.net')]",
                        "sslState": "Disabled",
                        "virtualIP": null,
                        "thumbprint": null,
                        "toUpdate": null,
                        "hostType": "Repository"
                    }
                ],
                "serverFarmId": "[resourceId('Microsoft.Web/serverfarms', parameters('serverfarms_MLS_Web_Staging_ServicePlan_name'))]",
                "reserved": true,
                "siteConfig": null,
                "scmSiteAlsoStopped": false,
                "hostingEnvironmentProfile": null,
                "clientAffinityEnabled": true,
                "clientCertEnabled": false,
                "hostNamesDisabled": false,
                "containerSize": 0,
                "dailyMemoryTimeQuota": 0,
                "cloningInfo": null
            },
            "dependsOn": [
                "[resourceId('Microsoft.Web/serverfarms', parameters('serverfarms_MLS_Web_Staging_ServicePlan_name'))]"
            ]
        },
        {
            "comments": "Generalized from resource: '/subscriptions/fea3a3c9-c4a3-4743-9835-1502a54705e9/resourceGroups/MLS-RG/providers/Microsoft.Web/sites/trydotnetagent'.",
            "type": "Microsoft.Web/sites",
            "kind": "app,linux",
            "name": "[parameters('sites_trydotnetagent_name')]",
            "apiVersion": "2016-08-01",
            "location": "West US",
            "scale": null,
            "properties": {
                "enabled": true,
                "hostNameSslStates": [
                    {
                        "name": "[concat(parameters('sites_trydotnetagent_name'),'.azurewebsites.net')]",
                        "sslState": "Disabled",
                        "virtualIP": null,
                        "thumbprint": null,
                        "toUpdate": null,
                        "hostType": "Standard"
                    },
                    {
                        "name": "[concat(parameters('sites_trydotnetagent_name'),'.scm.azurewebsites.net')]",
                        "sslState": "Disabled",
                        "virtualIP": null,
                        "thumbprint": null,
                        "toUpdate": null,
                        "hostType": "Repository"
                    }
                ],
                "serverFarmId": "[resourceId('Microsoft.Web/serverfarms', parameters('serverfarms_MLS_Web_Staging_ServicePlan_name'))]",
                "reserved": true,
                "siteConfig": null,
                "scmSiteAlsoStopped": false,
                "hostingEnvironmentProfile": null,
                "clientAffinityEnabled": true,
                "clientCertEnabled": false,
                "hostNamesDisabled": false,
                "containerSize": 0,
                "dailyMemoryTimeQuota": 0,
                "cloningInfo": null
            },
            "dependsOn": [
                "[resourceId('Microsoft.Web/serverfarms', parameters('serverfarms_MLS_Web_Staging_ServicePlan_name'))]"
            ]
        },
        {
            "comments": "Generalized from resource: '/subscriptions/fea3a3c9-c4a3-4743-9835-1502a54705e9/resourcegroups/MLS-RG/providers/Microsoft.Cdn/profiles/MLS-CDN/endpoints/trydotnet'.",
            "type": "Microsoft.Cdn/profiles/endpoints",
            "name": "[concat(parameters('profiles_MLS_CDN_name'), '/', parameters('endpoints_trydotnet_name'))]",
            "apiVersion": "2016-04-02",
            "location": "WestUs",
            "tags": {},
            "scale": null,
            "properties": {
                "originHostHeader": "try.dot.net",
                "isHttpAllowed": true,
                "isHttpsAllowed": true,
                "querystringCachingBehavior": "NotSet",
                "originPath": null,
                "origins": [
                    {
                        "name": "try-dot-net",
                        "properties": {
                            "hostName": "try.dot.net",
                            "httpPort": null,
                            "httpsPort": null
                        }
                    }
                ],
                "contentTypesToCompress": [],
                "isCompressionEnabled": false
            },
            "dependsOn": [
                "[resourceId('Microsoft.Cdn/profiles', parameters('profiles_MLS_CDN_name'))]"
            ]
        },
        {
            "comments": "Generalized from resource: '/subscriptions/fea3a3c9-c4a3-4743-9835-1502a54705e9/resourcegroups/MLS-RG/providers/Microsoft.Cdn/profiles/MLS-CDN/endpoints/trydotnet/origins/try-dot-net'.",
            "type": "Microsoft.Cdn/profiles/endpoints/origins",
            "name": "[concat(parameters('profiles_MLS_CDN_name'), '/', parameters('endpoints_trydotnet_name'), '/', parameters('origins_try_dot_net_name'))]",
            "apiVersion": "2016-04-02",
            "scale": null,
            "properties": {
                "hostName": "try.dot.net",
                "httpPort": null,
                "httpsPort": null
            },
            "dependsOn": [
                "[resourceId('Microsoft.Cdn/profiles', parameters('profiles_MLS_CDN_name'))]",
                "[resourceId('Microsoft.Cdn/profiles/endpoints', parameters('profiles_MLS_CDN_name'), parameters('endpoints_trydotnet_name'))]"
            ]
        },
        {
            "comments": "Generalized from resource: '/subscriptions/fea3a3c9-c4a3-4743-9835-1502a54705e9/resourceGroups/MLS-RG/providers/Microsoft.Scheduler/jobCollections/MLS-Orchestrator-jobs/jobs/mls-orchestrator-pool-check_container_health'.",
            "type": "Microsoft.Scheduler/jobCollections/jobs",
            "name": "[concat(parameters('jobCollections_MLS_Orchestrator_jobs_name'), '/', parameters('jobs_mls_orchestrator_pool_check_container_health_name'))]",
            "apiVersion": "2016-03-01",
            "scale": null,
            "properties": {
                "startTime": "2017-07-11T16:24:52.881Z",
                "action": {
                    "request": {
                        "uri": "https://trydotnet-staging.azurewebsites.net/pool/checkcontainerhealth",
                        "method": "POST"
                    },
                    "type": "HTTP",
                    "retryPolicy": {
                        "retryType": "none"
                    }
                },
                "recurrence": {
                    "frequency": "minute",
                    "interval": 2
                },
                "state": "enabled"
            },
            "dependsOn": [
                "[resourceId('Microsoft.Scheduler/jobCollections', parameters('jobCollections_MLS_Orchestrator_jobs_name'))]"
            ]
        },
        {
            "comments": "Generalized from resource: '/subscriptions/fea3a3c9-c4a3-4743-9835-1502a54705e9/resourceGroups/MLS-RG/providers/Microsoft.Scheduler/jobCollections/MLS-Orchestrator-jobs/jobs/mls-orchestrator-pool-refresh'.",
            "type": "Microsoft.Scheduler/jobCollections/jobs",
            "name": "[concat(parameters('jobCollections_MLS_Orchestrator_jobs_name'), '/', parameters('jobs_mls_orchestrator_pool_refresh_name'))]",
            "apiVersion": "2016-03-01",
            "scale": null,
            "properties": {
                "startTime": "2017-05-26T20:59:29.77Z",
                "action": {
                    "request": {
                        "uri": "https://trydotnet-staging.azurewebsites.net/pool/refresh",
                        "method": "POST"
                    },
                    "type": "HTTPS",
                    "retryPolicy": {
                        "retryType": "none"
                    }
                },
                "recurrence": {
                    "frequency": "minute",
                    "interval": 2
                },
                "state": "enabled"
            },
            "dependsOn": [
                "[resourceId('Microsoft.Scheduler/jobCollections', parameters('jobCollections_MLS_Orchestrator_jobs_name'))]"
            ]
        },
        {
            "comments": "Generalized from resource: '/subscriptions/fea3a3c9-c4a3-4743-9835-1502a54705e9/resourceGroups/MLS-RG/providers/Microsoft.Scheduler/jobCollections/MLS-Orchestrator-jobs/jobs/mls-orchestrator-pool-topoff'.",
            "type": "Microsoft.Scheduler/jobCollections/jobs",
            "name": "[concat(parameters('jobCollections_MLS_Orchestrator_jobs_name'), '/', parameters('jobs_mls_orchestrator_pool_topoff_name'))]",
            "apiVersion": "2016-03-01",
            "scale": null,
            "properties": {
                "startTime": "2017-11-14T22:19:21.622Z",
                "action": {
                    "request": {
                        "uri": "https://trydotnet-staging.azurewebsites.net/pool/topoff",
                        "method": "POST"
                    },
                    "type": "HTTP",
                    "retryPolicy": {
                        "retryType": "none"
                    }
                },
                "recurrence": {
                    "frequency": "minute",
                    "interval": 1
                },
                "state": "enabled"
            },
            "dependsOn": [
                "[resourceId('Microsoft.Scheduler/jobCollections', parameters('jobCollections_MLS_Orchestrator_jobs_name'))]"
            ]
        },
        {
            "comments": "Generalized from resource: '/subscriptions/fea3a3c9-c4a3-4743-9835-1502a54705e9/resourcegroups/MLS-RG/providers/Microsoft.ServiceBus/namespaces/mls-orchestrator-test/AuthorizationRules/RootManageSharedAccessKey'.",
            "type": "Microsoft.ServiceBus/namespaces/AuthorizationRules",
            "name": "[concat(parameters('namespaces_mls_orchestrator_test_name'), '/', parameters('AuthorizationRules_RootManageSharedAccessKey_name_1'))]",
            "apiVersion": "2017-04-01",
            "location": "West US",
            "scale": null,
            "properties": {
                "rights": [
                    "Listen",
                    "Manage",
                    "Send"
                ]
            },
            "dependsOn": [
                "[resourceId('Microsoft.ServiceBus/namespaces', parameters('namespaces_mls_orchestrator_test_name'))]"
            ]
        },
        {
            "comments": "Generalized from resource: '/subscriptions/fea3a3c9-c4a3-4743-9835-1502a54705e9/resourcegroups/MLS-RG/providers/Microsoft.ServiceBus/namespaces/mls-orchestrator-test/AuthorizationRules/orchestrator-dev'.",
            "type": "Microsoft.ServiceBus/namespaces/AuthorizationRules",
            "name": "[concat(parameters('namespaces_mls_orchestrator_test_name'), '/', parameters('AuthorizationRules_orchestrator_dev_name'))]",
            "apiVersion": "2017-04-01",
            "location": "West US",
            "scale": null,
            "properties": {
                "rights": [
                    "Listen",
                    "Send"
                ]
            },
            "dependsOn": [
                "[resourceId('Microsoft.ServiceBus/namespaces', parameters('namespaces_mls_orchestrator_test_name'))]"
            ]
        },
        {
            "comments": "Generalized from resource: '/subscriptions/fea3a3c9-c4a3-4743-9835-1502a54705e9/resourcegroups/MLS-RG/providers/Microsoft.ServiceBus/namespaces/mls-orchestrator-test/queues/assignlease'.",
            "type": "Microsoft.ServiceBus/namespaces/queues",
            "name": "[concat(parameters('namespaces_mls_orchestrator_test_name'), '/', parameters('queues_assignlease_name_1'))]",
            "apiVersion": "2017-04-01",
            "location": "West US",
            "scale": null,
            "properties": {
                "maxSizeInMegabytes": 5120,
                "requiresDuplicateDetection": true,
                "requiresSession": false,
                "defaultMessageTimeToLive": "PT11M",
                "deadLetteringOnMessageExpiration": true,
                "status": "Active",
                "autoDeleteOnIdle": "P10675199DT2H48M5.4775807S",
                "enablePartitioning": true,
                "enableExpress": false,
                "countDetails": {
                    "activeMessageCount": 0,
                    "deadLetterMessageCount": 124,
                    "scheduledMessageCount": 0,
                    "transferMessageCount": 0,
                    "transferDeadLetterMessageCount": 0
                },
                "createdAt": "2017-11-02T21:58:35.447Z",
                "updatedAt": "2017-11-13T16:50:03.34Z",
                "accessedAt": "2017-12-11T23:27:11.087Z"
            },
            "dependsOn": [
                "[resourceId('Microsoft.ServiceBus/namespaces', parameters('namespaces_mls_orchestrator_test_name'))]"
            ]
        },
        {
            "comments": "Generalized from resource: '/subscriptions/fea3a3c9-c4a3-4743-9835-1502a54705e9/resourcegroups/MLS-RG/providers/Microsoft.ServiceBus/namespaces/mls-orchestrator-test/queues/checkcontainerhealth'.",
            "type": "Microsoft.ServiceBus/namespaces/queues",
            "name": "[concat(parameters('namespaces_mls_orchestrator_test_name'), '/', parameters('queues_checkcontainerhealth_name_1'))]",
            "apiVersion": "2017-04-01",
            "location": "West US",
            "scale": null,
            "properties": {
                "maxSizeInMegabytes": 5120,
                "requiresDuplicateDetection": true,
                "requiresSession": false,
                "defaultMessageTimeToLive": "P14D",
                "deadLetteringOnMessageExpiration": true,
                "status": "Active",
                "autoDeleteOnIdle": "P10675199DT2H48M5.4775807S",
                "enablePartitioning": true,
                "enableExpress": false,
                "countDetails": {
                    "activeMessageCount": 0,
                    "deadLetterMessageCount": 57,
                    "scheduledMessageCount": 0,
                    "transferMessageCount": 0,
                    "transferDeadLetterMessageCount": 0
                },
                "createdAt": "2017-11-02T22:00:52.22Z",
                "updatedAt": "2017-11-02T22:00:52.327Z",
                "accessedAt": "2017-12-12T00:11:45.95Z"
            },
            "dependsOn": [
                "[resourceId('Microsoft.ServiceBus/namespaces', parameters('namespaces_mls_orchestrator_test_name'))]"
            ]
        },
        {
            "comments": "Generalized from resource: '/subscriptions/fea3a3c9-c4a3-4743-9835-1502a54705e9/resourcegroups/MLS-RG/providers/Microsoft.ServiceBus/namespaces/mls-orchestrator-test/queues/create'.",
            "type": "Microsoft.ServiceBus/namespaces/queues",
            "name": "[concat(parameters('namespaces_mls_orchestrator_test_name'), '/', parameters('queues_create_name_1'))]",
            "apiVersion": "2017-04-01",
            "location": "West US",
            "scale": null,
            "properties": {
                "maxSizeInMegabytes": 5120,
                "requiresDuplicateDetection": true,
                "requiresSession": false,
                "defaultMessageTimeToLive": "P14D",
                "deadLetteringOnMessageExpiration": true,
                "status": "Active",
                "autoDeleteOnIdle": "P10675199DT2H48M5.4775807S",
                "enablePartitioning": true,
                "enableExpress": false,
                "countDetails": {
                    "activeMessageCount": 0,
                    "deadLetterMessageCount": 8,
                    "scheduledMessageCount": 0,
                    "transferMessageCount": 0,
                    "transferDeadLetterMessageCount": 0
                },
                "createdAt": "2017-11-02T22:03:19.29Z",
                "updatedAt": "2017-11-14T22:29:53.02Z",
                "accessedAt": "2017-12-12T00:11:45.837Z"
            },
            "dependsOn": [
                "[resourceId('Microsoft.ServiceBus/namespaces', parameters('namespaces_mls_orchestrator_test_name'))]"
            ]
        },
        {
            "comments": "Generalized from resource: '/subscriptions/fea3a3c9-c4a3-4743-9835-1502a54705e9/resourcegroups/MLS-RG/providers/Microsoft.ServiceBus/namespaces/mls-orchestrator-test/queues/deprovision'.",
            "type": "Microsoft.ServiceBus/namespaces/queues",
            "name": "[concat(parameters('namespaces_mls_orchestrator_test_name'), '/', parameters('queues_deprovision_name_1'))]",
            "apiVersion": "2017-04-01",
            "location": "West US",
            "scale": null,
            "properties": {
                "maxSizeInMegabytes": 5120,
                "requiresDuplicateDetection": true,
                "requiresSession": false,
                "defaultMessageTimeToLive": "P14D",
                "deadLetteringOnMessageExpiration": true,
                "status": "Active",
                "autoDeleteOnIdle": "P10675199DT2H48M5.4775807S",
                "enablePartitioning": true,
                "enableExpress": false,
                "countDetails": {
                    "activeMessageCount": 0,
                    "deadLetterMessageCount": 0,
                    "scheduledMessageCount": 0,
                    "transferMessageCount": 0,
                    "transferDeadLetterMessageCount": 0
                },
                "createdAt": "2017-11-02T22:03:58.773Z",
                "updatedAt": "2017-11-14T22:31:00.45Z",
                "accessedAt": "2017-12-12T00:11:45.903Z"
            },
            "dependsOn": [
                "[resourceId('Microsoft.ServiceBus/namespaces', parameters('namespaces_mls_orchestrator_test_name'))]"
            ]
        },
        {
            "comments": "Generalized from resource: '/subscriptions/fea3a3c9-c4a3-4743-9835-1502a54705e9/resourcegroups/MLS-RG/providers/Microsoft.ServiceBus/namespaces/mls-orchestrator-test/queues/pollforreadiness'.",
            "type": "Microsoft.ServiceBus/namespaces/queues",
            "name": "[concat(parameters('namespaces_mls_orchestrator_test_name'), '/', parameters('queues_pollforreadiness_name_1'))]",
            "apiVersion": "2017-04-01",
            "location": "West US",
            "scale": null,
            "properties": {
                "maxSizeInMegabytes": 5120,
                "requiresDuplicateDetection": true,
                "requiresSession": false,
                "defaultMessageTimeToLive": "P14D",
                "deadLetteringOnMessageExpiration": true,
                "status": "Active",
                "autoDeleteOnIdle": "P10675199DT2H48M5.4775807S",
                "enablePartitioning": true,
                "enableExpress": false,
                "countDetails": {
                    "activeMessageCount": 0,
                    "deadLetterMessageCount": 100,
                    "scheduledMessageCount": 0,
                    "transferMessageCount": 0,
                    "transferDeadLetterMessageCount": 0
                },
                "createdAt": "2017-11-02T22:05:38.16Z",
                "updatedAt": "2017-11-14T22:31:56.49Z",
                "accessedAt": "2017-12-12T00:11:45.903Z"
            },
            "dependsOn": [
                "[resourceId('Microsoft.ServiceBus/namespaces', parameters('namespaces_mls_orchestrator_test_name'))]"
            ]
        },
        {
            "comments": "Generalized from resource: '/subscriptions/fea3a3c9-c4a3-4743-9835-1502a54705e9/resourcegroups/MLS-RG/providers/Microsoft.ServiceBus/namespaces/mls-orchestrator/AuthorizationRules/RootManageSharedAccessKey'.",
            "type": "Microsoft.ServiceBus/namespaces/AuthorizationRules",
            "name": "[concat(parameters('namespaces_mls_orchestrator_name'), '/', parameters('AuthorizationRules_RootManageSharedAccessKey_name'))]",
            "apiVersion": "2017-04-01",
            "location": "West US",
            "scale": null,
            "properties": {
                "rights": [
                    "Listen",
                    "Manage",
                    "Send"
                ]
            },
            "dependsOn": [
                "[resourceId('Microsoft.ServiceBus/namespaces', parameters('namespaces_mls_orchestrator_name'))]"
            ]
        },
        {
            "comments": "Generalized from resource: '/subscriptions/fea3a3c9-c4a3-4743-9835-1502a54705e9/resourcegroups/MLS-RG/providers/Microsoft.ServiceBus/namespaces/mls-orchestrator/AuthorizationRules/orchestrator'.",
            "type": "Microsoft.ServiceBus/namespaces/AuthorizationRules",
            "name": "[concat(parameters('namespaces_mls_orchestrator_name'), '/', parameters('AuthorizationRules_orchestrator_name'))]",
            "apiVersion": "2017-04-01",
            "location": "West US",
            "scale": null,
            "properties": {
                "rights": [
                    "Listen",
                    "Send"
                ]
            },
            "dependsOn": [
                "[resourceId('Microsoft.ServiceBus/namespaces', parameters('namespaces_mls_orchestrator_name'))]"
            ]
        },
        {
            "comments": "Generalized from resource: '/subscriptions/fea3a3c9-c4a3-4743-9835-1502a54705e9/resourcegroups/MLS-RG/providers/Microsoft.ServiceBus/namespaces/mls-orchestrator/queues/assignlease'.",
            "type": "Microsoft.ServiceBus/namespaces/queues",
            "name": "[concat(parameters('namespaces_mls_orchestrator_name'), '/', parameters('queues_assignlease_name'))]",
            "apiVersion": "2017-04-01",
            "location": "West US",
            "scale": null,
            "properties": {
                "maxSizeInMegabytes": 5120,
                "requiresDuplicateDetection": true,
                "requiresSession": false,
                "defaultMessageTimeToLive": "PT10M",
                "deadLetteringOnMessageExpiration": false,
                "status": "Active",
                "autoDeleteOnIdle": "P10675199DT2H48M5.4775807S",
                "enablePartitioning": true,
                "enableExpress": false,
                "countDetails": {
                    "activeMessageCount": 40,
                    "deadLetterMessageCount": 26613,
                    "scheduledMessageCount": 0,
                    "transferMessageCount": 0,
                    "transferDeadLetterMessageCount": 0
                },
                "createdAt": "2017-10-03T18:59:34.91Z",
                "updatedAt": "2017-12-04T20:58:08.153Z",
                "accessedAt": "2017-12-18T19:01:45.5235307Z"
            },
            "dependsOn": [
                "[resourceId('Microsoft.ServiceBus/namespaces', parameters('namespaces_mls_orchestrator_name'))]"
            ]
        },
        {
            "comments": "Generalized from resource: '/subscriptions/fea3a3c9-c4a3-4743-9835-1502a54705e9/resourcegroups/MLS-RG/providers/Microsoft.ServiceBus/namespaces/mls-orchestrator/queues/checkcontainerhealth'.",
            "type": "Microsoft.ServiceBus/namespaces/queues",
            "name": "[concat(parameters('namespaces_mls_orchestrator_name'), '/', parameters('queues_checkcontainerhealth_name'))]",
            "apiVersion": "2017-04-01",
            "location": "West US",
            "scale": null,
            "properties": {
                "maxSizeInMegabytes": 5120,
                "requiresDuplicateDetection": true,
                "requiresSession": false,
                "defaultMessageTimeToLive": "P14D",
                "deadLetteringOnMessageExpiration": false,
                "status": "Active",
                "autoDeleteOnIdle": "P10675199DT2H48M5.4775807S",
                "enablePartitioning": true,
                "enableExpress": false,
                "countDetails": {
                    "activeMessageCount": 22,
                    "deadLetterMessageCount": 88488,
                    "scheduledMessageCount": 0,
                    "transferMessageCount": 0,
                    "transferDeadLetterMessageCount": 0
                },
                "createdAt": "2017-09-29T21:33:09.167Z",
                "updatedAt": "2017-11-22T17:52:03.783Z",
                "accessedAt": "2017-12-18T19:01:51.6925392Z"
            },
            "dependsOn": [
                "[resourceId('Microsoft.ServiceBus/namespaces', parameters('namespaces_mls_orchestrator_name'))]"
            ]
        },
        {
            "comments": "Generalized from resource: '/subscriptions/fea3a3c9-c4a3-4743-9835-1502a54705e9/resourcegroups/MLS-RG/providers/Microsoft.ServiceBus/namespaces/mls-orchestrator/queues/create'.",
            "type": "Microsoft.ServiceBus/namespaces/queues",
            "name": "[concat(parameters('namespaces_mls_orchestrator_name'), '/', parameters('queues_create_name'))]",
            "apiVersion": "2017-04-01",
            "location": "West US",
            "scale": null,
            "properties": {
                "maxSizeInMegabytes": 5120,
                "requiresDuplicateDetection": true,
                "requiresSession": false,
                "defaultMessageTimeToLive": "P14D",
                "deadLetteringOnMessageExpiration": true,
                "status": "Active",
                "autoDeleteOnIdle": "P10675199DT2H48M5.4775807S",
                "enablePartitioning": true,
                "enableExpress": false,
                "countDetails": {
                    "activeMessageCount": 0,
                    "deadLetterMessageCount": 802,
                    "scheduledMessageCount": 12,
                    "transferMessageCount": 0,
                    "transferDeadLetterMessageCount": 0
                },
                "createdAt": "2017-09-29T21:33:28.183Z",
                "updatedAt": "2017-11-22T17:52:36.093Z",
                "accessedAt": "2017-12-18T19:01:51.6925392Z"
            },
            "dependsOn": [
                "[resourceId('Microsoft.ServiceBus/namespaces', parameters('namespaces_mls_orchestrator_name'))]"
            ]
        },
        {
            "comments": "Generalized from resource: '/subscriptions/fea3a3c9-c4a3-4743-9835-1502a54705e9/resourcegroups/MLS-RG/providers/Microsoft.ServiceBus/namespaces/mls-orchestrator/queues/deprovision'.",
            "type": "Microsoft.ServiceBus/namespaces/queues",
            "name": "[concat(parameters('namespaces_mls_orchestrator_name'), '/', parameters('queues_deprovision_name'))]",
            "apiVersion": "2017-04-01",
            "location": "West US",
            "scale": null,
            "properties": {
                "maxSizeInMegabytes": 5120,
                "requiresDuplicateDetection": true,
                "requiresSession": false,
                "defaultMessageTimeToLive": "P14D",
                "deadLetteringOnMessageExpiration": true,
                "status": "Active",
                "autoDeleteOnIdle": "P10675199DT2H48M5.4775807S",
                "enablePartitioning": true,
                "enableExpress": false,
                "countDetails": {
                    "activeMessageCount": 2,
                    "deadLetterMessageCount": 3,
                    "scheduledMessageCount": 43,
                    "transferMessageCount": 0,
                    "transferDeadLetterMessageCount": 0
                },
                "createdAt": "2017-09-29T21:33:37.793Z",
                "updatedAt": "2017-11-22T17:52:52.5264952Z",
                "accessedAt": "2017-12-18T19:01:51.6925392Z"
            },
            "dependsOn": [
                "[resourceId('Microsoft.ServiceBus/namespaces', parameters('namespaces_mls_orchestrator_name'))]"
            ]
        },
        {
            "comments": "Generalized from resource: '/subscriptions/fea3a3c9-c4a3-4743-9835-1502a54705e9/resourcegroups/MLS-RG/providers/Microsoft.ServiceBus/namespaces/mls-orchestrator/queues/pollforreadiness'.",
            "type": "Microsoft.ServiceBus/namespaces/queues",
            "name": "[concat(parameters('namespaces_mls_orchestrator_name'), '/', parameters('queues_pollforreadiness_name'))]",
            "apiVersion": "2017-04-01",
            "location": "West US",
            "scale": null,
            "properties": {
                "maxSizeInMegabytes": 5120,
                "requiresDuplicateDetection": true,
                "requiresSession": false,
                "defaultMessageTimeToLive": "P14D",
                "deadLetteringOnMessageExpiration": true,
                "status": "Active",
                "autoDeleteOnIdle": "P10675199DT2H48M5.4775807S",
                "enablePartitioning": true,
                "enableExpress": false,
                "countDetails": {
                    "activeMessageCount": 18,
                    "deadLetterMessageCount": 24,
                    "scheduledMessageCount": 0,
                    "transferMessageCount": 0,
                    "transferDeadLetterMessageCount": 0
                },
                "createdAt": "2017-09-29T21:34:40.497Z",
                "updatedAt": "2017-11-14T22:31:58.24Z",
                "accessedAt": "2017-12-18T19:01:51.6173991Z"
            },
            "dependsOn": [
                "[resourceId('Microsoft.ServiceBus/namespaces', parameters('namespaces_mls_orchestrator_name'))]"
            ]
        },
        {
            "comments": "Generalized from resource: '/subscriptions/fea3a3c9-c4a3-4743-9835-1502a54705e9/resourceGroups/MLS-RG/providers/Microsoft.Web/sites/MLS-Monitoring/config/web'.",
            "type": "Microsoft.Web/sites/config",
            "name": "[concat(parameters('sites_MLS_Monitoring_name'), '/', parameters('config_web_name_1'))]",
            "apiVersion": "2016-08-01",
            "location": "South Central US",
            "tags": {
                "hidden-related:/subscriptions/fea3a3c9-c4a3-4743-9835-1502a54705e9/resourceGroups/Group/providers/Microsoft.Web/serverfarms/WebApplication1220170118014620Plan": "empty"
            },
            "scale": null,
            "properties": {
                "numberOfWorkers": 1,
                "defaultDocuments": [
                    "Default.htm",
                    "Default.html",
                    "Default.asp",
                    "index.htm",
                    "index.html",
                    "iisstart.htm",
                    "default.aspx",
                    "index.php",
                    "hostingstart.html"
                ],
                "netFrameworkVersion": "v4.0",
                "phpVersion": "5.6",
                "pythonVersion": "",
                "nodeVersion": "",
                "linuxFxVersion": "",
                "requestTracingEnabled": false,
                "remoteDebuggingEnabled": false,
                "remoteDebuggingVersion": null,
                "httpLoggingEnabled": false,
                "logsDirectorySizeLimit": 35,
                "detailedErrorLoggingEnabled": false,
                "publishingUsername": "$MLS-Monitoring",
                "publishingPassword": null,
                "appSettings": null,
                "metadata": null,
                "connectionstrings": null,
                "machineKey": null,
                "handlerMappings": null,
                "documentRoot": null,
                "scmType": "VSTSRM",
                "use32BitWorkerProcess": true,
                "webSocketsEnabled": false,
                "alwaysOn": false,
                "javaVersion": null,
                "javaContainer": null,
                "javaContainerVersion": null,
                "appCommandLine": "",
                "managedPipelineMode": "Integrated",
                "virtualApplications": [
                    {
                        "virtualPath": "/",
                        "physicalPath": "site\\wwwroot",
                        "preloadEnabled": false,
                        "virtualDirectories": null
                    }
                ],
                "winAuthAdminState": 0,
                "winAuthTenantState": 0,
                "customAppPoolIdentityAdminState": false,
                "customAppPoolIdentityTenantState": false,
                "runtimeADUser": null,
                "runtimeADUserPassword": null,
                "loadBalancing": "LeastRequests",
                "routingRules": [],
                "experiments": {
                    "rampUpRules": []
                },
                "limits": null,
                "autoHealEnabled": false,
                "autoHealRules": {
                    "triggers": null,
                    "actions": null
                },
                "tracingOptions": null,
                "vnetName": "",
                "siteAuthEnabled": false,
                "siteAuthSettings": {
                    "enabled": null,
                    "unauthenticatedClientAction": null,
                    "tokenStoreEnabled": null,
                    "allowedExternalRedirectUrls": null,
                    "defaultProvider": null,
                    "clientId": null,
                    "clientSecret": null,
                    "issuer": null,
                    "allowedAudiences": null,
                    "additionalLoginParams": null,
                    "isAadAutoProvisioned": false,
                    "googleClientId": null,
                    "googleClientSecret": null,
                    "googleOAuthScopes": null,
                    "facebookAppId": null,
                    "facebookAppSecret": null,
                    "facebookOAuthScopes": null,
                    "twitterConsumerKey": null,
                    "twitterConsumerSecret": null,
                    "microsoftAccountClientId": null,
                    "microsoftAccountClientSecret": null,
                    "microsoftAccountOAuthScopes": null
                },
                "cors": null,
                "push": null,
                "apiDefinition": null,
                "autoSwapSlotName": null,
                "localMySqlEnabled": false,
                "ipSecurityRestrictions": null
            },
            "dependsOn": [
                "[resourceId('Microsoft.Web/sites', parameters('sites_MLS_Monitoring_name'))]"
            ]
        },
        {
            "comments": "Generalized from resource: '/subscriptions/fea3a3c9-c4a3-4743-9835-1502a54705e9/resourcegroups/MLS-RG/providers/Microsoft.Web/sites/MLS-Monitoring/deployments/637861512697004611'.",
            "type": "Microsoft.Web/sites/deployments",
            "name": "[concat(parameters('sites_MLS_Monitoring_name'), '/', parameters('deployments_637861512697004611_name'))]",
            "apiVersion": "2016-08-01",
            "location": "South Central US",
            "scale": null,
            "properties": {
                "id": "[parameters('deployments_637861512697004611_name')]",
                "status": 4,
                "author_email": "",
                "author": "Jon Sequeira",
                "deployer": "VSTS",
                "message": "{\"type\":\"Deployment\",\"commitId\":\"ee2f59957848c7eddde45daf45f109a48c225fc2\",\"buildId\":\"1205317\",\"releaseId\":\"63786\",\"buildNumber\":\"20171208.1\",\"releaseName\":\"Release-30\",\"repoProvider\":\"TfsGit\",\"repoName\":\"MLS-Monitoring\",\"collectionUrl\":\"https://devdiv.visualstudio.com/\",\"teamProject\":\"0bdbc590-a062-4c3f-b0f6-9383f67865ee\",\"slotName\":\"Production\"}",
                "start_time": "2017-12-08T01:36:45.2499923Z",
                "end_time": "2017-12-08T01:36:45.2499923Z",
                "active": true
            },
            "dependsOn": [
                "[resourceId('Microsoft.Web/sites', parameters('sites_MLS_Monitoring_name'))]"
            ]
        },
        {
            "comments": "Generalized from resource: '/subscriptions/fea3a3c9-c4a3-4743-9835-1502a54705e9/resourcegroups/MLS-RG/providers/Microsoft.Web/sites/MLS-Monitoring/deployments/637851512696845555'.",
            "type": "Microsoft.Web/sites/deployments",
            "name": "[concat(parameters('sites_MLS_Monitoring_name'), '/', parameters('deployments_637851512696845555_name'))]",
            "apiVersion": "2016-08-01",
            "location": "South Central US",
            "scale": null,
            "properties": {
                "id": "[parameters('deployments_637851512696845555_name')]",
                "status": 3,
                "author_email": "",
                "author": "Jon Sequeira",
                "deployer": "VSTS",
                "message": "{\"type\":\"Deployment\",\"commitId\":\"ee2f59957848c7eddde45daf45f109a48c225fc2\",\"buildId\":\"1205317\",\"releaseId\":\"63785\",\"buildNumber\":\"20171208.1\",\"releaseName\":\"Release-29\",\"repoProvider\":\"TfsGit\",\"repoName\":\"MLS-Monitoring\",\"collectionUrl\":\"https://devdiv.visualstudio.com/\",\"teamProject\":\"0bdbc590-a062-4c3f-b0f6-9383f67865ee\",\"slotName\":\"Production\"}",
                "start_time": "2017-12-08T01:34:05.5914747Z",
                "end_time": "2017-12-08T01:34:05.5914747Z",
                "active": false
            },
            "dependsOn": [
                "[resourceId('Microsoft.Web/sites', parameters('sites_MLS_Monitoring_name'))]"
            ]
        },
        {
            "comments": "Generalized from resource: '/subscriptions/fea3a3c9-c4a3-4743-9835-1502a54705e9/resourcegroups/MLS-RG/providers/Microsoft.Web/sites/MLS-Monitoring/deployments/637841512696753691'.",
            "type": "Microsoft.Web/sites/deployments",
            "name": "[concat(parameters('sites_MLS_Monitoring_name'), '/', parameters('deployments_637841512696753691_name'))]",
            "apiVersion": "2016-08-01",
            "location": "South Central US",
            "scale": null,
            "properties": {
                "id": "[parameters('deployments_637841512696753691_name')]",
                "status": 3,
                "author_email": "",
                "author": "Jon Sequeira",
                "deployer": "VSTS",
                "message": "{\"type\":\"Deployment\",\"commitId\":\"ee2f59957848c7eddde45daf45f109a48c225fc2\",\"buildId\":\"1205317\",\"releaseId\":\"63784\",\"buildNumber\":\"20171208.1\",\"releaseName\":\"Release-28\",\"repoProvider\":\"TfsGit\",\"repoName\":\"MLS-Monitoring\",\"collectionUrl\":\"https://devdiv.visualstudio.com/\",\"teamProject\":\"0bdbc590-a062-4c3f-b0f6-9383f67865ee\",\"slotName\":\"Production\"}",
                "start_time": "2017-12-08T01:32:34.5921681Z",
                "end_time": "2017-12-08T01:32:34.5921681Z",
                "active": false
            },
            "dependsOn": [
                "[resourceId('Microsoft.Web/sites', parameters('sites_MLS_Monitoring_name'))]"
            ]
        },
        {
            "comments": "Generalized from resource: '/subscriptions/fea3a3c9-c4a3-4743-9835-1502a54705e9/resourcegroups/MLS-RG/providers/Microsoft.Web/sites/MLS-Monitoring/deployments/531601508613608512'.",
            "type": "Microsoft.Web/sites/deployments",
            "name": "[concat(parameters('sites_MLS_Monitoring_name'), '/', parameters('deployments_531601508613608512_name'))]",
            "apiVersion": "2016-08-01",
            "location": "South Central US",
            "scale": null,
            "properties": {
                "id": "[parameters('deployments_531601508613608512_name')]",
                "status": 4,
                "author_email": "",
                "author": "Jon Sequeira",
                "deployer": "VSTS",
                "message": "{\"type\":\"Deployment\",\"commitId\":\"98e122d5b58471c6189bb9f429a78938921fefd0\",\"buildId\":\"1078701\",\"releaseId\":\"53160\",\"buildNumber\":\"20171021.14\",\"releaseName\":\"Release-21\",\"repoProvider\":\"TfsGit\",\"repoName\":\"MLS-Monitoring\",\"collectionUrl\":\"https://devdiv.visualstudio.com/\",\"teamProject\":\"0bdbc590-a062-4c3f-b0f6-9383f67865ee\",\"slotName\":\"Production\"}",
                "start_time": "2017-10-21T19:20:09.3622429Z",
                "end_time": "2017-10-21T19:20:09.3622429Z",
                "active": false
            },
            "dependsOn": [
                "[resourceId('Microsoft.Web/sites', parameters('sites_MLS_Monitoring_name'))]"
            ]
        },
        {
            "comments": "Generalized from resource: '/subscriptions/fea3a3c9-c4a3-4743-9835-1502a54705e9/resourcegroups/MLS-RG/providers/Microsoft.Web/sites/MLS-Monitoring/deployments/531591508612942085'.",
            "type": "Microsoft.Web/sites/deployments",
            "name": "[concat(parameters('sites_MLS_Monitoring_name'), '/', parameters('deployments_531591508612942085_name'))]",
            "apiVersion": "2016-08-01",
            "location": "South Central US",
            "scale": null,
            "properties": {
                "id": "[parameters('deployments_531591508612942085_name')]",
                "status": 3,
                "author_email": "",
                "author": "Jon Sequeira",
                "deployer": "VSTS",
                "message": "{\"type\":\"Deployment\",\"commitId\":\"98e122d5b58471c6189bb9f429a78938921fefd0\",\"buildId\":\"1078701\",\"releaseId\":\"53159\",\"buildNumber\":\"20171021.14\",\"releaseName\":\"Release-20\",\"repoProvider\":\"TfsGit\",\"repoName\":\"MLS-Monitoring\",\"collectionUrl\":\"https://devdiv.visualstudio.com/\",\"teamProject\":\"0bdbc590-a062-4c3f-b0f6-9383f67865ee\",\"slotName\":\"Production\"}",
                "start_time": "2017-10-21T19:09:02.6756246Z",
                "end_time": "2017-10-21T19:09:02.6756246Z",
                "active": false
            },
            "dependsOn": [
                "[resourceId('Microsoft.Web/sites', parameters('sites_MLS_Monitoring_name'))]"
            ]
        },
        {
            "comments": "Generalized from resource: '/subscriptions/fea3a3c9-c4a3-4743-9835-1502a54705e9/resourcegroups/MLS-RG/providers/Microsoft.Web/sites/MLS-Monitoring/deployments/531581508612175873'.",
            "type": "Microsoft.Web/sites/deployments",
            "name": "[concat(parameters('sites_MLS_Monitoring_name'), '/', parameters('deployments_531581508612175873_name'))]",
            "apiVersion": "2016-08-01",
            "location": "South Central US",
            "scale": null,
            "properties": {
                "id": "[parameters('deployments_531581508612175873_name')]",
                "status": 3,
                "author_email": "",
                "author": "Jon Sequeira",
                "deployer": "VSTS",
                "message": "{\"type\":\"Deployment\",\"commitId\":\"98e122d5b58471c6189bb9f429a78938921fefd0\",\"buildId\":\"1078701\",\"releaseId\":\"53158\",\"buildNumber\":\"20171021.14\",\"releaseName\":\"Release-19\",\"repoProvider\":\"TfsGit\",\"repoName\":\"MLS-Monitoring\",\"collectionUrl\":\"https://devdiv.visualstudio.com/\",\"teamProject\":\"0bdbc590-a062-4c3f-b0f6-9383f67865ee\",\"slotName\":\"Production\"}",
                "start_time": "2017-10-21T18:56:15.7983235Z",
                "end_time": "2017-10-21T18:56:15.7983235Z",
                "active": false
            },
            "dependsOn": [
                "[resourceId('Microsoft.Web/sites', parameters('sites_MLS_Monitoring_name'))]"
            ]
        },
        {
            "comments": "Generalized from resource: '/subscriptions/fea3a3c9-c4a3-4743-9835-1502a54705e9/resourcegroups/MLS-RG/providers/Microsoft.Web/sites/MLS-Monitoring/deployments/531571508611907534'.",
            "type": "Microsoft.Web/sites/deployments",
            "name": "[concat(parameters('sites_MLS_Monitoring_name'), '/', parameters('deployments_531571508611907534_name'))]",
            "apiVersion": "2016-08-01",
            "location": "South Central US",
            "scale": null,
            "properties": {
                "id": "[parameters('deployments_531571508611907534_name')]",
                "status": 3,
                "author_email": "",
                "author": "Jon Sequeira",
                "deployer": "VSTS",
                "message": "{\"type\":\"Deployment\",\"commitId\":\"98e122d5b58471c6189bb9f429a78938921fefd0\",\"buildId\":\"1078701\",\"releaseId\":\"53157\",\"buildNumber\":\"20171021.14\",\"releaseName\":\"Release-18\",\"repoProvider\":\"TfsGit\",\"repoName\":\"MLS-Monitoring\",\"collectionUrl\":\"https://devdiv.visualstudio.com/\",\"teamProject\":\"0bdbc590-a062-4c3f-b0f6-9383f67865ee\",\"slotName\":\"Production\"}",
                "start_time": "2017-10-21T18:51:47.1144179Z",
                "end_time": "2017-10-21T18:51:47.1144179Z",
                "active": false
            },
            "dependsOn": [
                "[resourceId('Microsoft.Web/sites', parameters('sites_MLS_Monitoring_name'))]"
            ]
        },
        {
            "comments": "Generalized from resource: '/subscriptions/fea3a3c9-c4a3-4743-9835-1502a54705e9/resourcegroups/MLS-RG/providers/Microsoft.Web/sites/MLS-Monitoring/deployments/531561508611805568'.",
            "type": "Microsoft.Web/sites/deployments",
            "name": "[concat(parameters('sites_MLS_Monitoring_name'), '/', parameters('deployments_531561508611805568_name'))]",
            "apiVersion": "2016-08-01",
            "location": "South Central US",
            "scale": null,
            "properties": {
                "id": "[parameters('deployments_531561508611805568_name')]",
                "status": 3,
                "author_email": "",
                "author": "Jon Sequeira",
                "deployer": "VSTS",
                "message": "{\"type\":\"Deployment\",\"commitId\":\"98e122d5b58471c6189bb9f429a78938921fefd0\",\"buildId\":\"1078701\",\"releaseId\":\"53156\",\"buildNumber\":\"20171021.14\",\"releaseName\":\"Release-17\",\"repoProvider\":\"TfsGit\",\"repoName\":\"MLS-Monitoring\",\"collectionUrl\":\"https://devdiv.visualstudio.com/\",\"teamProject\":\"0bdbc590-a062-4c3f-b0f6-9383f67865ee\",\"slotName\":\"Production\"}",
                "start_time": "2017-10-21T18:50:07.9642712Z",
                "end_time": "2017-10-21T18:50:07.9642712Z",
                "active": false
            },
            "dependsOn": [
                "[resourceId('Microsoft.Web/sites', parameters('sites_MLS_Monitoring_name'))]"
            ]
        },
        {
            "comments": "Generalized from resource: '/subscriptions/fea3a3c9-c4a3-4743-9835-1502a54705e9/resourcegroups/MLS-RG/providers/Microsoft.Web/sites/MLS-Monitoring/deployments/531551508610276229'.",
            "type": "Microsoft.Web/sites/deployments",
            "name": "[concat(parameters('sites_MLS_Monitoring_name'), '/', parameters('deployments_531551508610276229_name'))]",
            "apiVersion": "2016-08-01",
            "location": "South Central US",
            "scale": null,
            "properties": {
                "id": "[parameters('deployments_531551508610276229_name')]",
                "status": 4,
                "author_email": "",
                "author": "Jon Sequeira",
                "deployer": "VSTS",
                "message": "{\"type\":\"Deployment\",\"commitId\":\"0aa3b3c5797965f44bbf2fc17ec138a42a7de655\",\"buildId\":\"1078694\",\"releaseId\":\"53155\",\"buildNumber\":\"20171021.13\",\"releaseName\":\"Release-16\",\"repoProvider\":\"TfsGit\",\"repoName\":\"MLS-Monitoring\",\"collectionUrl\":\"https://devdiv.visualstudio.com/\",\"teamProject\":\"0bdbc590-a062-4c3f-b0f6-9383f67865ee\",\"slotName\":\"Production\"}",
                "start_time": "2017-10-21T18:24:38.5162598Z",
                "end_time": "2017-10-21T18:24:38.5162598Z",
                "active": false
            },
            "dependsOn": [
                "[resourceId('Microsoft.Web/sites', parameters('sites_MLS_Monitoring_name'))]"
            ]
        },
        {
            "comments": "Generalized from resource: '/subscriptions/fea3a3c9-c4a3-4743-9835-1502a54705e9/resourcegroups/MLS-RG/providers/Microsoft.Web/sites/MLS-Monitoring/deployments/531541508607505636'.",
            "type": "Microsoft.Web/sites/deployments",
            "name": "[concat(parameters('sites_MLS_Monitoring_name'), '/', parameters('deployments_531541508607505636_name'))]",
            "apiVersion": "2016-08-01",
            "location": "South Central US",
            "scale": null,
            "properties": {
                "id": "[parameters('deployments_531541508607505636_name')]",
                "status": 3,
                "author_email": "",
                "author": "Jon Sequeira",
                "deployer": "VSTS",
                "message": "{\"type\":\"Deployment\",\"commitId\":\"638033a653cfda78e9ccc899d15e3a8b8e011bdf\",\"buildId\":\"1078670\",\"releaseId\":\"53154\",\"buildNumber\":\"20171021.12\",\"releaseName\":\"Release-15\",\"repoProvider\":\"TfsGit\",\"repoName\":\"MLS-Monitoring\",\"collectionUrl\":\"https://devdiv.visualstudio.com/\",\"teamProject\":\"0bdbc590-a062-4c3f-b0f6-9383f67865ee\",\"slotName\":\"Production\"}",
                "start_time": "2017-10-21T17:38:26.6341321Z",
                "end_time": "2017-10-21T17:38:26.6341321Z",
                "active": false
            },
            "dependsOn": [
                "[resourceId('Microsoft.Web/sites', parameters('sites_MLS_Monitoring_name'))]"
            ]
        },
        {
            "comments": "Generalized from resource: '/subscriptions/fea3a3c9-c4a3-4743-9835-1502a54705e9/resourceGroups/MLS-RG/providers/Microsoft.Web/sites/trydotnet-staging/config/web'.",
            "type": "Microsoft.Web/sites/config",
            "name": "[concat(parameters('sites_trydotnet_staging_name'), '/', parameters('config_web_name_3'))]",
            "apiVersion": "2016-08-01",
            "location": "West US",
            "scale": null,
            "properties": {
                "numberOfWorkers": 1,
                "defaultDocuments": [
                    "Default.htm",
                    "Default.html",
                    "Default.asp",
                    "index.htm",
                    "index.html",
                    "iisstart.htm",
                    "default.aspx",
                    "index.php",
                    "hostingstart.html"
                ],
                "netFrameworkVersion": "v4.0",
                "phpVersion": "",
                "pythonVersion": "",
                "nodeVersion": "",
                "linuxFxVersion": "DOCKER|mlscontainerregistry.azurecr.io/mls.orchestrator:staging",
                "requestTracingEnabled": false,
                "remoteDebuggingEnabled": false,
                "remoteDebuggingVersion": "VS2012",
                "httpLoggingEnabled": true,
                "logsDirectorySizeLimit": 35,
                "detailedErrorLoggingEnabled": false,
                "publishingUsername": "$trydotnet-staging",
                "publishingPassword": null,
                "appSettings": null,
                "metadata": null,
                "connectionstrings": null,
                "machineKey": null,
                "handlerMappings": null,
                "documentRoot": null,
                "scmType": "None",
                "use32BitWorkerProcess": true,
                "webSocketsEnabled": false,
                "alwaysOn": false,
                "javaVersion": null,
                "javaContainer": null,
                "javaContainerVersion": null,
                "appCommandLine": "",
                "managedPipelineMode": "Integrated",
                "virtualApplications": [
                    {
                        "virtualPath": "/",
                        "physicalPath": "site\\wwwroot",
                        "preloadEnabled": false,
                        "virtualDirectories": null
                    }
                ],
                "winAuthAdminState": 0,
                "winAuthTenantState": 0,
                "customAppPoolIdentityAdminState": false,
                "customAppPoolIdentityTenantState": false,
                "runtimeADUser": null,
                "runtimeADUserPassword": null,
                "loadBalancing": "LeastRequests",
                "routingRules": [],
                "experiments": {
                    "rampUpRules": []
                },
                "limits": null,
                "autoHealEnabled": false,
                "autoHealRules": {
                    "triggers": null,
                    "actions": null
                },
                "tracingOptions": null,
                "vnetName": "",
                "siteAuthEnabled": false,
                "siteAuthSettings": {
                    "enabled": null,
                    "unauthenticatedClientAction": null,
                    "tokenStoreEnabled": null,
                    "allowedExternalRedirectUrls": null,
                    "defaultProvider": null,
                    "clientId": null,
                    "clientSecret": null,
                    "issuer": null,
                    "allowedAudiences": null,
                    "additionalLoginParams": null,
                    "isAadAutoProvisioned": false,
                    "googleClientId": null,
                    "googleClientSecret": null,
                    "googleOAuthScopes": null,
                    "facebookAppId": null,
                    "facebookAppSecret": null,
                    "facebookOAuthScopes": null,
                    "twitterConsumerKey": null,
                    "twitterConsumerSecret": null,
                    "microsoftAccountClientId": null,
                    "microsoftAccountClientSecret": null,
                    "microsoftAccountOAuthScopes": null
                },
                "cors": null,
                "push": null,
                "apiDefinition": null,
                "autoSwapSlotName": null,
                "localMySqlEnabled": false,
                "ipSecurityRestrictions": null
            },
            "dependsOn": [
                "[resourceId('Microsoft.Web/sites', parameters('sites_trydotnet_staging_name'))]"
            ]
        },
        {
            "comments": "Generalized from resource: '/subscriptions/fea3a3c9-c4a3-4743-9835-1502a54705e9/resourceGroups/MLS-RG/providers/Microsoft.Web/sites/trydotnet/config/web'.",
            "type": "Microsoft.Web/sites/config",
            "name": "[concat(parameters('sites_trydotnet_name'), '/', parameters('config_web_name'))]",
            "apiVersion": "2016-08-01",
            "location": "West US",
            "scale": null,
            "properties": {
                "numberOfWorkers": 1,
                "defaultDocuments": [
                    "Default.htm",
                    "Default.html",
                    "Default.asp",
                    "index.htm",
                    "index.html",
                    "iisstart.htm",
                    "default.aspx",
                    "index.php",
                    "hostingstart.html"
                ],
                "netFrameworkVersion": "v4.0",
                "phpVersion": "",
                "pythonVersion": "",
                "nodeVersion": "",
                "linuxFxVersion": "DOCKER|mlscontainerregistry.azurecr.io/mls.orchestrator:latest",
                "requestTracingEnabled": false,
                "remoteDebuggingEnabled": false,
                "remoteDebuggingVersion": "VS2012",
                "httpLoggingEnabled": true,
                "logsDirectorySizeLimit": 100,
                "detailedErrorLoggingEnabled": false,
                "publishingUsername": "$trydotnet",
                "publishingPassword": null,
                "appSettings": [
                    {
                        "name": "DOCKER_REGISTRY_SERVER_URL",
                        "value": "mlscontainerregistry.azurecr.io"
                    },
                    {
                        "name": "DOCKER_REGISTRY_SERVER_USERNAME",
                        "value": "MLSContainerRegistry"
                    },
                    {
                        "name": "DOCKER_REGISTRY_SERVER_PASSWORD",
                        "value": "xPSReNimrOlh4RnFn1iG8Ec/JjXSLbRe"
                    }
                ],
                "metadata": null,
                "connectionstrings": null,
                "machineKey": null,
                "handlerMappings": null,
                "documentRoot": null,
                "scmType": "None",
                "use32BitWorkerProcess": true,
                "webSocketsEnabled": false,
                "alwaysOn": false,
                "javaVersion": null,
                "javaContainer": null,
                "javaContainerVersion": null,
                "appCommandLine": "",
                "managedPipelineMode": "Integrated",
                "virtualApplications": [
                    {
                        "virtualPath": "/",
                        "physicalPath": "site\\wwwroot",
                        "preloadEnabled": false,
                        "virtualDirectories": null
                    }
                ],
                "winAuthAdminState": 0,
                "winAuthTenantState": 0,
                "customAppPoolIdentityAdminState": false,
                "customAppPoolIdentityTenantState": false,
                "runtimeADUser": null,
                "runtimeADUserPassword": null,
                "loadBalancing": "LeastRequests",
                "routingRules": [],
                "experiments": {
                    "rampUpRules": []
                },
                "limits": null,
                "autoHealEnabled": false,
                "autoHealRules": {
                    "triggers": null,
                    "actions": null
                },
                "tracingOptions": null,
                "vnetName": "",
                "siteAuthEnabled": false,
                "siteAuthSettings": {
                    "enabled": null,
                    "unauthenticatedClientAction": null,
                    "tokenStoreEnabled": null,
                    "allowedExternalRedirectUrls": null,
                    "defaultProvider": null,
                    "clientId": null,
                    "clientSecret": null,
                    "issuer": null,
                    "allowedAudiences": null,
                    "additionalLoginParams": null,
                    "isAadAutoProvisioned": false,
                    "googleClientId": null,
                    "googleClientSecret": null,
                    "googleOAuthScopes": null,
                    "facebookAppId": null,
                    "facebookAppSecret": null,
                    "facebookOAuthScopes": null,
                    "twitterConsumerKey": null,
                    "twitterConsumerSecret": null,
                    "microsoftAccountClientId": null,
                    "microsoftAccountClientSecret": null,
                    "microsoftAccountOAuthScopes": null
                },
                "cors": null,
                "push": null,
                "apiDefinition": null,
                "autoSwapSlotName": null,
                "localMySqlEnabled": false,
                "ipSecurityRestrictions": null
            },
            "dependsOn": [
                "[resourceId('Microsoft.Web/sites', parameters('sites_trydotnet_name'))]"
            ]
        },
        {
            "comments": "Generalized from resource: '/subscriptions/fea3a3c9-c4a3-4743-9835-1502a54705e9/resourceGroups/MLS-RG/providers/Microsoft.Web/sites/trydotnetagent/config/web'.",
            "type": "Microsoft.Web/sites/config",
            "name": "[concat(parameters('sites_trydotnetagent_name'), '/', parameters('config_web_name_2'))]",
            "apiVersion": "2016-08-01",
            "location": "West US",
            "scale": null,
            "properties": {
                "numberOfWorkers": 1,
                "defaultDocuments": [
                    "Default.htm",
                    "Default.html",
                    "Default.asp",
                    "index.htm",
                    "index.html",
                    "iisstart.htm",
                    "default.aspx",
                    "index.php",
                    "hostingstart.html"
                ],
                "netFrameworkVersion": "v4.0",
                "phpVersion": "",
                "pythonVersion": "",
                "nodeVersion": "",
                "linuxFxVersion": "DOCKER|mlscontainerregistry.azurecr.io/mls.workspaceserver:latest",
                "requestTracingEnabled": false,
                "remoteDebuggingEnabled": false,
                "remoteDebuggingVersion": "VS2012",
                "httpLoggingEnabled": true,
                "logsDirectorySizeLimit": 35,
                "detailedErrorLoggingEnabled": false,
                "publishingUsername": "$trydotnetagent",
                "publishingPassword": null,
                "appSettings": null,
                "metadata": null,
                "connectionstrings": null,
                "machineKey": null,
                "handlerMappings": null,
                "documentRoot": null,
                "scmType": "None",
                "use32BitWorkerProcess": true,
                "webSocketsEnabled": false,
                "alwaysOn": false,
                "javaVersion": null,
                "javaContainer": null,
                "javaContainerVersion": null,
                "appCommandLine": "",
                "managedPipelineMode": "Integrated",
                "virtualApplications": [
                    {
                        "virtualPath": "/",
                        "physicalPath": "site\\wwwroot",
                        "preloadEnabled": false,
                        "virtualDirectories": null
                    }
                ],
                "winAuthAdminState": 0,
                "winAuthTenantState": 0,
                "customAppPoolIdentityAdminState": false,
                "customAppPoolIdentityTenantState": false,
                "runtimeADUser": null,
                "runtimeADUserPassword": null,
                "loadBalancing": "LeastRequests",
                "routingRules": [],
                "experiments": {
                    "rampUpRules": []
                },
                "limits": null,
                "autoHealEnabled": false,
                "autoHealRules": {
                    "triggers": null,
                    "actions": null
                },
                "tracingOptions": null,
                "vnetName": "",
                "siteAuthEnabled": false,
                "siteAuthSettings": {
                    "enabled": null,
                    "unauthenticatedClientAction": null,
                    "tokenStoreEnabled": null,
                    "allowedExternalRedirectUrls": null,
                    "defaultProvider": null,
                    "clientId": null,
                    "clientSecret": null,
                    "issuer": null,
                    "allowedAudiences": null,
                    "additionalLoginParams": null,
                    "isAadAutoProvisioned": false,
                    "googleClientId": null,
                    "googleClientSecret": null,
                    "googleOAuthScopes": null,
                    "facebookAppId": null,
                    "facebookAppSecret": null,
                    "facebookOAuthScopes": null,
                    "twitterConsumerKey": null,
                    "twitterConsumerSecret": null,
                    "microsoftAccountClientId": null,
                    "microsoftAccountClientSecret": null,
                    "microsoftAccountOAuthScopes": null
                },
                "cors": null,
                "push": null,
                "apiDefinition": null,
                "autoSwapSlotName": null,
                "localMySqlEnabled": false,
                "ipSecurityRestrictions": null
            },
            "dependsOn": [
                "[resourceId('Microsoft.Web/sites', parameters('sites_trydotnetagent_name'))]"
            ]
        }
    ]

};
