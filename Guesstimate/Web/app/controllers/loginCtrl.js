angular.module('Guesstimate').controller('LoginController', function ($scope, $location, credentialsService) {
    $scope.log_in = {};

    $scope.submitLogin = function () {
        console.log($scope.log_in);
        credentialsService.submitLogin($scope.log_in.username, $scope.log_in.password);
    };
});