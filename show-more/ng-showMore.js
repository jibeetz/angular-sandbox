/* HTML */

<tr ng-repeat="item in items | limitTo: itemsLimit()">
...
</tr>

<button type="button" ng-show="hasMoreItemsToShow()" ng-click="showMoreItems()">Show more</button>

/* Controller */

$scope.tablePagesShown = 1;
$scope.tableSize = 20;

$scope.hasMoreItemsToShow = function () {
    if ($scope.items !== undefined) {
        return $scope.tablePagesShown < ($scope.items.length / $scope.tableSize);
    }
};

$scope.itemsLimit = function () {
    return $scope.tableSize * $scope.tablePagesShown;
};

$scope.showMoreItems = function () {
    $scope.tablePagesShown = $scope.tablePagesShown + 1;
};