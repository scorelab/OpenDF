function changePassword(data){
    console.log(data);
    $.post("api/user/change/password", data, function(){ alert("Password is successfully changed"); });
}
function changeUsername(data){
    console.log(data);
    $.post("api/user/change/username", data, function(){ alert("Username is successfully changed");  });
}
function changeDisplayName(data){
    console.log(data);
    $.post("api/user/change/displayname", data, function(){ alert("Display Name is successfully changed");  });
}
function changeEmail(data){
    console.log(data);
    $.post("api/user/change/email", data, function(){ alert("Email is successfully changed");  });
}
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

OpenDFApp.controller('userController', ['$scope','$rootScope', 'UserFactory', '$location' , function ($scope, $rootScope,  UserFactory, $location) {

        UserFactory.current(function(data) {
           $scope.user = data;
           $rootScope.user = data;
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
OpenDFApp.controller('logsController', ['$scope', 'LogsFactory', function ($scope, LogsFactory) {

        LogsFactory.query(function(data){
            $scope.logs = data;
        });
}]);
OpenDFApp.controller('investigatorController', ['$scope', 'InvestigatorsFactory', function ($scope, InvestigatorsFactory) {

        $scope.investigator = {};
        $scope.save = function(){
            if($scope.investigator.password == $scope.investigator.repassword){
                InvestigatorsFactory.save($scope.investigator, function(){
                    window.location = '#/investigators';
                });
            }
            else{
                alert("Passwords you enter are not same");
            }

            
        };
}]);
OpenDFApp.controller('investigatorsController', ['$scope', 'InvestigatorsFactory', function ($scope, InvestigatorsFactory) {

        InvestigatorsFactory.query(function(data) {
           $scope.investigators = data;
        });
}]);

var services = angular.module('OpenDFApp.services', ['ngResource']);

services.factory('ProjectsFactory', function ($resource) {
    return $resource('api/project/:id', {id: '@_id'}, {});
});
services.factory('InvestigatorsFactory', function ($resource) {
    return $resource('api/user/:id', {id: '@_id'}, {});
});
services.factory('LogsFactory', function ($resource) {
    return $resource('api/log/:id', {id: '@_id'}, {});
})
services.factory('UserFactory', function ($resource) {
    return $resource('api/user/:id', {id: '@_id'}, {
            current: {
                method: 'GET',
                url : 'api/user/current'
            }});
});
