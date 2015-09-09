(function () {
    'use strict';

    angular
        .module('WeWantTrubelDirectives')
        .directive('scrollHint', ScrollHintDirective);

    ScrollHintDirective.$inject = ['$window'];

    function ScrollHintDirective($window) {
        // Usage:
        //     <directive></directive>
        // Creates:
        // 
        var directive = {
            link: link,
            restrict: 'EAC'
        };
        return directive;

        function link(scope, element, attrs) {
            $(window).bind('scroll', function (e) {
                var show = $('#trubelImage').height() + $('#petitionStats').height() / 2 - $(window).height() - $(window).scrollTop() > 0;

                if (show) {
                    $(element).fadeIn('fast');
                }
                else {
                    $(element).fadeOut('fast');
                }
            });
        }
    }
})();