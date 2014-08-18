angular.module('Guesstimate')
.controller('VoteController', function ($rootScope, $scope, $location, voteService) {
    $scope.vote = 0;

    $scope.cards = function () {
        return voteService.getCards();
    }

    $scope.submitVote = function (vote) {
        console.log(vote);
        voteService.submitVote($scope.vote);
    };
});