(function () {
    angular.module('Guesstimate', ["ngRoute", "ngTouch", "mobile-angular-ui"]);

    $(function () {
        $.connection.hub.logging = true;
        $.connection.hub.start();
    });

    $.connection.hub.error(function (error) {
        console.log("An error occured: " + error);
    });

    angular.module('PlanningPoker').value('team', $.connection.teamHub);
})();
