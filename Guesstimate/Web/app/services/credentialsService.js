angular.module('Guesstimate').factory('credentialsService', function ($location, $rootScope, hubService) {
    $rootScope.admin_creds = { pass: "" };

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
        hubService.server_claimAdmin(adminPass)
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
        alert(username + ":" + password);

        hubService.server_logOn(username, password)
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

    $rootScope.$on('hubService.updateUserList', function (e, newUserList) {
        $rootScope.teamMembers = newUserList;
        $rootScope.$apply();
    });

    var logOff = function () {
        hubService.server_logOff($rootScope.credentials.userName, $rootScope.credentials.password)
            .done(function (result) {
                if (result) {
                    clearCredentials();
                    $rootScope.$apply();
                } else {
                    alert('bad');
                }
            });
    };

    var addNewUser = function (name) {
        hubService.server_addUser($rootScope.admin_creds.pass, name)
            .done(function (result) {
                if (result) {
                        
                    $location.path("");
                    $rootScope.$apply();
                } else {
                    alert('bad');
                }
    };

    return {
        logOff: logOff,
        submitLogin: submitLogin,
        getTeamMembers: function () { return $rootScope.teamMembers; },
        claimAdmin: claimAdmin,
        getAdminCreds: function () {
            return $rootScope.admin_creds;
        },
        addNewUser: addNewUser
    };
});