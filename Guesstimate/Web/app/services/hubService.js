//angular.module('Guesstimate').factory('hubService', function ($location, $rootScope) {
//    $.connection.hub.logging = true;
//    $.connection.hub.start();

//    $.connection.hub.error(function (error) {
//        console.log("An error occured: " + error);
//    });

//    var team = $.connection.teamHub;

//    // client-side listeners, broadcast via the rootscope as to not have circular dependencies.
//    team.client.updateVoteList = function (newVoteList) {
//        alert("ANYTHING HERE?!?!")
//        var parsed = JSON.parse(newVoteList);
//        $rootScope.$broadcast('hubService.updateVoteList', parsed);
//    };

//    team.client.updateUserList = function (newUserList) {
//        alert('anything?!');
//        var parsed = JSON.parse(newUserList);
//        $rootScope.$broadcast('hubService.updateUserList', parsed);
//    };

//    var server_submitVote = function (vote) {
//        team.server.submitVoteForCurrentRound($rootScope.credentials.userName, $rootScope.credentials.password, vote);
//    };

//    var server_claimAdmin = function (adminPass) {
//        return team.server.claimAdmin(adminPass);
//    };

//    var server_logOn = function(username, password){
//        return team.server.logOn(username, password);
//    };

//    var server_logOff = function (username, password) {
//        return team.server.logOff(username, password);
//    };

//    return {
//        server_submitVote: server_submitVote,
//        server_claimAdmin: server_claimAdmin,
//        server_logOn: server_logOn,
//        server_logOff: server_logOff
//    };
//});



angular.module('Guesstimate')
.factory('hubService', ['$rootScope', 'Hub', function ($rootScope, Hub) {

    //declaring the hub connection
    var hub = new Hub('teamHub', {

        //client side methods
        listeners: {
            'updateVoteList': function (newVoteList) {
                var parsed = JSON.parse(newVoteList);
                console.log(parsed);
                $rootScope.$emit('hubService.updateVoteList', parsed);
            },
            'updateUserList': function (newUserList) {
                var parsed = JSON.parse(newUserList);
                $rootScope.$emit('hubService.updateUserList', parsed);
            }
        },

        //server side methods
        methods: ['logOn', 'logOff', 'claimAdmin', 'submitVoteForCurrentRound', 'addUser'],

        ////query params sent on initial connection
        //queryParams: {
        //    'token': 'exampletoken'
        //}
    });

    var server_logOn = function (username, password) {
        return hub.logOn(username, password);
    };

    var server_logOff = function (username, password) {
        return hub.logOff(username, password);
    };

    var server_submitVote = function (vote) {
        return hub.submitVoteForCurrentRound($rootScope.credentials.userName, $rootScope.credentials.password, vote);
    };

    var server_claimAdmin = function (adminPass) {
        return hub.claimAdmin(adminPass);
    };

    var server_addUser = function (adminPass, name) {
        return hub.addUser(adminPass, name);
    };

    return {
        server_logOn: server_logOn,
        server_logOff: server_logOff,
        server_submitVote: server_submitVote,
        server_claimAdmin: server_claimAdmin,
        server_addUser: server_addUser
    };
}]);



//angular.module('Guesstimate').service('hubService', function ($rootScope) {
//    var proxy = null;

//    var initialize = function () {
//        alert('initalizing!');
//        //Getting the connection object
//        connection = $.hubConnection();

//        connection.logging = true;

//        //Creating proxy
//        this.proxy = connection.createHubProxy('teamHub');

//        alert(proxy);

//        //Starting connection
//        connection.start();

//        //Publishing an event when server pushes a greeting message
//        this.proxy.on('acceptGreet', function (message) {
//            $rootScope.$emit("acceptGreet", message);
//        });

//        this.proxy.on('updateVoteList', function (newVoteList) {
//            alert('testing');
//            $rootScope.$emit('hubService.updateVoteList', JSON.parse(newVoteList));
//        });

//        //team.client.updateVoteList = function (newVoteList) {
//        //    alert("ANYTHING HERE?!?!")
//        //    var parsed = JSON.parse(newVoteList);
//        //    $rootScope.$broadcast('hubService.updateVoteList', parsed);
//        //};

//        this.proxy.on('updateUserList', function (newUserList) {
//            alert('anything?!');
//            var parsed = JSON.parse(newUserList);
//            $rootScope.$broadcast('hubService.updateUserList', parsed);
//        });
//    };

//    var server_logOn = function (username, password) {
//        alert('loggin on');
//        return this.proxy.invoke('logOn', (username, password));
//    };

//    $(function () {
//        initialize();

//    });

//    return {
//        initialize: initialize,
//        server_logOn: server_logOn
//    };
//});