(function() {
	'use strict';

	angular
		.module('monAppelOffreApp')
		.config(stateConfig);

	stateConfig.$inject = ['$stateProvider'];

	function stateConfig($stateProvider) {
		$stateProvider.state('home_create_provider', {
			parent: 'app',
			url: '/home_create_provider',
			data: {
				authorities: ['ROLE_USER']
			},
			views: {
				'content@': {
					templateUrl: 'app/home_create_provider/home_create_provider.html',
					controller: 'formulaireProviderController',
					controllerAs: 'vm',
				}
			},
			resolve: {
				
			}
		});
	}
})();