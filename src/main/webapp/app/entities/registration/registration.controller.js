(function() {
    'use strict';

    angular
        .module('monAppelOffreApp')
        .controller('RegistrationController', RegistrationController);

    RegistrationController.$inject = ['Registration'];

    function RegistrationController(Registration) {

        var vm = this;

        vm.registrations = [];

        loadAll();

        function loadAll() {
            Registration.query(function(result) {
                vm.registrations = result;
                vm.searchQuery = null;
            });
        }
    }
})();
