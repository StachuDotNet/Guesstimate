angular.module('Guesstimate').controller('MainController', function ($rootScope, $scope, $location, team, credentialsService) {
   
    $scope.usersOnline = credentialsService.getTeamMembers();
    
    $rootScope.nextRound = function () {
        team.server.clearVotesAdmin($rootScope.admin_creds.pass);
    };
});