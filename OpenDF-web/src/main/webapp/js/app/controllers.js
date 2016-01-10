
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