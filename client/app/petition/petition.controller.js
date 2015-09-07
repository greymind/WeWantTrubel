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

        $scope.Submit = function (petition) {
            //$http.post('/api/g-recaptcha', { response: $scope.Recaptcha.Response });
            
            $http.post('/api/petitioners', petition)
                .success(function () {
                    $location.path('/share');
                    $scope.$emit('GetAllPetitioners');
                });

            return;

            $http.get(sprintf('/api/g-recaptcha/%s', $scope.Recaptcha.Response))
                .success(function (data) {
                    if (data.success) {
                        console.log('SUCCESS!');

                        $http.post('/api/petitioners', petition)
                            .success(function () {
                                console.log('Success post!');
                                $location.path('/share');
                            });
                    }
                    else {
                        vcRecaptchaService.reload($scope.Recaptcha.WidgetId);
                    }
                });
        };
    }
})();
