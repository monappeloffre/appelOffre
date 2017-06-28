(function() {
    'use strict';

    angular
        .module('monAppelOffreApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('home_create_project', {
            parent: 'app',
            url: '/home_create_project',
            data: {
            	authorities: ['ROLE_USER']
            },
            views: {
                'content@': {
                    templateUrl: 'app/home_create_project/home_create_project.html',
                    controller: 'FormulaireController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
             
            }
        });
    }
})();
