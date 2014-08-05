angular.module('Guesstimate').controller('MainController', function ($rootScope, $scope, $location, team) {

    $rootScope.$on("$routeChangeStart", function () { $rootScope.loading = true; });
    $rootScope.$on("$routeChangeSuccess", function () { $rootScope.loading = false; });

    $rootScope.myVote = 0;
    $rootScope.teamMembers = [];
    $rootScope.votesForCurrentRound = [];
    $scope.cards = ["0", "1/8", "1/4", "1/2", "1", "2", "3", "5", "8", "13", "20", "40", "?"];
    $rootScope.admin_creds = { pass: "" };
    $rootScope.admin = { showVotes: true, showNames: false };

    $rootScope.log_in = { };

    // Start of SignalR recievers
    team.client.updateUserList = function (newUserList) {
        $rootScope.teamMembers = JSON.parse(newUserList);
        $rootScope.$apply();
    };

    team.client.updateVoteList = function (newVoteList) {
        $rootScope.votesForCurrentRound = JSON.parse(newVoteList);
        $rootScope.$apply();
    };
    // End of SignalR recievers


    // Start of SignalR senders
    $rootScope.logOff = function () {
        team.server.logOff($rootScope.credentials.userName, $rootScope.credentials.password)
            .done(function (result) {
                if (result) {
                    $rootScope.clearCredentials();
                    $rootScope.$apply();
                } else {
                    alert('bad');
                }
            });
    };

    $rootScope.claimAdmin = function () {
        team.server.claimAdmin($rootScope.admin_creds.pass)
			.done(function (result) {
			    if (result) {
			        $rootScope.credentials.isAdmin = true;
			        $location.path("");
			        $rootScope.$apply();
			    } else {
			        alert('bad');
			    }
			});
    };

    $rootScope.clearVotes = function () {
        $rootScope.votesForCurrentRound = [];
        $rootScope.$apply();
    }

    $rootScope.submitVote = function (vote) {
        team.server.submitVoteForCurrentRound($rootScope.credentials.userName, $rootScope.credentials.password, vote);
    }

    $rootScope.clearCredentials = function () {
        $rootScope.credentials = {
            userName: "",
            password: "",
            team: {
                id: 0,
                name: '',
                members: []
            },
            loggedIn: false,
            isAdmin: false
        };
    }

    $rootScope.clearCredentials();

    $rootScope.submitLogin = function () {
        $rootScope.credentials.userName = $rootScope.log_in.username;
        $rootScope.credentials.password = $rootScope.log_in.password;

        $rootScope.credentials.isAdmin = $rootScope.log_in.username.toLowerCase() == "admin";

        $rootScope.credentials.team.name = $rootScope.log_in.team;

        team.server.logOn($rootScope.credentials.userName, $rootScope.credentials.password)
            .done(function (result) {
                if (result) {
                    $rootScope.credentials.loggedIn = true;
                    $location.path(""); // why no work?
                    $rootScope.$apply();
                } else {
                    alert('bad');
                }
            });
    };

    $rootScope.nextRound = function () {
        alert('here');
        team.server.clearVotesAdmin($rootScope.admin_creds.pass);
    };
});