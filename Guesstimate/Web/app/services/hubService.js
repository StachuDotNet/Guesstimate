angular.module('Guesstimate').factory('hubService', function ($location, $rootScope, voteService, credentialsService) {
    //$(function () { });

    $.connection.hub.logging = true;
    $.connection.hub.start();

    $.connection.hub.error(function (error) {
        console.log("An error occured: " + error);
    });

    var team = $.connection.teamHub;

    // client-side listeners
    team.client.updateVoteList = function (newVoteList) {
        voteService.updateVoteList(JSON.parse(newVoteList));
    };

    team.client.updateUserList = function (newUserList) {
        credentialsService.updateUserList(JSON.parse(newUserList));
    };

    var server_submitVote = function (vote) {
        team.server.submitVoteForCurrentRound($rootScope.credentials.userName, $rootScope.credentials.password, vote);
    };

    var server_claimAdmin = function (adminPass) {
        return team.server.claimAdmin(adminPass);
    };

    var server_logOn = function(username, password){
        return team.server.logOn(username, password);
    };

    var server_logOff = function (username, password) {
        return team.server.logOff(username, password);
    };

    return {
        server_submitVote: server_submitVote,
        server_claimAdmin: server_claimAdmin,
        server_logOn: server_logOn,
        server_logOff: server_logOff
    };
});