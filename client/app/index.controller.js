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
                var petitioners = data;
                var petitionersCount = petitioners.length;
                
                var level = Math.max((Math.log(petitionersCount / 100.0) / (Math.log(2))), 0) + 1;
                var levelCeiling = Math.ceil(level);
                level = levelCeiling;

                var levelMax = Math.pow(2, levelCeiling - 1) * 100;

                if (petitionersCount == levelMax) {
                    ++level;
                    levelMax = Math.pow(2, levelCeiling - 1) * 100;
                }

                var progressPercentage = sprintf("%d%%", petitionersCount / levelMax * 100);
                
                $scope.Petitioners = petitioners;
                $scope.Level = sprintf("%'02d", level);
                $scope.LevelMax = levelMax;
                $scope.ProgressPercentage = progressPercentage;
            });

        $scope.FormatTimeStamp = function (timeStamp) {
            return moment(timeStamp).format("MMM DD, HH:mm");
        }
    }
})();
