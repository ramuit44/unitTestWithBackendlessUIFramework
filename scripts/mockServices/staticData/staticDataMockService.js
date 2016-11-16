macApp.run(['$httpBackend', 'fetchMockDataService', function($httpBackend, fetchMockDataService) {

    var config = {

            "service": 'staticDataService',

            "methodMockConfigs": [{
                "url": /getReferenceDataCollection/,
                "mockUrl": 'staticData/getReferenceDataCollection.json',
                "method": 'POST',
                "serviceMethodName": 'getReferenceDataCollection'
            },{
                "url": /getReferenceDataCollection/,
                "mockUrl": 'staticData/getReferenceDataCollectionForMFFT.json',
                "method": 'POST',
                "serviceMethodName": 'getReferenceDataCollectionForMFFT'
            },{
                "url": /getStateListForCountry/,
                "mockUrl": 'staticData/getStateListForCountry.json',
                "method": 'POST',
                "serviceMethodName": 'loadStateList'
            },{
                "url": /getSuburbListForState/,
                "mockUrl": 'staticData/getSuburbListForState.json',
                "method": 'POST',
                "serviceMethodName": 'loadSuburbList'
            },{
                "url": /getPostcodeListForSuburb/,
                "mockUrl": 'staticData/getPostcodeListForSuburb.json',
                "method": 'POST',
                "serviceMethodName": 'loadPostcodeList'
            },{
                "url": /referenceDropDownData/,
                "mockUrl": 'staticData/getAllBeltLevels.json',
                "method": 'POST',
                "serviceMethodName": 'getAllBeltLevels'
            }]
        
};
fetchMockDataService.executeMocking($httpBackend, config);


}]);