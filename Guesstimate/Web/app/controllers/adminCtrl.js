angular.module('Guesstimate')
.controller('AdminController', function ($scope, $location, credentialsService, voteService) {
    $scope.admin_creds = { pass: '' };
    $scope.admin = { showVotes: true, showNames: false };

    $scope.votesForCurrentRound = function () { return voteService.getCurrentVotes(); }

    $scope.claimAdmin = function () {
        alert('claiming administration');
        credentialsService.claimAdmin($scope.admin_creds.pass);
    };

    $scope.nextRound = function () {
        alert('nextRound');
        var adminCreds = credentialsService.getAdminCreds();
        console.log(adminCreds);
        //team.server.clearVotesAdmin(adminCreds.pass);
    };
});