var OpenDFApp = angular.module('OpenDFApp', ['ngRoute' ,'OpenDFApp.services']);

OpenDFApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/', {
            templateUrl: 'templates/index/projects.htm',
            controller: 'projectsController'
        }).
        when('/investigators', {
            templateUrl: 'templates/index/investigators.htm',
            controller: 'investigatorsController'
        }).
        when('/investigators/add-new', {
            templateUrl: 'templates/index/investigators-add-new.htm',
            controller: 'investigatorsController'
        }).
        when('/projects/add-new', {
            templateUrl: 'templates/index/add-new-case.htm',
            controller: 'projectsController'
        }).
        when('/settings/account', {
            templateUrl: 'templates/index/settings/account.htm',
            controller: ''
        }).
        when('/logs', {
            templateUrl: 'templates/index/logs.htm',
            controller: 'logsController'
        }). 
        otherwise({
            redirectTo: '/'
        });
    }]);
