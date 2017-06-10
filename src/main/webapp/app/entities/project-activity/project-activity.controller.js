(function() {
    'use strict';

    angular
        .module('monAppelOffreApp')
        .controller('ProjectActivityController', ProjectActivityController);

    ProjectActivityController.$inject = ['ProjectActivity'];

    function ProjectActivityController(ProjectActivity) {

        var vm = this;

        vm.projectActivities = [];

        loadAll();

        function loadAll() {
            ProjectActivity.query(function(result) {
                vm.projectActivities = result;
                vm.searchQuery = null;
            });
        }
    }
})();
