var OpenDFApp = angular.module('OpenDFApp', ['ngRoute' ,'OpenDFApp.services']);

OpenDFApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/', {
            templateUrl: 'templates/index/projects.htm',
            controller: 'projectsController'
        }).
        when('/projects/add-new', {
            templateUrl: 'templates/index/add-new-case.htm',
            controller: 'projectsController'
        }).        
        otherwise({
            redirectTo: '/'
        });
    }]);

OpenDFApp.controller('projectsController', ['$scope', 'ProjectsFactory', '$location' , function ($scope,  ProjectsFactory, $location) {
        $scope.projects = [{name: "Study in Pink ", createdDate: "2012/05/02",last_visted:"today 14:02" ,agent: "milindu sanoj" },
                           {name: "Study in Pink 2", createdDate: "2004/07/21",last_visted:"today 3:56",agent:"dilshan madusanka"},
                           {name: "The Great Game",createdDate:"2005/09/06",last_visted:"yesterday 14:43",agent:"malsha kumari"},
                           {name: "A Scandal In Belgravia",createdDate:"1999/02/23",last_visted:"yesterday 9:55",agent:"thilina kumarage"},
                           {name: "The Empty Hearse",createdDate:"2013/06/22",last_visted:"today 15:23",agent:"kumari uthpala"}];
     
        $scope.addNew = function(){
            window.location = 'dashboard.html';
        }   
//    });
}]);

OpenDFApp.controller('projectController', ['$scope', 'ProjectsFactory', function ($scope, ProjectsFactory) {
        $scope.project = {name: "", depscription: "", createdDate:""}
        $scope.addNew = function(){

            $scope.projects.push(
                    {
                       name: $scope.project.name, 
                       description: $scope.project.depscription,
                       createdDate: $scope.project.createdDate
                    });
        };

}]);

var services = angular.module('OpenDFApp.services', ['ngResource']);

services.factory('ProjectsFactory', function ($resource) {
    return $resource('api/projects/:id', {}, {})
});
