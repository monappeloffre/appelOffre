(function() {
    'use strict';
    angular
        .module('monAppelOffreApp')
        .factory('Formulaire', Formulaire);

    Formulaire.$inject = ['$resource', 'DateUtils'];

    function Formulaire ($resource, DateUtils) {
        var resourceUrl =  'api/formulaire/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                        data.dateSend = DateUtils.convertLocalDateFromServer(data.dateSend);
                    }
                    return data;
                }
           
            },
            'update': {
                method: 'PUT',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
         
            },
            'save': {
                method: 'POST',
                headers: {'Content-Type': 'multipart/form-data'}
            
            }
        });
    }
})();
