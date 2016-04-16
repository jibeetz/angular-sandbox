controllers.controller('pageCtrl', ['$scope', '$location', function ($scope, $location){

    $scope.isActive = function (slug) {
        var active = (slug === $location.path());
        return active;
    };

}]);