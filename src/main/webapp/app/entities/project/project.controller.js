(function() {
    'use strict';

    angular
        .module('monAppelOffreApp')
        .controller('ProjectController', ProjectController);

    ProjectController.$inject = ['DataUtils', 'Project'];

    function ProjectController(DataUtils, Project) {

        var vm = this;

        vm.projects = [];
        vm.openFile = DataUtils.openFile;
        vm.byteSize = DataUtils.byteSize;

        loadAll();

        function loadAll() {
            Project.query(function(result) {
                vm.projects = result;
                vm.searchQuery = null;
            });
        }
    }
})();
