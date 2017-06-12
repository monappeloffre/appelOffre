(function() {
    'use strict';

    angular
        .module('monAppelOffreApp')
        .controller('home_myProjectsController', home_myProjectsController);

    home_myProjectsController.$inject = ['$scope', 'Principal', 'LoginService', '$state', 'myProjects'];

    function home_myProjectsController ($scope, Principal, LoginService, $state, myProjects) {
        var vm = this;

        vm.account = null;
        vm.isAuthenticated = null;
        vm.login = LoginService.open;
        vm.register = register;
        
        // Ajouter la liste des projets eligibles dans le model d'Angular. Par defaut c'est liste vide
        vm.myProjects = [];
        
        $scope.$on('authenticationSuccess', function() {
            getAccount();
        });

        getAccount();
        
        getMyProjects();
        
        // Fonction qui ramene les projets elegible depuis le controller SpringMVC (ProjectResource), et appeler la methode /api/eligibleProjects
        // Le JSON retournee va etre affecte au model vm.eligibleProjects = [];
        function getMyProjects() {
        	myProjects.query(function(result) {
                vm.myProjects = result;
            });
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