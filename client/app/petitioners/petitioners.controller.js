(function () {
    'use strict';

    angular
        .module('WeWantTrubelControllers')
        .controller('Petitioners', PetitionersController);

    PetitionersController.$inject = ['$scope']; 

    function PetitionersController($scope) {
        $scope.Title = 'Petitioners';

        activate();

        function activate() { }
    }
})();
