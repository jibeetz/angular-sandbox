factories.factory('getData', ['$http', function($http){

    return function(content){
       return $http.get('data/' + content + '.json');
    };

}]);