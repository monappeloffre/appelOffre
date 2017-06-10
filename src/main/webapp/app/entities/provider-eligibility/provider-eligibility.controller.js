(function() {
    'use strict';

    angular
        .module('monAppelOffreApp')
        .controller('ProviderEligibilityController', ProviderEligibilityController);

    ProviderEligibilityController.$inject = ['ProviderEligibility'];

    function ProviderEligibilityController(ProviderEligibility) {

        var vm = this;

        vm.providerEligibilities = [];

        loadAll();

        function loadAll() {
            ProviderEligibility.query(function(result) {
                vm.providerEligibilities = result;
                vm.searchQuery = null;
            });
        }
    }
})();
