controllers.controller('homeCtrl', ['$scope', '$timeout', 'getData', function ($scope, $timeout, getData){

    var dataTypes = ['articles', 'categories', 'subcategories'];

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

            // populate subcategories into categories
            angular.forEach($scope.categories, function(category, key) {

                category.subcategories = [];
                angular.forEach(category.subcategoriesIDs, function(catSubcategory, key) {

                    angular.forEach($scope.subcategories, function(subcategory, key) {
                        if(catSubcategory === subcategory.id)
                            category.subcategories.push(subcategory);
                    });
                });
            });

            //populate category color into article
            angular.forEach($scope.articles, function(article, key) {

                angular.forEach($scope.categories, function(category, key) {
                    if(article.categoriesIDs[0] === category.id)
                        article.category = category;
                });
            });
        });
    });

    $scope.selectedSubcategories = [];

    $scope.filterSubcategory = function(subcategory){

        if($scope.selectedSubcategories.indexOf(subcategory) !== -1){
            var index = $scope.selectedSubcategories.indexOf(subcategory);
            $scope.selectedSubcategories.splice(index, 1);

            subcategory.selected = false;
        }else{
            $scope.selectedSubcategories.push(subcategory);

            subcategory.selected = true;
        }

        $timeout(function () {
            columnConform(true);
        }, 500);
    };

    $scope.unselectSubcategory = function(subcategory){
        subcategory.selected = false;
        var index = $scope.selectedSubcategories.indexOf(subcategory);
        $scope.selectedSubcategories.splice(index, 1);

        $timeout(function () {
            columnConform(true);
        }, 500);
    };

    $scope.resetSubcategoriesFilters = function(){

        angular.forEach($scope.selectedSubcategories, function(selectedSubcategory, key) {
            selectedSubcategory.selected = false;
        });
        $scope.selectedSubcategories = [];

        $timeout(function () {
            columnConform(true);
        }, 500);
    };

    $scope.subcategoriesFilter = function(article) {

        var selectedArticle = false;

        if($scope.selectedSubcategories.length === 0)
            return article;

        angular.forEach(article.subcategories, function(articleSubcategory, key) {
            angular.forEach($scope.selectedSubcategories, function(selectedSubcategory, key) {
                if(articleSubcategory === selectedSubcategory.id){
                    selectedArticle = true;
                }
            });
        });

        if(selectedArticle)
            return article;
    };

    var sizes = {
        1 : 4,
        2 : 8,
        3 : 12
    };

    $scope.articleSize = function(articleWidth){

        var classes = 'col-sm-' + sizes[articleWidth] + ' col-md-' + sizes[articleWidth];
        return classes;
    };
}]);