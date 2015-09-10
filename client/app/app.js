(function () {
    'use strict';

    var WeWantTrubelApp = angular.module('WeWantTrubel', [
    // Angular modules
        'ngRoute',
        
    // Custom modules
        'WeWantTrubelModules',
        'WeWantTrubelControllers',
        'WeWantTrubelServices',
        'WeWantTrubelDirectives',
        'WeWantTrubelFilters',
        
    // 3rd Party Modules
        'vcRecaptcha'
    ]);

    angular.module('WeWantTrubelModules', []);
    angular.module('WeWantTrubelControllers', []);
    angular.module('WeWantTrubelServices', []);
    angular.module('WeWantTrubelDirectives', []);
    angular.module('WeWantTrubelFilters', []);

    ConfigFunction.$inject = ['$routeProvider', '$httpProvider', '$locationProvider'];

    function ConfigFunction($routeProvider, $httpProvider, $locationProvider) {
        $routeProvider
            .when('/petition', {
                templateUrl: 'app/petition/petition.html'
            })
            .when('/share', {
                templateUrl: 'app/share/share.html'
            })
            .otherwise({
                redirectTo: '/petition'
            });

        //$httpProvider.interceptors.push('Interceptor');
        //$locationProvider.html5Mode(true);
    }

    WeWantTrubelApp.config(ConfigFunction);

})();