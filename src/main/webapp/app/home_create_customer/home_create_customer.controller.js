(function() {
    'use strict';

    angular
        .module('monAppelOffreApp')
        .controller('formulaireCustomerController', formulaireCustomerController);

    formulaireCustomerController.$inject = ['$state', '$timeout', '$scope', 
    	'$stateParams', '$q', 'entity', 'Customer', 
    	'User', 'Project','formulaireCustomer'];

    function formulaireCustomerController ($state, $timeout, $scope,
    		$stateParams,  $q, entity, Customer,
    		User, Project,formulaireCustomer) {
        var vm = this;

        vm.customer = entity;
        vm.save = save;

        function save () {
        	vm.isSaving = true;
			console.log(vm.customer);
			formulaireCustomer.save(vm.customer, onSaveSuccess, onSaveError);
			
        }

        function onSaveSuccess (result) {
            $scope.$emit('monAppelOffreApp:customerUpdate', result);
            vm.isSaving = false;
            $state.go('home');
        }

        function onSaveError () {
            vm.isSaving = false;
        }
    }
})();