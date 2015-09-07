(function () {
    'use strict';

    angular
        .module('WeWantTrubelControllers')
        .controller('Share', ShareController);

    ShareController.$inject = ['$scope']; 

    function ShareController($scope) {
        $scope.Title = 'Share';
        $scope.Text = 'I just signed the petition! @GrimmWriters @NBCGrimm @TrubelToboni @jtaboner';
        $scope.Hashtags = 'Grimm, BringBackTrubel, WeWantTrubel';
        $scope.Url = 'http://wewanttrubel.com/';
    }
})();
