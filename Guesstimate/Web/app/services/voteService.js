angular.module('Guesstimate')
    .factory('voteService', function ($location, $rootScope, hubService) {
    var myVote = 0;

    var votesForCurrentRound = [];
    var cards = ["0", "1/8", "1/4", "1/2", "1", "2", "3", "5", "8", "13", "20", "40", "?"];

    var clearVotes = function () {
        votesForCurrentRound = [];
        $rootScope.$apply();
    };

    var submitVote = function (vote) {
        hubService.server_submitVote(vote);
    };

    $rootScope.$on('hubService.updateVoteList', function (e, newVoteList) {
        console.log('in');
        votesForCurrentRound = newVoteList;
        $rootScope.$apply();
    });

    return {
        submitVote: submitVote,
        clearVotes: clearVotes,
        getCards: function () { return cards; },
        getCurrentVotes: function () { return votesForCurrentRound; }
    };
});


