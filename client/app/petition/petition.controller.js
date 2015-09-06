(function () {
    'use strict';

    angular
        .module('WeWantTrubelControllers')
        .controller('Petition', PetitionController);

    PetitionController.$inject = ['$scope', 'vcRecaptchaService'];

    function PetitionController($scope, vcRecaptchaService) {
        $scope.Title = 'Petition';
        $scope.Recaptcha = {}
        $scope.Recaptcha.Key = '6LflTgETAAAAAHP6FX7dICLE6Qei7sMFfXp66hCM';

        $scope.Recaptcha.OnCreate = function (widgetId) {
            $scope.Recaptcha.WidgetId = widgetId;
        };

        $scope.Recaptcha.OnSuccess = function (response) {
            $scope.Recaptcha.Response = response;
        };

        $scope.Recaptcha.OnExpire = function () {
            $scope.Recaptcha.Response = null;
        };

        $scope.Submit = function (petition) {
            var valid = false;

            if (valid) {
                // Mongo
            }
            else {
                vcRecaptchaService.reload($scope.Recaptcha.WidgetId);
            }
        };
    }
})();
