(function() {
    'use strict';

    angular
        .module('monAppelOffreApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('home_depot', {
            parent: 'app',
            url: '/home_depot',
            data: {
                authorities: []
            },
            views: {
                'content@': {
                    templateUrl: 'app/home_depot/home_depot.html',
                    controller: 'DepotController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
             
            }
        });
    }
})();