(function() {
    'use strict';

    angular
        .module('monAppelOffreApp')
        .controller('ProviderActivityController', ProviderActivityController);

    ProviderActivityController.$inject = ['ProviderActivity'];

    function ProviderActivityController(ProviderActivity) {

        var vm = this;

        vm.providerActivities = [];

        loadAll();

        function loadAll() {
            ProviderActivity.query(function(result) {
                vm.providerActivities = result;
                vm.searchQuery = null;
            });
        }
    }
})();
