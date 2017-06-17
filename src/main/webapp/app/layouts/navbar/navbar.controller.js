(function() {
    'use strict';

    angular
        .module('monAppelOffreApp')
        .controller('NavbarController', NavbarController);

    NavbarController.$inject = ['$http', '$state', 'Auth', 'Principal', 'ProfileService', 'LoginService'];

    function NavbarController ($http, $state, Auth, Principal, ProfileService, LoginService) {
        var vm = this;

        vm.isNavbarCollapsed = true;
        vm.isAuthenticated = Principal.isAuthenticated;
        vm.isCustomer = false;
        vm.allRole = [] ;
        vm.isProvider= false;

        ProfileService.getProfileInfo().then(function(response) {
            vm.inProduction = response.inProduction;
            vm.swaggerEnabled = response.swaggerEnabled;
        });

        vm.login = login;
        vm.logout = logout;
        vm.toggleNavbar = toggleNavbar;
        vm.collapseNavbar = collapseNavbar;
        vm.$state = $state;
        
        testRole();
        
        function testRole()
        {
				console.log("test role");
		
				var req = $http.get('/api/tools/role')
				.success(function(data, status, headers, config) {
					console.log("retour : " + data);
					vm.allRole = data;
					vm.isCustomer = vm.allRole.some(x => x === "customer");
					vm.isProvider = vm.allRole.some(x => x === "provider");
					console.log("allrole : " + vm.allRole);
					console.log("isCustomer : " + vm.isCustomer);
					console.log("isProvider : " + vm.isProvider);
				})
				.error(function(err) {
				console.log("ERROR", err);
					return false;
				});
        }

        function login() {
            collapseNavbar();
            LoginService.open();
        }

        function logout() {
            collapseNavbar();
            Auth.logout();
            $state.go('home');
        }

        function toggleNavbar() {
            vm.isNavbarCollapsed = !vm.isNavbarCollapsed;
        }

        function collapseNavbar() {
            vm.isNavbarCollapsed = true;
        }
    }
})();
