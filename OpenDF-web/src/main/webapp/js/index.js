function changePassword(data){
    console.log(data);
    $.post("api/user/change/password", data, function(){ alert("Password is successfully changed"); });
}
function changeUsername(data){
    console.log(data);
    $.post("api/user/change/username", data, function(){ alert("Username is successfully changed");  });
}
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
        when('/settings/account', {
            templateUrl: 'templates/index/settings/account.htm',
            controller: ''
        }). 
        otherwise({
            redirectTo: '/'
        });
    }]);

OpenDFApp.controller('projectsController', ['$scope', 'ProjectsFactory', '$location' , function ($scope,  ProjectsFactory, $location) {
        $scope.projects = [];
        ProjectsFactory.query(function(data) {
           $scope.projects = data;
        });
        $scope.goto = function(id){
            window.location = 'dashboard.jsp#'+id;
        }   
//    });
}]);

OpenDFApp.controller('projectController', ['$scope', 'ProjectsFactory', function ($scope, ProjectsFactory) {
        $scope.project = {name: "", depscription: "", createdDate:""}
        $scope.addNew = function(){
            ProjectsFactory.save($scope.project);
            $scope.project = {name: "", depscription: "", createdDate:""}
            window.location = 'index.jsp';
        };
}]);

var services = angular.module('OpenDFApp.services', ['ngResource']);

services.factory('ProjectsFactory', function ($resource) {
    return $resource('api/project/:id', {}, {})
});
