/*angular.module('hazmatApp',
		[ ]).config(
		[ '$routeProvider', function($routeProvider) {
			$routeProvider.when('search', {
				templateUrl : 'resources/search.html',
				controller : SearchCtrl
			});
		} ]);*/

angular.module('solasVGMiapp',
		[ ]).config(
		[ '$routeProvider', function($routeProvider) {
			$routeProvider.when('register', {
				templateUrl : 'resources/register.html',
				controller : RegisterCtrl
			});
		} ]);