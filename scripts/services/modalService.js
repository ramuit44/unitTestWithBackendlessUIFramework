'use strict';

/**
 * @ngdoc service
 * @name macApp.ModalService
 * @description
 * # ModalService
 * Service in the macApp.
 */
angular.module('macApp').service('ModalService', ModalService);

ModalService.$inject = [ '$modal' ];

function ModalService ($modal) {
	
	//Include any local variable here
	
	//
	
	//Declaration starts
	var service = {
			//mention any public variable that you want to access through service here.
			
			//
			//Below are bindable members declaration
			showInfoModal : showInfoModal,
			showMaturingFaciltiesModal : showMaturingFaciltiesModal,
			showSubmittedDealStatusModal : showSubmittedDealStatusModal,
			showUnsuccessDealStatusModal : showUnsuccessDealStatusModal,
			showESRCleanseModal : showESRCleanseModal,
			showTLAErrorModal : showTLAErrorModal,
			showTLAAbortMessages : showTLAAbortMessages,
			showUnsuccessMaturingFacModal : showUnsuccessMaturingFacModal
	};
	
	return service;
	//Declaration ends
	
	//Implementation starts
	function showInfoModal (header, infoMsg, buttonLabel, buttonAction, link) {
		 return $modal.open({
	            controller: 'infoModalCtrl',
	            controllerAs : 'infoModalCtrl',
	            templateUrl: 'app/views/modals/infoModal.html',
	            resolve: {
	            	header: function() { return header; },
	                infoMsg: function() { return infoMsg; },
	                buttonLabel: function() { return buttonLabel;},
	                buttonAction: function() { return buttonAction;},
	                link : function() {return link;}
	            }
	        });
	}
	
    function showMaturingFaciltiesModal( connection ) {
        // returns the $modal instance. 
        // The promise representing outcome is at instance.result
        return $modal.open({
            controller: 'ModalMaturingFacilitiesCtrl',
            templateUrl: 'app/views/modals/modalMaturingFacilities.html',
            resolve: {
                heading: function() { return 'Maturing Facilities'; },
                connection: function() { return connection; } 
            }
        });
    }

    function showSubmittedDealStatusModal( deal, user ) {
        // returns the $modal instance. 
        // The promise representing outcome is at instance.result
        return $modal.open({
            controller: 'ModalSubmittedDealStatusCtrl',
            templateUrl: 'app/views/modals/modalSubmittedDealStatus.html',
            size: 'lg',
            resolve: {
                heading: function() { return 'Status of your Deal in TLA'; },
                deal: function() { return deal; },
                user: function() { return user; } 
            }
        });
    }

    function showUnsuccessDealStatusModal( deal, user ) {
        // returns the $modal instance. 
        // The promise representing outcome is at instance.result
        return $modal.open({
            controller: 'ModalUnsuccessDealStatusCtrl',
            templateUrl: 'app/views/modals/modalUnsuccessDealStatus.html',
            size: 'lg',
            resolve: {
                heading: function() { return 'Status of your Deal in TLA'; },
                deal: function() { return deal; },
                user: function() { return user; } 
            }
        });
    }

    function showESRCleanseModal( TLAErrorList, user , connectionNumber){
        return $modal.open({
            controller: 'ModalTLAErrorController',
            templateUrl: 'app/views/modals/modalESRCleanse.html',
            windowClass : 'modalScrollable',
            backdrop  : 'static',
            resolve:{
                heading: function() { return 'ESR Cleanse Required'; },
                TLAErrorList: function() { return TLAErrorList;},
                user: function(){return user;},
                connectionNumber: function(){return connectionNumber;}
            }
        });
    }

    function showTLAErrorModal( TLAErrorList , user, connectionNumber){
        return $modal.open({
            controller: 'ModalTLAErrorController',
            templateUrl: 'app/views/modals/modalTLAError.html',
            resolve:{
                heading: function() { return 'Connection Information Error'; },
                TLAErrorList: function() { return TLAErrorList;},
                user: function(){return user;},
                connectionNumber: function(){return connectionNumber;}
            }
        });
    }

    function showTLAAbortMessages( TLAabortMsgs, isTLAabortErrorExists, sourceGroupNo, isHandleStartDeal ){
        return $modal.open({
            controller: 'ModalTLAAbortController',
            //use controllerAs always to promote use of dotting in html - contextual coding, easily understandable.
            controllerAs:'modalCtrl',
            templateUrl: 'app/views/modals/modalTLAAbortMessages.html',
            size: 'lg',
            windowClass : 'modalScrollable',
            resolve:{
                heading: function() { return 'Connection Health check'; },
                TLAabortMsgs: function() { return TLAabortMsgs; },
                isTLAabortErrorExists: function() { return isTLAabortErrorExists; },
                sourceGroupNo: function() { return sourceGroupNo; },
                isHandleStartDeal:function(){return (typeof (isHandleStartDeal) === "boolean")?isHandleStartDeal:true;}                
            }
        });
    }   
    
    //US 1821
    function showUnsuccessMaturingFacModal( dealId ){
        return $modal.open({
            controller: 'ModalMaturingFacErrorController',
            templateUrl: 'app/views/modals/modalMaturingFacError.html',
            windowClass : 'modalScrollable',
            backdrop  : 'static',
            resolve:{
                heading: function() { return 'Extend a Facility'; },
                dealId: function() { return dealId;}
            }
        });
    }

}

