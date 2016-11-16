angular.module('macApp').service('Constants',function(){

	return {
		searchOptions: [{
				name: 'Connections',
				placeholder: 'Search a connection name or ID'
			},{
				name: 'Deals in progress',
				placeholder: 'Search a LOLA or TLA Deal ID'
		}],
		launchpadTabs: ['Home','Connections','Deals in progress','Borrowing Power'],
		userRoles: ['Local Business Banker','Credit Administrator','Business Administrator','IT Administrator','Regional Manager','Business Banker','Super User','State General Manager','National Manager'],
		advancedFilterParams: [{
			name:'More than',
			value: 1
		},{
			name:'Less than',
			value: 2
		}],
		productTypes:{
			"TERM_LENDING": "TL",
			"OVERDRAFT": "OD",
			"UNSECURED": "UNSEC",
			"EQUIPMENT_FINANCE": "EF",
			"HOME_LOAN": "HL"
		},
		defaultFilters: {
			"COND_LIMIT": "COND",
			"CAPPED": "CAPD",
			"CIGS": "CIGS"
		},
		filterTypeIndx: {
			"ALL_INDX": "ALL",
			"YES_INDX": "YES",
			"NO_INDX": "NO"
		},
		launchPadTabIndex: {
			"HOME_INDX": 0,
			"CONNECTIONS_INDX": 1,
			"DEALS_INDX": 2,
			"CONVERSATIONS_INDX": 3
		},
		launchpadDealStatusFilter: {
			"ALL": [9,10,12,13,14,15,16],
			"SUBMIT": 13,
			"FINALISE": 9,
			"COMPLETE_FIN": 12,
			"MODIFY": 10,
			"READY": 14
		},
		launchpadFilterType: {
			"DEAL_STATUS": 'Deal Status',
			"TLA_STATUS": 'TLA Status'
		},
		dealStatus: {
			"MODIFY": 'MODIFY FACILITIES',
			"FINALISE": 'FINALISE DEAL',
			"COMPLETE_FIN": 'COMPLETE FINANCIALS',
			"SUBMIT": 'SUBMITTED TO TLA',
			"UNSUCCESS": 'UNSUCCESSFUL',
			"EXPIRED": 'EXPIRED',
			"READY": 'READY TO SUBMIT'
		},
		launchpadBPCDealStatusFilter: {
			/**TODO rEVISIT sRIRAM dont ask me what this 3 is. fORE MORE INFO ASK REMYA **/
			"ALL": [2,1,3],
			"CONVERTED": 2,
			"IN_PROGRESS": 1
			
		},
		headerURL:{
			"DEFAULT_HEADER":'app/views/header.html'
		},
		footerURL:{
			"DEFAULT_FOOTER":'app/views/footer.html'
		},
		connProfileTabIndex: {
			"FIN_INDX": 0,
			"FACILITIES_INDX": 1,
			"LENDING_INDX": 2,
			"MATURING_INDX": 3,
			"CUSTOMERS_INDX": 4
		},
		connProfilePages: [
			{
		        name: 'Financials',
		        url: 'app/views/connectionProfile/connectionProfileFinancials.html'
		    },{
		        name: 'Facilities',
		        url: 'app/views/connectionProfile/connectionProfileFacilities.html'
		    },{
			    name: 'LendingDeals',
			    url: 'app/views/connectionProfile/connectionProfileDeals.html'
			},{
				name: 'MaturingFacilities',
				url: 'app/views/connectionProfile/connectionProfileMaturing.html'
			},{
				name: 'Customers',
				url: 'app/views/connectionProfile/connectionProfileCustomers.html'
			}
		],
		dealStatusCode:{
			READY_TO_SUBMIT : 14,
			FINALIZE_DEAL : 9,
			UNSUCCESSFUL : 15,
			SUBMITTED_TO_TLA : 13,
			MODIFY_FACILITIES : 10,
			COMPLETE_FINANCICALS : 12,
			EXPIRED : 16,
		},
		connProfile : {
			labels : {
				ACTIVE_DEALS : "Active Deals",
				SUBMITTED_DEALS : "Submitted and Expired Deals",
				RESUME : "Resume",
				REVIEW_DETAILS : "Review Details",
				LOLA_DEAL_ID : "LOLA Deal ID",
				TLA_DEAL_ID : "TLA Deal ID",
				CREATED_ON : "Created On",
				SUBMITTED_ON : "Submitted On",
				REQUEST_AMOUNT : "Request Amount",
				STATUS : "Status",
				DECISION : "Decision"
			},
			dealStatusText : {
				"9":"Finalise Deal",
				"10":"Modify Facilities",
				"12":"Complete Financials",
				"13":"Submitted to TLA",
				"14":"Ready to Submit",
				"15":"Unsuccessful",
				"16":"Expired"
			},
			activeDealCodes : "9,10,12,14",
			submittedDealCodes : "13,15,16"
		},
		connProfileTabs: ['CONNECTION PROFILE','FACILITIES & SECURITIES','LENDING DEALS','MATURING FACILITIES','CUSTOMERS'],
		assetTypes : {
			RESIDENTIAL_HOUSES_AND_SINGLE_DWELLINGS : 107,
			RESIDENTIAL_HOUSE : 104,
			RESIDENTIAL_UNITS_AND_MULTIPLE_DWELLINGS : 81,
			RESIDENTIAL_SERVICED_APARTMENT : 78,
			RESIDENTIAL_VACANTLAND : 83,
			RESIDENTIAL_COMMUNITY_TITLE : 108,
			RESIDENTIAL_COMPANY_TITLE : 85,
			RESIDENTIAL_STRATA_TITLE : 72,
			RESIDENTIAL_BUILDING_UNIT : 86,
			RESIDENTIAL_STRATUM_TITLE : 70,
			RESIDENTIAL_RUAL_TYPE : 76,
			RESIDENTIAL_CONVERTED_COMMERCIAL : 75,
			RESIDENTIAL_CONVERTED_INDUSTRIAL : 103,

			RURAL_NON_SPECIALISED_PRIME : 98,
			RURAL_NON_SPECIALISED_MEDIUM : 79,
			RURAL_NON_SPECIALISED_MARGINAL : 102,
			NON_SPECIALISED_COMMERCIAL_VACANT_LAND : 100,
			NON_SPECIALISED_COMMERCIAL_RETAIL : 109,
			NON_SPECIALISED_COMMERCIAL_INDUSTRIAL_TYPE: 99,
			MIXED_USE_NO_DOMINANT_SECURITY : 73,
			NON_SPECIALISED_ACCOMMODATION : 74,
			OFFICE_PRIMARY : 80,
			OFFICE_SECONDARY : 105,
			RETAIL_SHOPPING_CENTRES : 82,
			RETAIL_SINGLE_AND_STRIP_SHOPS : 77,
			WAREHOUSE_STORAGE : 106,

			COMMERCIAL_SPECIALISED_CARE_FACILITY : 90,
			COMMERCIAL_COMPANY_TITLE : 96,
			COMMERCIAL_DRINKING_HOTEL : 88,
			COMMERCIAL_SPECIALISED_EDUCATION : 94,
			COMMERCIAL_REGISTERED_CLUB : 92,
			COMMERCIAL_SPECIALISED : 101,
			COMMERCIAL_NON_SPECIALISED_MIXED : 84,
			RURAL_SPECIALISED : 87,
			ACCOMODATION : 91,
			COMMERCIAL_NON_SPECIALISED_OFFICE : 93,
			DEVELOPMENT_SITE_DA_APPROVED : 95,
			DEVELOPMENT_SITE_SPECULATIVE : 97,
			RETAIL_BULKY_GOODS : 89,
			OTHER : 71,

			TERM_DEPOSIT_OWN_BANK: 224,
			TERM_DEPOSIT_OTHER_BANK: 209
		},
		
		assetTypeName : {
			"RP" : "Residential Property",
			"CP" : "Commercial Property",
			"TD" : "Term Deposit",
			"PL" : "Pledged Asset",
			"MV" : "Motor Vehicle",
			"EQ" : "Office Equipment",
			"BA" : "Specialised Business Asset",
			"PM" : "Plant Machinery",
			"FP" : "Farm Product",
			"SC" : "Securities Asset",
			"AM" : "Aircraft Marine Asset"
			
		},
		
		assetGroupType :[
			{RP : [108,85,78,72,70,83,103,76,79,98,102,107,104,81,86,75]},
			{CP : [84,93,99,109,100,74,77,82,89,80,105,100,88,90,92,94,96,101,91,106,88,87,95,97,89,71]},
			{TD : [224,209]},
			{PL : [207,208,210,211,212,213,214,215,216,217,218,219,220,221,222,223]}
		],
		
		assetFamilyTypes : {
			COLL_FAMILY_OFFICE_EQUIP : 2,
			COLL_FAMILY_MOTOR_VEHICLES : 3,
			COLL_FAMILY_OTHER_EQUIP : 4,
			COLL_FAMILY_SPECIALISED_ASSETS : 8,
			COLL_FAMILY_PLANT_MACHINERY : 10,
			COLL_FAMILY_FARM_PRODUCTS : 11,
			COLL_FAMILY_SECURITIES : 12,
			COLL_FAMILY_AIRCRAFT_MARINE : 15
		},
		
		assetFamilyGroupType : [
			{MV : [3]},
			{EQ : [2,4]},
			{BA : [8]},
			{PM : [10]},
			{FP : [11]},
			{SC : [12]},
			{AM : [15]}
		],
		
		
		
		commonErrorCodes : {
			PRODUCT_NOT_ELIGIBILE_FAST_TRACK_ERR_CODE: 500012,
			ROLLOVER_APPROVAL_CHECKLIST_ELIGIBILITY_FAILURE: 500013
		},

		ReductionBasis:{
			IOF:2,
			IOA:4,
			PIAF:3,
			PIAA:7,
			PO:1
		},
		RepaymentFrequencyTypes:{
			WEEKLY:5,
			FORTNIGHTLY:13,
			MONTHLY:4,
			QUARTERLY:3,
			HALFYEARLY:15,
			YEARLY:6
		},
		RepaymentFrequencyValues:{
			WEEKLY:52,
			FORTNIGHTLY:26,
			MONTHLY:12,
			QUARTERLY:4,
			HALFYEARLY:2,
			YEARLY:1
		},

		rolloverFTFacilityTermLimits : {
			MAX_TERM_YEARS_LIMIT : 5,
			MIN_TERM_YEARS_LIMIT : 0,
			MAX_TERM_MONTHS_LIMIT : 11,
			MIN_TERM_MONTHS_LIMIT : 0
		},

		rolloverFTFacilityLabels : {
			EXPIRED :"Expired On",
			MATURING :"Maturing On"
		},

		lolaDateFormat : {
			DEFAULT : "DD-MM-YYYY"
		},
		
		DealDecisionTypes :{
			DECISION_CONDITIONALLY_APPROVED_LIMIT_INT : 1,
			DECISION_REFER_TO_CREDIT_INT : 2,
			DECISION_NO_DECISION_INT : 3,
			DECISION_CONDITIONALLY_APPROVED_LAAA_INT : 4,
			DECISION_NO_DECISION_FINANCIAL_REQUIRED : 5,
			DECISION_CONDITIONALLY_APPROVED_ROLLOVER_POLICY_INT : 6,
			DECISION_NO_DECISION_SECURITY_REQUIRED : 8,
			DECISION_NO_DECISION_CUSTOMERS_REQUIRED_INT : 9,
			DECISION_UNCONDITIONALLY_APPROVED_INT : 10
		},
		
		DealDecisionTypesString :{
			DECISION_NO_DECISION : "No Decision"
		},
		
		DealDecisionTypesSubString :{
			DECISION_SUB_INPROGRESS : "Deal currently in progress"
		},
		
		TLAErrorCodes:{
			CODE_2002 : -2002,
			CODE_2005 : -2005
		}
		
		/*assetGroupType  : {
			RP : [
			      	assetTypes.RESIDENTIAL_COMMUNITY_TITLE, //108
			      	assetTypes.RESIDENTIAL_COMPANY_TITLE, //85
			      	assetTypes.RESIDENTIAL_SERVICED_APARTMENT,//78
			      	assetTypes.RESIDENTIAL_STRATA_TITLE,//72
			      	assetTypes.RESIDENTIAL_STRATUM_TITLE,//70
			      	assetTypes.RESIDENTIAL_VACANTLAND,//83
			      	assetTypes.RESIDENTIAL_CONVERTED_INDUSTRIAL,//103
			      	assetTypes.RESIDENTIAL_RUAL_TYPE,//76
			      	//NOT SURE IF RURAL COMES UNDER RESIDENTIAL OR COMMERCIAL
			      	assetTypes.RURAL_NON_SPECIALISED_MEDIUM,//79
			      	assetTypes.RURAL_NON_SPECIALISED_PRIME,//98
			      	assetTypes.RURAL_NON_SPECIALISED_MARGINAL, //102
			      	assetTypes.RESIDENTIAL_HOUSES_AND_SINGLE_DWELLINGS, //107
			      	assetTypes.RESIDENTIAL_HOUSE, //104
			      	assetTypes.RESIDENTIAL_UNITS_AND_MULTIPLE_DWELLINGS, //81
			      	assetTypes.RESIDENTIAL_BUILDING_UNIT, //86
			      	assetTypes.RESIDENTIAL_CONVERTED_COMMERCIAL, //75
			],
			CP : [
			        assetTypes.COMMERCIAL_NON_SPECIALISED_MIXED, //84
			        assetTypes.COMMERCIAL_NON_SPECIALISED_OFFICE, //93
			        assetTypes.NON_SPECIALISED_COMMERCIAL_INDUSTRIAL_TYPE,//99
			      	assetTypes.NON_SPECIALISED_COMMERCIAL_RETAIL,//109
			      	assetTypes.NON_SPECIALISED_COMMERCIAL_VACANT_LAND,//100
			      	assetTypes.NON_SPECIALISED_ACCOMMODATION, //74
			      	assetTypes.RETAIL_SINGLE_AND_STRIP_SHOPS, //77
			      	assetTypes.RETAIL_SHOPPING_CENTRES, //82
			      	assetTypes.RETAIL_BULKY_GOODS, //89
			      	assetTypes.OFFICE_PRIMARY, //80
			      	assetTypes.OFFICE_SECONDARY, //105
			      	assetTypes.NON_SPECIALISED_COMMERCIAL_VACANT_LAND, //100
			      	assetTypes.COMMERCIAL_DRINKING_HOTEL, //88
			      	assetTypes.COMMERCIAL_SPECIALISED_CARE_FACILITY, //90
			      	assetTypes.COMMERCIAL_REGISTERED_CLUB, //92
			      	assetTypes.COMMERCIAL_SPECIALISED_EDUCATION, //94
			      	assetTypes.COMMERCIAL_COMPANY_TITLE, //96
			      	assetTypes.COMMERCIAL_SPECIALISED, //101
			      	assetTypes.ACCOMODATION,//91
			      	assetTypes.WAREHOUSE_STORAGE, //106
			      	assetTypes.COMMERCIAL_DRINKING_HOTEL, //88
			      	assetTypes.RURAL_SPECIALISED, //87
			      	assetTypes.DEVELOPMENT_SITE_DA_APPROVED, //95,
			      	assetTypes.DEVELOPMENT_SITE_SPECULATIVE, //97,
			      	assetTypes.RETAIL_BULKY_GOODS, //89,
			      	assetTypes.OTHER, //71,
			],
			TD : [ 
			       assetTypes.TERM_DEPOSIT_OWN_BANK, //224
			       assetTypes.TERM_DEPOSIT_OTHER_BANK //209
			 ]
		}*/

	};

});