macApp.factory('customerService',['$http', function($http){
	
	var customerService = {};
	customerService.customerGroupApprovalLimit = {};
	
	customerService.getCustomerDetails = function($http, cisKey){			
		$http.defaults.headers.post['Content-Type'] = 'application/json';
		return	$http.post('./customer', cisKey);
	};
	
	customerService.getCustomersDetails = function($http,customerIds){	
		$http.defaults.headers.post['Content-Type'] = 'application/json';
		return	$http.post('./customersDetails', customerIds);
	};

	customerService.processCustomerDetails = function(customer){
		var custDetail={};
		if(null !== customer){
			if(customer.customerId!==undefined && customer.customerId!==null){
				custDetail.customerId = customer.customerId;
			}
			if(customer.customerTypeId!==undefined && customer.customerTypeId!==null){
				custDetail.customerTypeId =customer.customerTypeId;
			}
			
			custDetail.name = processName(customer);
			if(customer.dateOfBirth!==undefined && customer.dateOfBirth!==null){
				custDetail.DateOfBirth =createDatefromMiliSecond(customer.dateOfBirth);
			}
			if(customer.anzicName!==undefined && customer.anzicName!==null){
				custDetail.anzicName =  customer.anzicName;
			}
			if(customer.trustTypeName!==undefined && customer.trustTypeName!==null){
				custDetail.trustTypeName =  customer.trustTypeName;
			}
			if(customer.clientNumber!==undefined && customer.clientNumber!==null){
				custDetail.clientNumber =  customer.clientNumber;
			}
			
			if(customer.emailId!==undefined && customer.emailId!==null){
				custDetail.emailId= customer.emailId; 
			}
			if(customer.phoneNo!==undefined && customer.phoneNo!==null){
				custDetail.phoneNo= customer.phoneNo;
			}
			if(customer.mobilePhoneNo!==undefined && customer.mobilePhoneNo!==null){
				custDetail.mobilePhoneNo= customer.mobilePhoneNo;
			}
			
			if(customer.zNumber!==undefined && customer.zNumber!==null){
				custDetail.zNumber =customer.zNumber;
			}
			if(customer.tenure!==undefined && customer.tenure!==null){
				custDetail.tenure =customer.tenure;
			}		
			

			if(customer.addressList!==undefined && customer.addressList!==null && customer.addressList.length>0){
				if(customer.addressList[0].addressFormatTypeId!==null && customer.addressList[0].addressFormatTypeId!==undefined){
					custDetail.address="";
					custDetail.addressList	=	customer.addressList[0];	
					if(customer.addressList[0].addressFormatTypeId===1){
						if(customer.addressList[0].unitNumber!==null && customer.addressList[0].unitNumber!==undefined){
							custDetail.address= customer.addressList[0].unitNumber;
						}
						if(customer.addressList[0].floorNumber!==null && customer.addressList[0].floorNumber!==undefined){
							custDetail.address= custDetail.address + " " +  customer.addressList[0].floorNumber;
						}
						if(customer.addressList[0].streetNumber!==null && customer.addressList[0].streetNumber!==undefined){
							custDetail.address= custDetail.address + " " +  customer.addressList[0].streetNumber;
						}
						if(customer.addressList[0].streetName!==null && customer.addressList[0].streetName!==undefined){
							custDetail.address= custDetail.address + " " +  customer.addressList[0].streetName;
						}
						if(customer.addressList[0].streetTypeName!==null && customer.addressList[0].streetTypeName!==undefined){
							custDetail.address= custDetail.address + " " +  customer.addressList[0].streetTypeName;
						}
						if(customer.addressList[0].suburb!==null && customer.addressList[0].suburb!==undefined){
							custDetail.address= custDetail.address + " <BR> " +  customer.addressList[0].suburb;
						}
						if(customer.addressList[0].stateName!==null && customer.addressList[0].stateName!==undefined){
							custDetail.address= custDetail.address + " " +  customer.addressList[0].stateName;
						}
						if(customer.addressList[0].postcode!==null && customer.addressList[0].postcode!==undefined){
							custDetail.address= custDetail.address + " " +  customer.addressList[0].postcode;
						}
						if(customer.addressList[0].countryCode!==null && customer.addressList[0].countryCode!==undefined){
							custDetail.address= custDetail.address + " " +  customer.addressList[0].countryCode;
						}
						
					}else if(customer.addressList[0].addressFormatTypeId===2){
						if(customer.addressList[0].addressLine1 !==null && customer.addressList[0].addressLine1!==undefined){
							custDetail.address= customer.addressList[0].addressLine1;
						}
						if(customer.addressList[0].addressLine2 !==null && customer.addressList[0].addressLine2!==undefined){
							custDetail.address= custDetail.address + " " +  customer.addressList[0].addressLine2;
						}
						if(customer.addressList[0].suburb !==null && customer.addressList[0].suburb!==undefined){
							custDetail.address= custDetail.address + " " +  customer.addressList[0].suburb;
						}
						if(customer.addressList[0].countryCode!==null && customer.addressList[0].countryCode!==undefined){
							custDetail.address= custDetail.address + " " +  customer.addressList[0].countryCode;
						}
					}
				}
			}else{
				custDetail.address="";
			}
			
			if(customer.tenure!==undefined && customer.tenure!==null){
				custDetail.tenure =customer.tenure;
			}
			return custDetail;
		}
	};
	
	
	function processName(customer){
		var name;
		if(customer.customerTypeId === 1){
			if(customer.firstName!==undefined){
				if(customer.gender!==undefined){
					if(customer.gender=== 'F'){
						name = 'Ms '+customer.firstName + ' '+ customer.surname;
					}else{
						name = 'Mr '+customer.firstName + ' '+ customer.surname;
					}
				}else{
					name = customer.firstName + ' '+ customer.surname;
				}
				
			} else{
			name = "Not Available";
			}
			return name ;
		}else if(customer.customerTypeId === 2){
			
			if(customer.businessName!==undefined){
				name = customer.businessName;
			} else{
				name = "Not Available";
			}
			return name;
		}else if(customer.customerTypeId ===  3){
			if(customer.trustName!==undefined){
				name = customer.trustName;
			} else{
				name = "Not Available";
			}
			return name;
		}
	}
	
	function createDatefromMiliSecond(milisecond){
		var date = new Date(milisecond);
	    var dd = date.getDate();
	    var mm = date.getMonth()+1; //January is 0!
	    var yyyy = date.getFullYear();
	    if(dd<10){
	        dd='0'+dd;
	    } 
	    if(mm<10){
	        mm='0'+mm;
	    } 
	    var today = dd+'/'+mm+'/'+yyyy;
		return today;

	}
	
	
		
	
	return customerService;
	
	 
}]);
