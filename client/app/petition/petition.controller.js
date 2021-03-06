(function () {
    'use strict';

    angular
        .module('WeWantTrubelControllers')
        .controller('Petition', PetitionController);

    PetitionController.$inject = ['$scope', '$http', '$location', 'vcRecaptchaService'];

    function PetitionController($scope, $http, $location, vcRecaptchaService) {
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

        $scope.Recaptcha.HasNoResponse = function () {
            return !$scope.Recaptcha.Response;
        };

        $scope.Submitting = false;
        var SubmitError = function () {
            vcRecaptchaService.reload($scope.Recaptcha.WidgetId);
            $scope.Submitting = false;
        };

        $scope.Submit = function (petition) {
            $scope.Submitting = true;
            $http.get('/api/g-recaptcha', { params: { response: $scope.Recaptcha.Response } })
                .success(function (data) {
                    if (data.success) {
                        $http.post('/api/petitioners', petition)
                            .success(function (result) {
                                $location.path('/share');
                                $scope.$emit('GetAllPetitioners');
                            })
                            .error(function (data, status) {
                                SubmitError();
                            });
                    }
                    else {
                        SubmitError();
                    }
                }).error(function (data, status) {
                    SubmitError();
                });
        };
    }
})();
