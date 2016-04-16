var app = angular.module('app', ['controllers', 'factories', 'ngSanitize', 'ngRoute']);

var controllers = angular.module('controllers', []);

var factories = angular.module('factories', ['ngResource']);


app.config(['$routeProvider', function($routeProvider) {
	$routeProvider.
	when('/category', {
		controller: 'homeCtrl',
		templateUrl: 'partials/category.html'
	}).
	when('/events', {
		controller: 'eventsCtrl',
		templateUrl: 'partials/events.html'
	}).
	when('/events/:id/:url', {
		controller: 'eventsCtrl',
		templateUrl: 'partials/eventDetails.html'
	}).
    otherwise({
        redirectTo: '/',
        controller: 'homeCtrl',
		templateUrl: 'partials/home.html'
    });

}]);