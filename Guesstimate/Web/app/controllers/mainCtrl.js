angular.module('Guesstimate').controller('MainController', function ($rootScope, $scope, $location, credentialsService) {
   
    $scope.usersOnline = function () { return credentialsService.getTeamMembers(); };
});