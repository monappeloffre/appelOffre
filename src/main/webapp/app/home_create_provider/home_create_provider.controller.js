(function() {
	'use strict';

	angular
	.module('monAppelOffreApp')
	.controller('formulaireProviderController', formulaireProviderController);

	formulaireProviderController.$inject = ['$state', '$timeout', '$scope', 
		'$stateParams',  '$q', 'Activity','$http', 'formulaireProvider'];

	function formulaireProviderController ($state, $timeout, $scope, $stateParams, 
			$q, Activity,$http, formulaireProvider) {
		var vm = this;

		vm.allActivities = []; 
		vm.activities = [];
		vm.lastName = "";
		vm.firstName = "";
		vm.companyName = "";
		vm.siret = "";

		loadAll();

		function loadAll() {
			Activity.query(function(result) {
				vm.activities = result;
			});
		}
		
		vm.save = function ()
		{
			console.log("activities : " + vm.allActivities);
			
       	 	var fd = new FormData();

       	 	fd.append("lastName", vm.lastName);
       	 	fd.append("firstName", vm.firstName);
       	 	fd.append("companyName", vm.companyName);
       	 	fd.append("siret", vm.siret);
       	 	fd.append("activities", vm.allActivities);

   	        
    	    var req = $http.post('/api/create-new-provider',fd, { 
    	        transformRequest: angular.identity,
    	        headers: {
    	        	'Content-Type': undefined,
    	        	'Accept': "*/*"
    	        }
    	    
    	    
    	    
    	    }).success(function(data, status, headers, config) {
    	    	console.log("success create Provider");
    	    	$state.go('home');
    	    })
    	    .error(function(err) {
    	    	console.log("create provider ERROR", err);
    	    });
    	    
    	    
    	    console.log(req);
    	    
        }
	

	}
})();
