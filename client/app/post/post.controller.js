(function () {
    'use strict';

    angular
        .module('WeWantTrubelControllers')
        .controller('Post', PostController);

    PostController.$inject = ['$scope']; 

    function PostController($scope) {
        $scope.Title = 'Post';

        activate();

        function activate() { }
    }
})();
