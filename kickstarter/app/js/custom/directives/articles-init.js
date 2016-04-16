app.directive('articlesInit', ['$timeout', function($timeout){
	return {
		link: function(scope, element, attrs){

			if (scope.$last){
				$timeout(function () {
					columnConform();
				}, 300);
			}
		}
	};
}]);