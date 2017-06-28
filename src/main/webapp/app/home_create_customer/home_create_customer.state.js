(function() {
	'use strict';

	angular
	.module('monAppelOffreApp')
	.config(stateConfig);

	stateConfig.$inject = ['$stateProvider'];

	function stateConfig($stateProvider) {
		$stateProvider
		.state('formulaireCustomer', {
			parent: 'app',
			url: '/formulaireCustomer/new',
			data: {
				authorities: ['ROLE_USER']
			},

			views: {
				'content@': {
					templateUrl: 'app/home_create_customer/home_create_customer.html',
					controller: 'formulaireCustomerController',
					controllerAs: 'vm',
				}
			},
			resolve: {
				entity: function ()  {
					return{
						lastName: null,
                        firstName: null,                        
                        postalCode: null,
                        city: null,
                        street: null,
                        streetNumber: null,
                        complementStreet: null                       
					};

				}
			}
		})
	}

})();
