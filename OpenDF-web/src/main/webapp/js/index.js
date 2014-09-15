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
        $scope.projects = [{name: "Study in Pink ", createdDate: "102245"}, {name: "Study in Pink 2", createdDate: "102245"},  {name: "The Great Game"}, {name: "A Scandal In Belgravia"}, {name: "The Empty Hearse"}];
      
        $scope.addNew = function(){
            window.location = 'dashboard.html';
        }
//    });
}]);


var services = angular.module('OpenDFApp.services', ['ngResource']);

services.factory('ProjectsFactory', function ($resource) {
    return $resource('api/projects/:id', {}, {})
});
