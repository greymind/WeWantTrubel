(function () {
    'use strict';

    var WeWantTrubelApp = angular.module('WeWantTrubel', [
    // Angular modules
        'ngRoute',
        
    // Custom modules
        'WeWantTrubelModules',
        'WeWantTrubelControllers',
        'WeWantTrubelFactories',
        'WeWantTrubelDirectives',
        'WeWantTrubelFilters',
        
        // 3rd Party Modules
        
    ]);
    
    angular.module('WeWantTrubelModules', []);
    angular.module('WeWantTrubelControllers', []);
    angular.module('WeWantTrubelFactories', []);
    angular.module('WeWantTrubelDirectives', []);
    angular.module('WeWantTrubelFilters', []);
    
    ConfigFunction.$inject = ['$routeProvider', '$httpProvider', '$locationProvider'];
    
    function ConfigFunction($routeProvider, $httpProvider, $locationProvider) {
        $routeProvider
            .when('/petition', {
                templateUrl: 'app/petition/petition.html'
            })
            .otherwise({
                redirectTo: '/petition'
            });

        //$httpProvider.interceptors.push('Interceptor');
        //$locationProvider.html5Mode(true);
    }

    WeWantTrubelApp.config(ConfigFunction);
    
})();