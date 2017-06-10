(function() {
    'use strict';

    angular
        .module('monAppelOffreApp')
        .controller('ProjectPicController', ProjectPicController);

    ProjectPicController.$inject = ['ProjectPic'];

    function ProjectPicController(ProjectPic) {

        var vm = this;

        vm.projectPics = [];

        loadAll();

        function loadAll() {
            ProjectPic.query(function(result) {
                vm.projectPics = result;
                vm.searchQuery = null;
            });
        }
    }
})();
