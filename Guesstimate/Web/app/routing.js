angular.module('Guesstimate').config(function ($routeProvider, $locationProvider) {
    // All users
    $routeProvider.when('/', { templateUrl: "app/partials/home.html", controller: 'MainController' });
    $routeProvider.when('/login', { templateUrl: "app/partials/login.html", controller: 'LoginController' });
    $routeProvider.when('/vote', { templateUrl: "app/partials/vote.html", controller: 'VoteController' });

    // Admin-only
    $routeProvider.when('/administrate', { templateUrl: "app/partials/administrate.html", controller: 'AdminController' });
    $routeProvider.when('/users', { templateUrl: "app/partials/users.html", controller: 'AdminController' });
    $routeProvider.when('/host', { templateUrl: "app/partials/host.html", controller: 'AdminController' });
});