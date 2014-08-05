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

    $rootScope.logOff = function () {
        alert('logging off'); // do stuff
    };

    $rootScope.claimAdmin = function () {
        alert('claiming administration with some password.'); // do stuff
    };

    $rootScope.clearVotes = function () {
        $rootScope.votesForCurrentRound = [];
        $rootScope.$apply();
    }

    $rootScope.submitVote = function (vote) {
        alert('submitting a vote:' + vote); // do stuff
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

        alert("logging in or something.");// do stuff
    };

    $rootScope.submitNewUser = function () {
        alert($rootScope.userToCreate); // do stuff with $rootScope.userToCreate
    };
});