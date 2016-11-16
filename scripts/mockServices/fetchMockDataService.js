macApp.service('fetchMockDataService', ['$resource', '$rootScope', '$httpBackend', function($resource, $rootScope, $httpBackend) {

    var fetchMockDataService = {};

    fetchMockDataService.liveMock = false;


    fetchMockDataService.mockHttpMappings = [];

    fetchMockDataService.setRootScopeAppDefaults = function(rootscope) {
        $rootScope.dashboardUserName = 'LO81942';
    };


    fetchMockDataService.getDefaultMockedScope = function(rootScope) {
        if (typeof rootScope === 'undefined' || rootScope === null) {
            rootScope = $rootScope;
        }
        fetchMockDataService.setRootScopeAppDefaults(rootScope);
        var scope = rootScope.$new();
        scope.layoutManager = {};
        scope.user = {};
        scope.user.id = 123;
        scope.user.username = 'LO81942';
        scope.user.userTaskGroups = ['fetchTLAData'];
        //fetchMockDataService.operation = "UnitTest";

        scope.showSpinner = function(message) {

        };

        scope.hideSpinner = function() {

        };

        return scope;
    };


    fetchMockDataService.executeMocking = function(httpBackend, configMappingObject) {
        fetchMockDataService.mockHttpMappings.push(configMappingObject);
        if (fetchMockDataService.liveMock === true) {
            var groupedMockConfigs = {};
            configMappingObject.methodMockConfigs.forEach(function(config) {
                if (!groupedMockConfigs[config.url]) {
                    groupedMockConfigs[config.url] = [];
                }
                groupedMockConfigs[config.url].push(config);
            });
            angular.forEach(groupedMockConfigs, function(mockConfigs) {
                if (mockConfigs.length == 1) {
                    fetchMockDataService.executeStaticMockingForLiveMock(httpBackend, mockConfigs[0]);
                } else {
                    fetchMockDataService.executeDynamicMockingForLiveMock(httpBackend, mockConfigs);
                }
            })
        }
    }



    fetchMockDataService.executeMockingForTests = function(httpBackend, serviceName, serviceMethodName) {
        if (typeof httpBackend === 'undefined' || httpBackend === null) {
            httpBackend = $httpBackend;
        }

        var mockServicesLocation = 'base/WebContent/app/scripts/mockServices/';

        for (mappingInx in fetchMockDataService.mockHttpMappings) {

            var configMappingObject = fetchMockDataService.mockHttpMappings[mappingInx];
            if (configMappingObject.service === serviceName) {
                for (serviceMappingIndx in configMappingObject.methodMockConfigs) {
                    var mappingObject = configMappingObject.methodMockConfigs[serviceMappingIndx];
                    if (mappingObject.serviceMethodName === serviceMethodName) {
                        if (mappingObject.method === 'GET') {
                            httpBackend.expectGET(mappingObject.url).respond(function(method, url, data) {
                                var mockURL = fetchMockDataService.getMockUrlforURL(url, serviceMethodName);
                                return fetchMockDataService.getData(mockServicesLocation + mockURL);
                            });

                        } else if (mappingObject.method === 'POST') {
                            httpBackend.expectPOST(mappingObject.url).respond(function(method, url, data) {
                                var mockURL = fetchMockDataService.getMockUrlforURL(url, serviceMethodName);
                                return fetchMockDataService.getData(mockServicesLocation + mockURL);
                            });

                        }
                    }
                }

            }

        }

    };


    fetchMockDataService.executeStaticMockingForLiveMock = function(httpBackend, mappingObject) {
        if (mappingObject.method === 'GET') {
            $httpBackend.whenGET(mappingObject.url).respond(function(method, url, data) {
                var mockServicesLocation = 'app/scripts/mockServices/';
                var mockURL = fetchMockDataService.getMockUrlforURL(url);
                return fetchMockDataService.getData(mockServicesLocation + mockURL);
            });

        } else if (mappingObject.method === 'POST') {
            $httpBackend.whenPOST(mappingObject.url).respond(function(method, url, data) {
                var mockServicesLocation = 'app/scripts/mockServices/';
                var mockURL = fetchMockDataService.getMockUrlforURL(url);
                return fetchMockDataService.getData(mockServicesLocation + mockURL);
            });
        }
    };

    fetchMockDataService.executeDynamicMockingForLiveMock = function(httpBackend, mockConfigs) {
        var mappingObject = mockConfigs[0];
        if (mappingObject.method === 'GET') {
            $httpBackend.whenGET(mappingObject.url).respond(function(method, url, data) {
                return fetchMockDataService.getDynamicMockData(mockConfigs);
            });

        } else if (mappingObject.method === 'POST') {
            $httpBackend.whenPOST(mappingObject.url).respond(function(method, url, data) {
                return fetchMockDataService.getDynamicMockData(mockConfigs);
            });

        }
    }

    fetchMockDataService.getDynamicMockData = function(mockConfigs) {
        var allListLabel = "";
        var count = 1;
        mockConfigs.forEach(function(mapping) {
            allListLabel = allListLabel + "\n" + (count++) + ". " + mapping.mockUrl;
        });
        var mockServicesLocation = 'app/scripts/mockServices/';
        var mockUrl = mockConfigs[0].mockUrl;
        var userSelection = prompt("select a mock data between:\n" + allListLabel, 1);
        userSelection = parseInt(userSelection);
        if (isNaN(userSelection) || userSelection < 1 || userSelection > mockConfigs.length) {
            alert("Invalid entry. picking the " + mockConfigs[0].mockUrl + " by default");
        } else {
            mockUrl = mockConfigs[userSelection - 1].mockUrl;
        }
        return fetchMockDataService.getData(mockServicesLocation + mockUrl);
    }

    fetchMockDataService.getMockUrlforURL = function(url, serviceMethodName) {
        for (configMappingObjectIndex in fetchMockDataService.mockHttpMappings) {
            var configMappingObject = fetchMockDataService.mockHttpMappings[configMappingObjectIndex];

            for (mappingObjectIndex in configMappingObject.methodMockConfigs)

            {

                var mappingObject = configMappingObject.methodMockConfigs[mappingObjectIndex];
                //console.log("regexurl:"+mappingObject.url +"   "+"url:"+url+"    "+"mockUrl:"+mappingObject.mockUrl);

                var urlMatching = mappingObject.url.test(url);

                var methodMatching = true;
                if (serviceMethodName) {
                    methodMatching = mappingObject.serviceMethodName === serviceMethodName;
                }

                //console.log("***************MATCHING*******************" + matching);

                if (urlMatching && methodMatching) {

                    //console.log("CAME HERE NO MORE LOGS");
                    return mappingObject.mockUrl;

                }
            }
        }
        return resultUrl;
    };



    /*fetchMockDataService.executeMockingForLive1 = function(httpBackend){
        if( typeof httpBackend === 'undefined' || httpBackend === null ){
            httpBackend = $httpBackend;
         }

        for(mappingInx in fetchMockDataService.mockHttpMappings)
        {
            var configMappingObject = fetchMockDataService.mockHttpMappings[mappingInx];
            
                for(serviceMappingIndx in configMappingObject.methodMockConfigs)
                {
                    var mappingObject = configMappingObject.methodMockConfigs[serviceMappingIndx];
                    
                        console.log(mappingObject.url);

                        if(mappingObject.method === 'GET')
                        {
                            httpBackend.expectGET(mappingObject.url).respond(function(method, url, data){
                            var request = new XMLHttpRequest();
                            request.open('GET', mappingObject.mockUrl, false);
                            request.send(null);
                            return [200, angular.fromJson(request.response), {}]; 
                            });

                        }
                        else if(mappingObject.method === 'POST')
                        {
                            httpBackend.expectPOST(mappingObject.url).respond(function(method, url, data){
                            var request = new XMLHttpRequest();
                            request.open('GET', mappingObject.mockUrl, false);
                            request.send(null);
                            return [200, angular.fromJson(request.response), {}]; 
                            });

                        }
                    
                }

        }
      };*/


    fetchMockDataService.getData = function(url) {
        var request = new XMLHttpRequest();
        request.open('GET', url, false);
        request.send(null);

        return [200, angular.fromJson(request.response), {}];
    };


    fetchMockDataService.postData = function(url) {
        var request = new XMLHttpRequest();
        request.open('POST', url, false);
        request.send(null);

        return [request.status, angular.fromJson(request.response), {}];
    };


    return fetchMockDataService;
}]);
