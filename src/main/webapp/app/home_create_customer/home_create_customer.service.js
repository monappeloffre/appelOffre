(function() {
    'use strict';
    angular
        .module('monAppelOffreApp')
        .factory('formulaireCustomer', formulaireCustomer);

    formulaireCustomer.$inject = ['$resource', 'DateUtils'];

    function formulaireCustomer ($resource, DateUtils) {
        var resourceUrl =  'api/customers/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET'
           
            },
            'update': {
                method: 'PUT',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
         
            },
            'save': {
                method: 'POST',
                transformRequest: function (data) {
	                var copy = angular.copy(data);
	                return angular.toJson(copy);
                }
            
            }
        });
    }
})();