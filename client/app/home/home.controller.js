(function () {
    'use strict';

    angular
        .module('WeWantTrubelControllers')
        .controller('Home', HomeController);

    HomeController.$inject = ['$scope']; 

    function HomeController($scope) {
        $scope.Title = 'Home';

        activate();

        function activate() { }
    }
})();
