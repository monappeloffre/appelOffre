(function() {
	'use strict';

	angular
	.module('monAppelOffreApp')
	.controller('formulaireProviderController', formulaireProviderController);

	formulaireProviderController.$inject = ['$timeout', '$scope', 
		'$stateParams',  '$q', 'Provider', 'User', 'Quote', 
		'ProviderEligibility', 'ProviderActivity', 'Registration', 
		'Activity','$http','entity', 'formulaireProvider'];

	function formulaireProviderController ($timeout, $scope, $stateParams, 
			$q, Provider, User, Quote, ProviderEligibility,
			ProviderActivity, Registration, 
			Activity,$http,entity, formulaireProvider) {
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
    	    })
    	    .error(function(err) {
    	    	console.log("uploading imageData ERROR", err);
    	    });
    	    
    	    
    	    console.log(req);
    	    
        }
	

	}
})();
