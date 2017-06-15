(function() {
    'use strict';

    angular
        .module('monAppelOffreApp')
        .controller('home_myProjectsController', home_myProjectsController);

    home_myProjectsController.$inject = ['$http', 'DataUtils','$scope', 'Principal', 'LoginService', '$state', 'myProjects','ProjectPic'];

    function home_myProjectsController ($http, DataUtils, $scope, Principal, LoginService, $state, myProjects,ProjectPic) {
        var vm = this;

        vm.account = null;
        vm.isAuthenticated = null;
        vm.login = LoginService.open;
        vm.register = register;
        vm.openFile = DataUtils.openFile;
        vm.photos = [];
        vm.photos2 = [];
        
        // Ajouter la liste des projets eligibles dans le model d'Angular. Par defaut c'est liste vide
        vm.myProjects = [];
        
        $scope.$on('authenticationSuccess', function() {
            getAccount();
        });

        getAccount();
        
        getMyProjects();
        
        getAllPhoto(1);
        
        
        // Fonction qui ramene les projets elegible depuis le controller SpringMVC (ProjectResource), et appeler la methode /api/eligibleProjects
        // Le JSON retournee va etre affecte au model vm.eligibleProjects = [];
        function getMyProjects() {
        	myProjects.query(function(result) {
                vm.myProjects = result;
                getAllPhotoForAllProject(result);
                console.log("pro1 : " + result);
            });
        }
        
        function getAllPhotoForAllProject(projects)
        {
        	console.log("pro : " + projects);
        	angular.forEach(projects, function (value, prop, obj) {
        		console.log(value.id); // Todd, UK
        		getAllPhoto2(value.id);
        	});
        }
        
        function getAllPhoto2(idProject)
        {
        	if (idProject==0) {
				console.log("Pas de project");
			}
			else{
				console.log("recherche photo..");
				var objectToSend = new FormData();
		
				objectToSend.append("idProject", idProject);
				
				console.log("object envoye :",objectToSend);
		
				var req = $http.post('/api/get-photo',objectToSend, {

				transformRequest: angular.identity,
				headers: {
				'Content-Type': undefined,
				}
				
				}).success(function(data, status, headers, config) {
					console.log("Success");
					console.log("retour 2",data);
					angular.forEach(data, function (value, prop, obj) {
						vm.photos2.push({idproject : value.projectPIC.id, link:value.link});
		            });
					console.log("array after push: ",vm.photos2);
					return true;
				})
				.error(function(err) {
				console.log("ERROR", err);
					return false;
				});
			}
        }
        
        function getAllPhoto (idProject)
        {
        	if (idProject==0) {
				console.log("Pas de project");
			}
			else{
				console.log("recherche photo..");
				var objectToSend = new FormData();
		
				objectToSend.append("idProject", idProject);
				
				console.log("object envoye :",objectToSend);
		
				var req = $http.post('/api/get-photo',objectToSend, {

				transformRequest: angular.identity,
				headers: {
				'Content-Type': undefined,
				}
				
				}).success(function(data, status, headers, config) {
					console.log("Success");
					console.log("retour",data);
					vm.photos =  data;
					return true;
				})
				.error(function(err) {
				console.log("ERROR", err);
					return false;
				});
			}
        }

        function getAccount() {
            Principal.identity().then(function(account) {
                vm.account = account;
                vm.isAuthenticated = Principal.isAuthenticated;
            });
        }
      
        function register(){
        	$state.go('register');
        }
        
    }
})();