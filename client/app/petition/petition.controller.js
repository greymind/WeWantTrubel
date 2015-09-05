(function () {
    'use strict';

    angular
        .module('WeWantTrubelControllers')
        .controller('Petition', PetitionController);

    PetitionController.$inject = ['$scope']; 

    function PetitionController($scope) {
        $scope.Title = 'Petition';

        activate();

        function activate() { }
    }
})();
