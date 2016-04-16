controllers.controller('eventsCtrl', ['$scope', '$timeout', '$routeParams', 'getData', function ($scope, $timeout, $routeParams, getData){

    var dataTypes = ['events'];

    // creating promises
    var dataTypesPromises = [];
    angular.forEach(dataTypes, function(dataType, key) {
        dataTypesPromises.push(getData(dataType));
    });

    Promise.all(dataTypesPromises).then(function(contentTypes) {
        $scope.$apply(function () {

            // creating scopes
            angular.forEach(contentTypes, function(contentType, k) {
                $scope[dataTypes[k]] = contentType.data;
            });

            angular.forEach($scope.events, function(event, k) {
                if(event.id === parseInt($routeParams.id)){
                    $scope.selectedEvent = event;
                }
            });
        });
    });
}]);