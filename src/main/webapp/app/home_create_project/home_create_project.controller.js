(function() {
	'use strict';

	angular.module('monAppelOffreApp').controller('FormulaireController',
			FormulaireController);

	FormulaireController.$inject = [ '$state', '$timeout', '$scope', '$stateParams',
			'DataUtils', 'Project', 'Quote', 'ProviderEligibility',
			'ProjectActivity', 'Customer', 'ProjectPic', 'ProviderActivity',
			'Formulaire', 'Activity', '$http' ];

	function FormulaireController($state, $timeout, $scope, $stateParams, DataUtils,
			Project, Quote, ProviderEligibility, ProjectActivity, Customer,
			ProjectPic, ProviderActivity, Formulaire, Activity, $http) {

		var vm = this;
		
		vm.fileToUpload = null;
		vm.description = "";
		vm.title = "";
		vm.allActivities = []; 

		loadAll();
		
		console.log("test controller formulaire");
		
		vm.DefineFileToUpload= function(files){
			vm.fileToUpload=files;
		}

		function loadAll() {
			Activity.query(function(result) {
				vm.activities = result;
			});
		}
		
		vm.save = function ()
		{
			console.log("files : " + vm.fileToUpload);
			console.log("activities : " + vm.allActivities);
			
       	 	var fd = new FormData();
       	 	
       	 	if (vm.fileToUpload !== null) {
				for (var i = 0; i < vm.fileToUpload.length; i++) {
					fd.append("images", vm.fileToUpload[i]);
				}
       	 	}
       	 	//fd.append("images",vm.fileToUpload);
       	 	fd.append("activities", vm.allActivities);
       	 	fd.append("description", vm.description);
       	 	fd.append("title", vm.title);

   	        
    	    var req = $http.post('/api/create-new-project',fd, { 
    	        transformRequest: angular.identity,
    	        headers: {
    	        	'Content-Type': undefined,
    	        	'Accept': "*/*"
    	        }
    	    }).success(function(data, status, headers, config) {
    	    	console.log("uploading imageData OK");
    	    	console.log("data test : " + data);
    	    	console.log("fd test : " + fd);
    	    	$state.go('home');
    	    })
    	    .error(function(err) {
    	    	console.log("uploading imageData ERROR", err);
    	    });
    	    
    	    
    	    console.log(req);
    	    
        }
	}
})();
