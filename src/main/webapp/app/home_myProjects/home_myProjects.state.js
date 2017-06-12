(function() {
    'use strict';

    angular
        .module('monAppelOffreApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('home_myProjects', {
            parent: 'app',
            url: '/home_myProjects',
            data: {
                authorities: []
            },
            views: {
                'content@': {
                    templateUrl: 'app/home_myProjects/home_myProjects.html',
                    controller: 'home_myProjectsController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
             
            }
        });
    }
})();
