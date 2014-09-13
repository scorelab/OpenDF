var OpenDFApp = angular.module('OpenDFApp', ['ngRoute' ,'OpenDFApp.services']);

OpenDFApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/', {
            templateUrl: 'templates/index/projects.htm',
            controller: 'projectsController'
        }).
        otherwise({
            redirectTo: '/'
        });
    }]);

OpenDFApp.controller('projectsController', ['$scope', 'ProjectsFactory', '$location' , function ($scope,  ProjectsFactory, $location) {
        $scope.projects = [{name: "Study in Pink"}, {name: "The Great Game"}, {name: "A Scandal In Belgravia"}, {name: "The Empty Hearse"}];
//    ProjectsFactory.get({}, function (projectsFactory) {
//        //$scope.projects = projectsFactory.projects;
//        
        $scope.addNew = function(){
            window.location = 'dashboard.html';
        }
//    });
}]);


var services = angular.module('OpenDFApp.services', ['ngResource']);

services.factory('ProjectsFactory', function ($resource) {
    return $resource('api/projects/:id', {}, {})
});
