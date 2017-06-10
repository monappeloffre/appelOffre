(function() {
    'use strict';

    angular
        .module('monAppelOffreApp')
        .controller('QuoteController', QuoteController);

    QuoteController.$inject = ['Quote'];

    function QuoteController(Quote) {

        var vm = this;

        vm.quotes = [];

        loadAll();

        function loadAll() {
            Quote.query(function(result) {
                vm.quotes = result;
                vm.searchQuery = null;
            });
        }
    }
})();
