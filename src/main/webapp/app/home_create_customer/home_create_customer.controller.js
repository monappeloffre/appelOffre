(function() {
    'use strict';

    angular
        .module('monAppelOffreApp')
        .controller('formulaireCustomerController', formulaireCustomerController);

    formulaireCustomerController.$inject = ['$timeout', '$scope', 
    	'$stateParams', '$q', 'entity', 'Customer', 
    	'User', 'Project','formulaireCustomer'];

    function formulaireCustomerController ($timeout, $scope,
    		$stateParams,  $q, entity, Customer,
    		User, Project,formulaireCustomer) {
        var vm = this;

        vm.customer = entity;
        vm.clear = clear;
        vm.datePickerOpenStatus = {};
        vm.openCalendar = openCalendar;
        vm.save = save;
        vm.users = User.query();
        vm.projects = Project.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
          
        }

        function save () {
        	vm.isSaving = true;
			console.log(vm.customer);
			formulaireCustomer.save(vm.customer, onSaveSuccess, onSaveError);

        }

        function onSaveSuccess (result) {
            $scope.$emit('monAppelOffreApp:customerUpdate', result);
            
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }

        vm.datePickerOpenStatus.registrationDate = false;

        function openCalendar (date) {
            vm.datePickerOpenStatus[date] = true;
        }
    }
})();