describe('Controller: connectionProfile.connectionProfileFacilitiesCtrl', function() {

    beforeEach(module('macAppTest'));


    var scope, rootScope, Constants, customerGroupService, filter, connectionProfileFactory, staticDataService, httpBackend, fetchMockDataService, deferred;

    beforeEach(inject(function($controller, _Constants_, _customerGroupService_, _connectionProfileFactory_, _$filter_, _staticDataService_, _$q_, _fetchMockDataService_, $rootScope, $httpBackend) {
        fetchMockDataService = _fetchMockDataService_;
        rootScope = $rootScope;
        scope = fetchMockDataService.getDefaultMockedScope(rootScope);
        Constants = _Constants_;
        customerGroupService = _customerGroupService_;
        connectionProfileFactory = _connectionProfileFactory_;
        staticDataService = _staticDataService_;
        httpBackend = $httpBackend;
        connectionProfileFactory.sourceGroupNo = "12345";
        connectionProfileFactory.connection.groupName = "mockName";
        deferred = _$q_;
        $controller('connectionProfile.connectionProfileFacilitiesCtrl', {
            $scope: scope,
            Constants: _Constants_,
            customerGroupService: _customerGroupService_,
            connectionProfileFactory: _connectionProfileFactory_,
            staticDataService: _staticDataService_,
            deferred: _$q_
        });

    }));

    afterEach(function() {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });


    it('test init()', function() {
        spyOn(scope, 'loadConnectionData');
        scope.init();
        expect(scope.loadConnectionData).toHaveBeenCalled();
        expect(scope.borrowerDTOList).toEqual([]);
        expect(scope.unsupportedGuaranteeList).toEqual([]);
        expect(scope.assetOwnerDTOList).toEqual([]);
        expect(scope.expiredFacilitiesTableParams).not.toBeTruthy();
    });

    it('test enableDisableSecurityView', function() {
        scope.enableDisableSecurityView(true);
        expect(scope.enableSecurityView).toBeTruthy();
    });

    it('test loadConnectionData with  isFacilitiesSecuritiesLoaded true', function() {
        connectionProfileFactory.isFacilitiesSecuritiesLoaded = true;
        connectionProfileFactory.FacilitiesSecuritiesForCG = {};
        scope.loadConnectionData();
        expect(scope.assetOwnerDTOList).toBeUndefined();
        expect(scope.borrowerDTOList).toBeUndefined();
        expect(scope.unsupportedGuaranteeList).toBeUndefined();
        connectionProfileFactory.FacilitiesSecuritiesForCG = {
            assetOwnerDTOList: {},
            borrowerDTOList: {},
            unsupportedGuaranteeList: {}
        };
        scope.loadConnectionData();
        expect(scope.assetOwnerDTOList).toEqual({});
        expect(scope.borrowerDTOList).toEqual({});
        expect(scope.unsupportedGuaranteeList).toEqual({});
    });

    it('test loadConnectionData with  isFacilitiesSecuritiesLoaded false', function() {
        spyOn(scope, 'showSpinner');
        spyOn(scope, 'hideSpinner');
        fetchMockDataService.executeMockingForTests(httpBackend, 'customerGroupService', 'getFacilitiesSecuritiesForCG');
        fetchMockDataService.executeMockingForTests(httpBackend, 'staticDataService', 'getReferenceDataCollection');
        scope.loadConnectionData();
        httpBackend.flush();
        expect(scope.showSpinner).toHaveBeenCalled();
        expect(connectionProfileFactory.FacilitiesSecuritiesForCG).not.toBeUndefined();
        expect(scope.guaranteeFamilyList.length).toBe(2);
        expect(scope.guaranteeTypeListUnsupported.length).toBe(10);
        expect(scope.roleList.length).toBe(4);
        expect(scope.guaranteeTypeListSupported.length).toBe(28);
        expect(connectionProfileFactory.isFacilitiesSecuritiesLoaded).toBeTruthy();
        expect(scope.hideSpinner).toHaveBeenCalled();
    });

    it('test loadConnectionData with  isFacilitiesSecuritiesLoaded false and service failed', function() {
        spyOn(scope, 'showSpinner');
        spyOn(scope, 'hideSpinner');
        fetchMockDataService.executeMockingForTests(httpBackend, 'customerGroupService', 'getFacilitiesSecuritiesForCG');
        httpBackend.expectPOST(/getReferenceDataCollection/).respond(500, {});
        scope.loadConnectionData();
        httpBackend.flush();
        expect(scope.showSpinner).toHaveBeenCalled();
        expect(scope.guaranteeFamilyList).toBeUndefined();
        expect(scope.guaranteeTypeListUnsupported).toBeUndefined();
        expect(scope.roleList).toBeUndefined();
        expect(scope.guaranteeTypeListSupported).toBeUndefined();
        expect(connectionProfileFactory.isFacilitiesSecuritiesLoaded).not.toBeTruthy();
        expect(scope.hideSpinner).toHaveBeenCalled();
    });

    it('test getBsbAndAccount', function() {
        var response = scope.getBsbAndAccount();
        expect(response).toBe('');
        response = scope.getBsbAndAccount({
            account: {}
        });
        expect(response).toBe('');
        response = scope.getBsbAndAccount({
            account: {
                bsb: 12
            }
        });
        expect(response).toBe(12);
        response = scope.getBsbAndAccount({
            account: {
                accountNumber: 123
            }
        });
        expect(response).toBe(123);
        response = scope.getBsbAndAccount({
            account: {
                bsb: 12,
                accountNumber: 123
            }
        });
        expect(response).toBe('12 - 123');
    });

    it('test getRepaymentAmount', function() {
        var response = scope.getRepaymentAmount();
        expect(response).toBeUndefined;
        response = scope.getRepaymentAmount(100);
        expect(response).toBe('$100.00');
        response = scope.getRepaymentAmount("null", null);
        expect(response).toBe("");
        response = scope.getRepaymentAmount(null, 'IO');
        expect(response).toBe("N/A");
        response = scope.getRepaymentAmount(null, 'N/A');
        expect(response).toBe("N/A");
        response = scope.getRepaymentAmount(null, 'junk');
        expect(response).toBe("-");
        response = scope.getRepaymentAmount(null, null);
        expect(response).toBe('-');
    });

    it('test validateReductionBasis', function() {
        var response = scope.validateReductionBasis();
        expect(response).not.toBeTruthy();
        response = scope.validateReductionBasis(null);
        expect(response).not.toBeTruthy();
        var product = {};
        response = scope.validateReductionBasis(product);
        expect(product.repaymentType).toBe("-");
        expect(response).not.toBeTruthy();
        product = {
            repaymentType: 'IO'
        };
        response = scope.validateReductionBasis(product);
        expect(response).toBeTruthy();
        product = {
            repaymentType: 'N/A'
        };
        response = scope.validateReductionBasis(product);
        expect(response).toBeTruthy();
        product = {
            repaymentType: 'junk'
        };
        response = scope.validateReductionBasis(product);
        expect(response).toBeTruthy();
    });

    it('test getTermAndMaturingDate', function() {
        var response = scope.getTermAndMaturingDate();
        expect(response).toBe("0yrs 0mths");
        response = scope.getTermAndMaturingDate("N/A");
        expect(response).toBe("0yrs 0mths");
        response = scope.getTermAndMaturingDate("1yrs 0mths");
        expect(response).toBe("1yrs 0mths");
        response = scope.getTermAndMaturingDate("20/10/2016 - 10yrs", "TERM_ONLY");
        expect(response).toBe(" 10yrs");
        response = scope.getTermAndMaturingDate("20/10/2016 -", "TERM_ONLY");
        expect(response).toBe("");
        response = scope.getTermAndMaturingDate(null, "TERM_ONLY");
        expect(response).toBe("0yrs 0mths");
        response = scope.getTermAndMaturingDate("20/10/2016 - 10yrs", "MATURINGDATE_ONLY");
        expect(response).toBe("20/10/2016 ");
        response = scope.getTermAndMaturingDate("- 10yrs", "MATURINGDATE_ONLY");
        expect(response).toBe("-");
        response = scope.getTermAndMaturingDate(null, "MATURINGDATE_ONLY");
        expect(response).toBe("-");

    });

    it('test getProductMargin', function() {
        var response = scope.getProductMargin({
            interestRate: {}
        });
        expect(response).toBe("0%");
        response = scope.getProductMargin({
            interestRate: {
                productMargin: 10
            }
        });
        expect(response).toBe("10%");
    });

    it('test getCustomerRiskMargin', function() {
        spyOn(scope, 'isCreditCardOrGuarantees').and.returnValues(true, false);
        var response = scope.getCustomerRiskMargin({
            interestRate: {}
        });
        expect(response).toBe("-");
        response = scope.getCustomerRiskMargin({
            interestRate: {
                customerRiskMargin: 10
            }
        });
        expect(response).toBe("-");
        response = scope.getCustomerRiskMargin({
            interestRate: {
                customerRiskMargin: 10
            }
        });
        expect(response).toBe("10%");
    });

    it('test isCreditCardOrGuarantees', function() {
        var response = scope.isCreditCardOrGuarantees({
            productCategory: {}
        });
        expect(response).not.toBeTruthy();
        response = scope.isCreditCardOrGuarantees({
            productCategory: {
                productFamilyId: 10
            }
        });
        expect(response).toBeTruthy();
        response = scope.isCreditCardOrGuarantees({
            productCategory: {
                productFamilyId: 11
            }
        });
        expect(response).not.toBeTruthy();
    });

    it('test splitassetOwner ', function() {
        var asset = {};
        scope.splitassetOwner(asset);
        expect(asset.assetOwnerNameWithPercentage).toBeUndefined();
        asset = {
            assetOwnerNameWithPercentage: "one,two"
        };
        scope.splitassetOwner(asset);
        expect(asset.assetOwnerNameList).toEqual(["one", "two"]);
    });

    

    it('test getAssociatedProductList ', function() {
        var security = {};
        var response = scope.getAssociatedProductList(security);
        expect(response).toEqual([]);
        security = {
            associatedProductList: [1, 2]
        };
        response = scope.getAssociatedProductList(security);
        expect(response).toEqual([1, 2]);
    });

    it('test splitaccountOwnerName ', function() {
        var facility = {};
        scope.splitaccountOwnerName(facility);
        expect(facility.accountOwnerNameList).toEqual([]);
        facility = {
            accountOwnerName: "one|two"
        };
        scope.splitaccountOwnerName(facility);
        expect(facility.accountOwnerNameList).toEqual(["one", "two"]);
    });

    it('test getRefDataLabel  ', function() {
        var refDataList = [{name:"test",key:10}];
        var response = scope.getRefDataLabel();
        expect(response).toBeUndefined();
        response = scope.getRefDataLabel(null,0);
        expect(response).toBe("");
        response = scope.getRefDataLabel(refDataList,10);
        expect(response).toBe("test");
        
    });

    it('test getWaiveLegalAdvice ', function() {
        var response = scope.getWaiveLegalAdvice();
        expect(response).toBe('No');
        response = scope.getWaiveLegalAdvice(false);
        expect(response).toBe('No');
        response = scope.getWaiveLegalAdvice(true);
        expect(response).toBe('Yes');
    });
    
    it('test getAssetGroup ', function() {  
	  var asset = {
              assetCategory: {
              	assetFamilyId: 7,
                  assetTypeId: 108
              }
          };
	  scope.getAssetGroup(asset);
	  var response = scope.assetGroup(asset.assetCategory.assetTypeId,Constants.assetGroupType);
	  
	  var assetGroupIconDetails = {
				iconText : "RP",
	        	hoverText : "Residential Property"
		}
    
	  expect(response).toEqual(assetGroupIconDetails);  
                    
    });
});