'use strict';
(function () {
    angular.module('macApp')
        .service('dealModalService', DealModalService);
    DealModalService.$inject = ['commonModalService']

    function DealModalService(CommonModalService) {

        var openModalWithOptions = function(parentScope, data, modalName){
            var packages = [];
            packages.modalData = data;
            packages.parentScope = parentScope;
            return CommonModalService.openModalWithOptions(modalName, packages);
        }
        
        var showAddEditAddress = function(parentScope, data){
            parentScope.headerTitle = "Edit Address";
            return openModalWithOptions(parentScope, data, 'AddEditAddress');
        }

        var showSelectOccupation = function(parentScope, data){
            parentScope.headerTitle = "Select Occupation";
            return openModalWithOptions(parentScope, data, 'SelectOccupation');           
        }

        var showAddEditEmploymentDetails = function(parentScope, data){
            parentScope.headerTitle = "Edit Employment Details";
            return openModalWithOptions(parentScope, data, 'AddEditEmployment');
        }

        var showCreditCheckUnconditionallyApproved = function(parentScope, data){
            parentScope.headerTitle = "Credit Check Result";
            setUpDataForCreditCheckPopUp(data, "CreditCheckUnconditionallyApproved", "Unconditionally Approved", "Finalise Deal");
            return openModalWithOptions(parentScope, data, 'CreditCheckUnconditionallyApproved');
        }


        var showCreditCheckNoDecision = function(parentScope, data){
            parentScope.headerTitle = "Credit Check Result";
            setUpDataForCreditCheckPopUp(data, "CreditCheckNoDecision", "No Decision", "Return To Deal");
            return openModalWithOptions(parentScope, data, 'CreditCheckNoDecision');
        }
        
        var showBureauCallException = function(parentScope, data){
            parentScope.headerTitle = " System Error";
            setUpDataForCreditCheckPopUp(data, "BureauCallException", "", "Close");
            return openModalWithOptions(parentScope, data, 'BureauCallException');
        }

        var showBureauCheckNoDecision = function(parentScope, data){
            parentScope.headerTitle = "Credit Check Result";
            setUpDataForCreditCheckPopUp(data, "BureauCheckNoDecision", "No Decision", "Return To Deal");
            return openModalWithOptions(parentScope, data, 'BureauCheckNoDecision');
        }

        var showCreditCheckOutage = function(parentScope, data){
            parentScope.headerTitle = "Credit Check Result";
            setUpDataForCreditCheckPopUp(data, "CreditCheckOutage", "Conditionally Approved", "Finalise Deal");
            return openModalWithOptions(parentScope, data, 'CreditCheckOutage');
        }

        var showCreditCheckBusinnessAsset = function(parentScope, data){
            parentScope.headerTitle = "Credit Check Result";
            setUpDataForCreditCheckPopUp(data, "CreditCheckBussinessAsset", "Conditionally Approved", "Finalise Deal");
            return openModalWithOptions(parentScope, data, 'CreditCheckBussinessAsset');
        }
        
        var showCreditCheckValuationPolicy = function(parentScope, data){
            parentScope.headerTitle = "Credit Check Result";
            setUpDataForCreditCheckPopUp(data, "CreditCheckValuationPolicy", "Conditionally Approved", "Finalise Deal");
            return openModalWithOptions(parentScope, data, 'CreditCheckValuationPolicy');
        }
        
        var setUpDataForCreditCheckPopUp = function(data, modalType, header, buttonText){
            data = data || {};
            data.header = header;
            data.modalType = modalType;
            data.buttonText = buttonText;
        };

        return {
            showAddEditAddress : showAddEditAddress,
            showSelectOccupation : showSelectOccupation,
            showAddEditEmploymentDetails : showAddEditEmploymentDetails,
            showCreditCheckUnconditionallyApproved : showCreditCheckUnconditionallyApproved,
            showCreditCheckNoDecision : showCreditCheckNoDecision,
            showBureauCallException : showBureauCallException,
            showBureauCheckNoDecision : showBureauCheckNoDecision,
            showCreditCheckOutage : showCreditCheckOutage,
            showCreditCheckBusinnessAsset : showCreditCheckBusinnessAsset,
            showCreditCheckValuationPolicy : showCreditCheckValuationPolicy
            
        };

    }
})();



