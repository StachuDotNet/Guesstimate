angular.module('Guesstimate')
    .factory('voteService', function ($location, $rootScope, hubService) {
    var myVote = 0;

    $rootScope.votesForCurrentRound = [];
    $rootScope.cards = ["0", "1/8", "1/4", "1/2", "1", "2", "3", "5", "8", "13", "20", "40", "?"];

    var clearVotes = function () {
        $rootScope.votesForCurrentRound = [];
        $rootScope.$apply();
    };

    var submitVote = function (vote) {
        hubService.server_submitVote(vote);
    };

    var updateVoteList = function (newVoteList) {
        votesForCurrentRound = JSON.parse(newVoteList);
        $rootScope.$apply();
    };

    // called by hubService
    var updateVoteList = function (newVoteList) {
        votesForCurrentRound = newVoteList;
        $rootScope.$apply();
    };

    return {
        submitVote: submitVote,
        clearVotes: clearVotes,
        getCards: function () { return cards; },
        getCurrentVote: function () { return $rootScope.votesForCurrentRound; },
        updateVoteList: updateVoteList
    };
});


