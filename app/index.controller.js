(function () {
    'use strict';

    angular
        .module('WeWantTrubel')
        .controller('Index', IndexController);

    IndexController.$inject = ['$scope'];

    function IndexController($scope) {
        $scope.Title = '#WeWantTrubel';
    }
})();
