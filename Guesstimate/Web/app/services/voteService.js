angular.module('Guesstimate').factory('voteService', function (team, $location, $rootScope) {
    var myVote = 0;

    $rootScope.votesForCurrentRound = [];
    $rootScope.cards = ["0", "1/8", "1/4", "1/2", "1", "2", "3", "5", "8", "13", "20", "40", "?"];

    var clearVotes = function () {
        $rootScope.votesForCurrentRound = [];
        $rootScope.$apply();
    };

    var submitVote = function (vote) {
        team.server.submitVoteForCurrentRound($rootScope.credentials.userName, $rootScope.credentials.password, vote);
    };

    team.client.updateVoteList = function (newVoteList) {
        votesForCurrentRound = JSON.parse(newVoteList);
        $rootScope.$apply();
    };

    return {
        submitVote: submitVote,
        clearVotes: clearVotes,
        getCards: function () { return cards; },
        getCurrentVote: function () { return $rootScope.votesForCurrentRound; }
    };
});


