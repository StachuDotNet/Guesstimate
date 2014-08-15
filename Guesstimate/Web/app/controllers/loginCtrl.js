angular.module('Guesstimate').controller('LoginController', function ($scope, $location, team, credentialsService) {
    $scope.log_in = {};

    $scope.submitLogin = function () {
        credentialsService.submitLogin($scope.log_in.username, $scope.log_in.password);
    };
});