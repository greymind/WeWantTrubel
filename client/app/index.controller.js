(function () {
    'use strict';

    angular
        .module('WeWantTrubel')
        .controller('Index', IndexController);

    IndexController.$inject = ['$scope', '$http'];

    function IndexController($scope, $http) {
        $scope.Title = '#WeWantTrubel';

        $http.get('/api/petitioners')
            .success(function (data) {
                $scope.Petitioners = data;
            });
            
        $scope.FormatTimeStamp = function (timeStamp) {
            return moment(timeStamp).format("MMM DD, HH:mm");
        }
    }
})();
