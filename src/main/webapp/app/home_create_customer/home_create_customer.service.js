(function() {
    'use strict';
    angular
        .module('monAppelOffreApp')
        .factory('formulaireCustomer', formulaireCustomer);

    formulaireCustomer.$inject = ['$resource', 'DateUtils'];

    function formulaireCustomer ($resource, DateUtils) {
        var resourceUrl =  'api/formulaireCustomer/:id';

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
                //headers: {'Content-Type': 'multipart/form-data'},
                transformRequest: function (data) {
	                var copy = angular.copy(data);
	                //copy.registrationDate = DateUtils.convertLocalDateToServer(copy.registrationDate);
	                return angular.toJson(copy);
                }
            
            }
        });
    }
})();