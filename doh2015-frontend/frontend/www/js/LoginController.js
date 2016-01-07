var myApp = angular.module('doh2015.controllers.login',['ionic']);

myApp
.controller('AppCtrl', ['$scope', '$rootScope', '$http', '$ionicSideMenuDelegate','$timeout','$ionicLoading',
 function($scope, $rootScope, $http, $ionicSideMenuDelegate, $timeout, $ionicLoading){
 	document.addEventListener("deviceready", onDeviceReady, false);
 	function onDeviceReady() {
 		screen.lockOrientation('portrait');
 		alert("bla");
 	}
	$scope.philips = {username : "INSERT_USER_2_HERE", password: "INSERT_PSW_2_HERE"};


	$scope.demo = function(nr){
		if(nr == 1)
		{
			$scope.philips.username = "INSERT_USER_1_HERE";
			$scope.philips.password = "INSERT_PSW_1_HERE";
		}
		if(nr == 2)
		{
			$scope.philips.username = "INSERT_USER_2_HERE";
			$scope.philips.password = "INSERT_PSW_2_HERE";
		}
	}
	$scope.logout = function(){
		$scope.loggedin = false;
		$scope.philips.pass="";	
	}
	$scope.submit = function(){
		$scope.loggedin = true;
		$rootScope.philips  = $scope.philips;

		// Todo: actual oauth

    $ionicLoading.show({
      template: 'Loading...'
    });

		var callback = function(response){
			$scope.philips.id = response.userID;

			var access_token = response.access_token;

			console.log("access_token = ["+access_token+"]");

	 		var headers = {
				'philipsToken': access_token,
		        'patientid': response.userID
	    	};

			$http.get("http://146.185.153.92:5000/calories", {headers:headers})
			.then(function(response){
				if(!response || response.success == false)
				{
					console.log("Error!");

				}else{
					$ionicSideMenuDelegate.toggleLeft();
					$rootScope.values = response.data;
				}
				$ionicLoading.hide();
			});

		};

		switch($rootScope.philips.username)
		{
			case "INSERT_USER_1_HERE":
				callback({userID:101, access_token:"INSERT_ACCESS_TOKEN_1_HERE"});
				break;
			case "INSERT_USER_2_HERE":
				callback({userID:102, access_token:"INSERT_ACCESS_TOKEN_2_HERE"});
				break;
 		}


/*		$timeout(function(){
			$ionicSideMenuDelegate.toggleLeft();
			$rootScope.values = {
		 		energie:523*0.8,
		 		koolhydraten:12.5*0.8,
		 		eiwitten:7.8*0.8,
		 		vetten:4.9*0.8,
		 		vetverzadigd:0.3*0.8,
		 		natrium:1.5*0.8,
		 		vezels:3.2*0.8
		 	}
 		}, 500); */
	}
	//$rootScope
}])
.controller('LoginCtrl', ['$scope','$rootScope', '$location', '$timeout', '$interval',
 function($scope, $rootScope, $location,$timeout, $interval) {
	$scope.Math = window.Math;

 	$scope.philipsid = 1234;
 	
    $scope.meta = {
		energie:{name:"Energy", unit: "kCal", adh:250,precision:0},
		koolhydraten:{name:"Carbs", unit: "g", adh:25,precision:1},
		eiwitten:{name:"Protein", unit: "g", adh:15,precision:1},
		vet:{name:"Fat", unit: "g", adh:10,precision:1},
		vetverzadigd:{name:"Sat.Fat", unit: "g", adh:2,precision:1},
		natrium:{name:"Sodium", unit: "mg", adh:0.5,precision:2},
		vezels:{name:"Fiber", unit: "g", adh:3,precision:1},
    };
	
	$scope.values2 = {
	 		energie:0,
	 		koolhydraten:0,
	 		eiwitten:0,
	 		vet:0,
	 		vetverzadigd:0,
	 		natrium:0,
	 		vezels:0
	};

	values = {
	 		energie:250.0,
	 		koolhydraten:25,
	 		eiwitten:15,
	 		vet:10,
	 		vetverzadigd:2,
	 		natrium:0.5,
	 		vezels:3
	};
	var count = 25;
	var time = 200;
	var i=0;
	$interval(function(){ 				
		i++;
		var progress = i/count;

		for(key in $scope.values2)
		{
			$scope.values2[key] = swing(progress) *  values[key];
		}
	}, time/count, count);


 	var swing = function(p){
 		return 0.5 - Math.cos( p * Math.PI ) / 2;
 	};

	var easeInOutQuart = function (t, b, c, d) {
		var b = 0, c = 0, d =1;
		t /= d/2;
		if (t < 1) return c/2*t*t*t*t + b;
		t -= 2;
		return -c/2 * (t*t*t*t - 2) + b;
	};
 	$rootScope.$watch("values", function(newval, oldval){
 		if(newval)
 		{	
 			var count = 50;
 			var time = 1200;
 			var diff = {};
 			for(key in $rootScope.values)
 			{
 				diff[key] = ($rootScope.values[key] - $scope.values2[key]);
 			}
 			var values_old = angular.copy($scope.values2);
 			
 			var i=0;
 			$interval(function(){ 				
 				i++;
 				var progress = i/count;

 				for(key in $rootScope.values)
 				{
 					$scope.values2[key] = values_old[key] + (swing(progress) *  diff[key]);
 				}
 			}, time/count, count);
		}
 	},true);

 	$scope.submitlogin = function(){
 		console.log($scope.values2);
 		$rootScope.diet = $scope.values2;
	 	$location.path("/app/home");	
 	};

}]);



