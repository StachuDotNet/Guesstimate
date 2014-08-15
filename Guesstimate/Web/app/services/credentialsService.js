angular.module('Guesstimate').factory('credentialsService', function (team, $location, $rootScope) {
    $rootScope.admin_creds = { pass: "" };
    var admin = { showVotes: true, showNames: false };

    $rootScope.teamMembers = [];
    $rootScope.credentials;

    var clearCredentials = function () {
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
    };

    clearCredentials();

    var claimAdmin = function (adminPass) {
        team.server.claimAdmin(adminPass)
			.done(function (result) {
			    if (result) {
			        $rootScope.admin_creds.pass = adminPass;
			        $rootScope.credentials.isAdmin = true;
			        $location.path("");
			        $rootScope.$apply();
			    } else {
			        alert('bad');
			    }
			});
    };

    // loginCtrl (move)
    var log_in = {};

    var submitLogin = function (username, password) {
        team.server.logOn(username, password)
            .done(function (result) {
                if (result) {
                    $rootScope.credentials.userName = username;
                    $rootScope.credentials.password = password;
                    $rootScope.credentials.loggedIn = true;
                    $rootScope.credentials.team.name = log_in.team;

                    $location.path("");
                    $rootScope.$apply();
                } else {
                    alert('bad');
                }
            });
    };

    team.client.updateUserList = function (newUserList) {
        teamMembers = JSON.parse(newUserList);
        $rootScope.$apply();
    };

    var logOff = function () {
        team.server.logOff(credentials.userName, credentials.password)
            .done(function (result) {
                if (result) {
                    clearCredentials();
                    $rootScope.$apply();
                } else {
                    alert('bad');
                }
            });
    };

    return {
        logOff: logOff,
        submitLogin: submitLogin,
        getTeamMembers: function () { return $rootScope.teamMembers; },
        claimAdmin: claimAdmin,
        getAdminCreds: function () {
            return $rootScope.admin_creds;
        }
    };
});