angular.module('Guesstimate').config(function ($routeProvider, $locationProvider) {
    // All users
    $routeProvider.when('/', { templateUrl: "app/partials/home.html" });
    $routeProvider.when('/login', { templateUrl: "app/partials/login.html" });
    $routeProvider.when('/vote', { templateUrl: "app/partials/vote.html" });

    // Admin-only
    $routeProvider.when('/administrate', { templateUrl: "app/partials/administrate.html" });
    $routeProvider.when('/users', { templateUrl: "app/partials/users.html" });
    $routeProvider.when('/host', { templateUrl: "app/partials/host.html" });
});