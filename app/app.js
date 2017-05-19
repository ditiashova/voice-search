let app = angular.module('YoutubeSearch', ['ngRoute', 'ngAnimate', 'bc.AngularUrlEncode']);
app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/search',
            {
                templateUrl: 'templates/search.tmpl.html',
                controller: 'SearchController',
                controllerAs: 'searchCtrl'
            })
        .when('/admin',
            {
                templateUrl: 'templates/admin.tmpl.html',
                controller: 'AdminPanelController',
                controllerAs: 'adminCtrl'
            })
        .otherwise({redirectTo: '/search'})
}]);