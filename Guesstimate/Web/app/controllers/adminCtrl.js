angular.module('Guesstimate')
.controller('AdminController', function ($scope, $location, team, credentialsService) {
    $scope.admin_creds = { pass: '' };

    $scope.claimAdmin = function () {
        alert('claiming administration');
        credentialsService.claimAdmin($scope.admin_creds.pass);
    };

    $scope.nextRound = function () {
        alert('nextRound');
        var adminCreds = credentialsService.getAdminCreds();
        console.log(adminCreds);
        team.server.clearVotesAdmin(adminCreds.pass);
    };
});