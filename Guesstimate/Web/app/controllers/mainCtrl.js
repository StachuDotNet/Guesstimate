angular.module('Guesstimate').controller('MainController', function ($rootScope, $scope, $location, credentialsService) {
   
    $scope.usersOnline = function () {
        console.log('doing the thing');
        return credentialsService.getTeamMembers();
    };
});