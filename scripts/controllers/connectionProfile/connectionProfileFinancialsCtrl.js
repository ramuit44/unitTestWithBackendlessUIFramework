angular.module('macApp').controller('connectionProfile.connectionProfileFinancialsCtrl',[ '$scope','Constants', 'connectionProfileFactory', '$rootScope', '$window', '$filter', '$timeout', 'customerGroupService',
	function($scope, Constants, connectionProfileFactory, $rootScope, $window, $filter, $timeout, customerGroupService) {

	//initialization code goes here
	$scope.init = function(){
		//constants - check on the approach
		computeBeltLevel();
		loadCustGroupLimits();
		$scope.childControllerHandler.createDonut();

	};
	
	optimizeDonutData = function(data) {
	    var rlt = [],
	        minPercentage = 0.07,
	        i, sum = 0,
	        len = data.length,
	        totalNegativeOffset = 0,
	        totalPositiveOffset = 0;

	    angular.copy(data, rlt);
	    // step 1
	    for (i = 0; i < len; i++) {
	        sum = sum + data[i][1];
	    }
	    // step 2
	    for (i = 0; i < len; i++) {
	        rlt[i][1] = data[i][1] * 1.0 / sum;
	    }
	    // step 4
	    for (i = 0; i < len; i++) {
	        if (rlt[i][1] < minPercentage) {
	            totalNegativeOffset = totalNegativeOffset + minPercentage - rlt[i][1];
	        }
	    }
	    // step 5.1
	    for (i = 0; i < len; i++) {
	        if (rlt[i][1] > minPercentage) {
	            totalPositiveOffset = totalPositiveOffset + rlt[i][1] - minPercentage;
	        }
	    }

	    // step 5.2, step 3
	    for (i = 0; i < len; i++) {
	        if (rlt[i][1] > minPercentage) {
	            rlt[i][1] = rlt[i][1] + (rlt[i][1] - minPercentage) / totalPositiveOffset * totalNegativeOffset;
	        } else {
	            rlt[i][1] = minPercentage;
	        }
	    }
	    return rlt;
	};


	$scope.childControllerHandler.createDonut = function() {
	    $(document).ready(function() {
	        $scope.data = [];
	        $scope.chartTotal = 0;
	        $scope.chartColors = [];
	        if ($scope.user.userTaskGroups.indexOf('ViewCreateDealOption') == -1) {
	            $scope.chartColors = ['#f4f3f0'];
	            $scope.chartTotal = "Coming soon...";
	            $scope.data = [
	                ['', 100]
	            ];
	        } else {
	            if ($rootScope.isTLADataLoaded) {
	                if ($scope.connectionProfileFactory.financials.tae.currentLimit['Business Lending']) {
	                    $scope.data.push(['Business', connectionProfileFactory.financials.tae.currentLimit['Business Lending']]);
	                    $scope.chartColors.push('#6F2D5D');
	                }

	                if ($scope.connectionProfileFactory.financials.tae.currentLimit['Business Unsecured']) {
	                    $scope.data.push(['Unsecured', connectionProfileFactory.financials.tae.currentLimit['Business Unsecured']]);
	                    $scope.chartColors.push('#60B8BF');
	                }
	                if ($scope.connectionProfileFactory.financials.tae.currentLimit['Consumer Lending']) {
	                    $scope.data.push(['Consumer', connectionProfileFactory.financials.tae.currentLimit['Consumer Lending']]);
	                    $scope.chartColors.push('#935599');
	                }

	                if ($scope.connectionProfileFactory.financials.tae.currentLimit['Equipment Finance']) {
	                    $scope.data.push(['Equipment', connectionProfileFactory.financials.tae.currentLimit['Equipment Finance']]);
	                    $scope.chartColors.push('#A77BA4');
	                }

	                if ($scope.connectionProfileFactory.financials.tae.currentLimit['FX']) {
	                    $scope.data.push(['FX', connectionProfileFactory.financials.tae.currentLimit['FX']]);
	                    $scope.chartColors.push('#318254');
	                }

	                if ($scope.connectionProfileFactory.financials.tae.currentLimit['IPF']) {
	                    $scope.data.push(['IPF', $scope.connectionProfileFactory.financials.tae.currentLimit['IPF']]);
	                    $scope.chartColors.push('#ABB6DA');
	                }

	                if ($scope.connectionProfileFactory.financials.tae.currentLimit['Other']) {
	                    $scope.data.push(['Other', $scope.connectionProfileFactory.financials.tae.currentLimit['Other']]);
	                    $scope.chartColors.push('#e70a0B');
	                }

	                if ($scope.connectionProfileFactory.financials.tae.currentLimit['Personal']) {
	                    $scope.data.push(['Personal', $scope.connectionProfileFactory.financials.tae.currentLimit['Personal']]);
	                    $scope.chartColors.push('#cd4133');
	                }

	                if ($scope.connectionProfileFactory.financials.tae.currentLimit['Unsecured']) {
	                    $scope.data.push(['Unsecured', $scope.connectionProfileFactory.financials.tae.currentLimit['Unsecured']]);
	                    $scope.chartColors.push('#60B8BF');
	                }

	                $scope.chartTotal = $scope.connectionProfileFactory.financials.tae.currentLimit['AggregateExposure'];
	                if ($scope.chartTotal <= 0 || $scope.data.length <= 0) {
	                    $scope.chartColors = ['#f4f3f0'];
	                    $scope.chartTotal = "$0K";
	                    $scope.data = [
	                        [' ', 100]
	                    ];
	                } else if ($scope.chartTotal == 0) {
	                    $scope.chartTotal = "$0K";
	                } else {
	                    $scope.chartTotal = $filter('abbrCurrency')($scope.connectionProfileFactory.financials.tae.currentLimit['AggregateExposure']);
	                }
	            } else {
	                $scope.chartColors = ['#f4f3f0'];
	                $scope.chartTotal = "Get Connection Info";
	                $scope.data = [
	                    ['', 100]
	                ];
	            }
	        }
	        var chartWidth = ($window.screen.availWidth * 14) / 100;
	        
	        var gaugeWidth = (chartWidth / 6) - 10;
	        $window.c3.generate({
	            bindto: '#donutChart',
	            data: {
	                type: 'donut',
	                columns: optimizeDonutData($scope.data),
	                order: false
	            },
	            color: {
	                pattern: $scope.chartColors
	            },
	            donut: {
	                title: $scope.chartTotal,
	                label: {
	                    format: function(v, ratio, id) {
	                        /*var item, i;
	                        for (i = 0; i < $scope.data.length; i++) {
	                            item = $scope.data[i];
	                            if (item[0] === id) {
	                                return $filter('abbrCurrency')(item[1]);
	                            }
	                        }*/
	                        return '';
	                    }
	                }
	            },
	            legend: {
	                show: false
	            },
	            gauge: {
	                width: gaugeWidth
	            },
	            size: {
	                width: chartWidth,
	                height: chartWidth
	            }
	        });

	        // add more info to labels
	        $scope.addLabels = function() {
	            $timeout(function() {
	                // long, convoluted method of adding elems to SVGs
	                var g = document.createElementNS('http://www.w3.org/2000/svg', 'g'),
	                    rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect'),
	                    text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
	                $(rect).attr({
	                    x: -44,
	                    y: -36,
	                    rx: 10,
	                    ry: 10,
	                    width: 90,
	                    height: 20
	                });
	                $(g).attr('class', 'c3-chart-arcs-sub-title').append(text).appendTo('.c3-chart-arcs');
	                if (!$rootScope.isTLADataLoaded) {
	                    if ($window.screen.availWidth < 1200) {
	                        $('.c3-chart-arcs-title').attr({
	                            dy: '.4em',
	                            fill: '#6F2D5D'
	                        }).css({
	                            'font-size': '0.7em',
	                            'text-decoration': 'underline',
	                            'font-weight': 'bold'
	                        }).addClass('link');
	                    } else {
	                        $('.c3-chart-arcs-title').attr({
	                            dy: '.4em',
	                            fill: '#6F2D5D'
	                        }).css({
	                            'font-size': '.7em',
	                            'text-decoration': 'underline',
	                            'font-weight': 'bold'
	                        }).addClass('link');
	                    }

	                } else {
	                    if ($window.screen.availWidth < 1200) {
	                        $('.c3-chart-arcs-title').attr({
	                            dy: '.4em',
	                            fill: '#666'
	                        }).css({
	                            'cursor': 'default',
	                            'font-size': '2em'
	                        });
	                    } else {
	                        $('.c3-chart-arcs-title').attr({
	                            dy: '.4em',
	                            fill: '#666'
	                        }).css({
	                            'cursor': 'default',
	                            'font-size': '2em'
	                        });
	                    }

	                }
	            }, 200);
	        };
	        if ($scope.user.userTaskGroups.indexOf('ViewCreateDealOption') != -1) {
	            if (!$rootScope.isTLADataLoaded) {
	                $('.c3-chart-arcs-title').click(function() {
	                    $scope.loadTLAData();
	                });
	            }
	        }



	        $scope.addLabels();
	        initialTotal = $scope.chartTotal; // save initial total value

	        function requireReCreateChart(nV, oV) {
	            // if chart data array length changed, need to re-create else chart won't refresh
	            if (nV.length != oV.length) {
	                return true;
	            }
	            // if any chart name changed, need to re-create
	            for (var i = 0; i < oV.length; i++) {
	                if (oV[0] != nV[0]) {
	                    return true;
	                }
	            }
	            // if add item in the chart for the first time, need to re-create every time (chart bug)
	            if (nV.length == 1 && nV[0][0].indexOf($scope.tempPrefix) > -1) {
	                return true;
	            }
	            return false;
	        }

	        function showProposedLimit(currentTotal, initialTotal, limitUpdated) {
	            // if total value changed
	            if ($scope.chartTotal != initialTotal) {
	                return true;
	            } else {
	                // if total value hasn't been changed but user has draft deals hence limit already updated
	                if ($scope.limitUpdated) {
	                    return true;
	                }
	            }
	            return false;
	        }

	    });
	};

	function loadCustGroupLimits() {
		
		$scope.showSpinner();
		var custGroupId = connectionProfileFactory.sourceGroupNo;
		if(custGroupId !== undefined){
			customerGroupService.customerGroupLimits(custGroupId).success(function(approvalLimitsData,status, headers, config){
					connectionProfileFactory.financials.limits = approvalLimitsData;
					$scope.hideSpinner();
					
			}).error(function(data, status, headers, config) {
				$scope.hideSpinner();
				$scope.customerId ='';
				$scope.showError(data);
			});			
		}		 
	}

	function computeBeltLevel(){
		if(!$scope.beltLevelList){
			customerGroupService.getAllBeltLevels().success(function(data, status, headers, config) {
				$scope.beltLevelList = data;
				setBeltLevel($scope.user.beltLevel);
			}).error(function(data, status, headers, config) {
				console.log('Error while loading belt level data');					
			});
		}else{
			setBeltLevel($scope.user.beltLevel);
		}
	}

	function setBeltLevel(beltKey){
		var currentBelt;
		$scope.beltLevelList.forEach(function(beltLevel){
			if(beltLevel.key === beltKey){
				currentBelt = beltLevel;
			}
		})
		if(currentBelt){
			$scope.beltLevel = currentBelt.code;	
		}else{
			$scope.beltLevel = "Yellow";
		}
	}
		
}]);

