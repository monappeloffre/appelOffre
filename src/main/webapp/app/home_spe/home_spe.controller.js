(function() {
    'use strict';

    angular
        .module('monAppelOffreApp')
        .controller('home_speController', home_speController);

    home_speController.$inject = ['$scope', 'Principal', 'LoginService', '$state', '$http'];

    function home_speController ($scope, Principal, LoginService, $state, $http) {
        var vm = this;

        vm.account = null;
        vm.isAuthenticated = null;
        vm.login = LoginService.open;
        vm.register = register;
        vm.isCustomer = false;
        vm.allRole = [] ;
        vm.isProvider= false;
        
        $scope.$on('authenticationSuccess', function() {
            getAccount();
        });

        getAccount();

    	testRole();
        
        function testRole()
        {
				console.log("test role");
		
				var req = $http.get('/api/tools/role')
				.success(function(data, status, headers, config) {
					console.log("retour : " + data);
					vm.allRole = data;
					vm.isCustomer = vm.allRole.indexOf("customer") !== -1;
					vm.isProvider = vm.allRole.indexOf("provider") !== -1;
					console.log("allrole : " + vm.allRole);
					console.log("isCustomer : " + vm.isCustomer);
					console.log("isProvider : " + vm.isProvider);
				})
				.error(function(err) {
				console.log("ERROR", err);
					return false;
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




