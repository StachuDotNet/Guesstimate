angular.module('Guesstimate')
.controller('VoteController', function ($rootScope, $scope, $location, voteService) {

    $scope.vote = 0;

    $scope.submitVote = function () {
        alert('here');
        voteService.submitVote($scope.vote);
    };
});