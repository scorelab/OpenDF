var OpenDFApp = angular.module('OpenDFApp', ['ngRoute' ,'OpenDFApp.services', 'angularFileUpload']);

OpenDFApp.value("sectionTitle" , "Dashboard");

OpenDFApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/', {
            templateUrl: 'templates/dashboard/dashboard.htm',
            controller: 'dashboardController'
        }).
        when('/file-system', {
            templateUrl: 'templates/dashboard/file-system.htm',
            controller: ''
        }).
        when('/bookmarks', {
            templateUrl: 'templates/dashboard/bookmarks.htm',
            controller: ''
        }).
        when('/disk-images', {
            templateUrl: 'templates/dashboard/disk-images.htm',
            controller: 'diskImagesController'
        }).
        when('/disk-images/add-new', {
            templateUrl: 'templates/dashboard/disk-images-add-new.htm',
            controller: 'diskImagesController'
        }).
        when('/:id/:title', {
            templateUrl: 'templates/dashboard/dashboard.htm',
            controller: 'dashboardController'
        }).
        otherwise({
            redirectTo: '/'
        });
    }]);
OpenDFApp.controller('dashboardController', ['$scope', '$location', '$routeParams' , function ($scope, $location, $routeParams) {
        OpenDFApp.value("sectionTitle" , "Dashboard!");
        sectionTitle = "Dashboard!";
}]);
OpenDFApp.controller('processesController', ['$scope', '$location' , 'BackboneService', function ($scope, $location, BackboneService) {
        $scope.processes = BackboneService.prosecces;
        $scope.activeProsecces = BackboneService.activeProsecces;
        P = $scope.processes;
        $scope.isEmpty = function () {
            return angular.equals({},$scope.processes); 
        };
        
        $scope.activeProsecces = BackboneService.activeProsecces;
}]);

OpenDFApp.controller('diskImagesController', ['$scope', 'DiskImagesFactory', '$location', 'BackboneService' , function ($scope,  DiskImagesFactory, $location, BackboneService) {
        $scope.diskImages =  BackboneService.diskImages;
        $scope.addNew = function(){
           //BackboneService.prosecces.push({ name: "File uploading", percentage:10});
        }
        $scope.startAnalyzing = function(diskImageID){
           BackboneService.diskImages[diskImageID].state = "Analyzing";
           var process = BackboneService.addProcess({ name: "Analyzing "+BackboneService.diskImages[diskImageID].name, percentage: 0});
        }

}]);


OpenDFApp.controller('diskImageController', ['$scope', 'DiskImagesFactory', '$location', 'BackboneService' , '$upload', function ($scope,  DiskImagesFactory, $location, BackboneService , $upload) {
        $scope.diskImage = {name: "", depscription: "", createdDate:"", type: "",  size: ""};
        $scope.file = {};
        $scope.addNew = function(){
            $scope.diskImage.state = "Uploading";
            BackboneService.diskImages.push($scope.diskImage);
            var process = BackboneService.addProcess({ name: "File uploading1", percentage: 0});
            $location.path('/disk-images');
            $upload.upload({
                url: '/OpenDF-web/DiskImageUpload', //upload.php script, node.js route, or servlet url
//                //method: 'POST' or 'PUT',
//                //headers: {'header-key': 'header-value'},
//                //withCredentials: true,
                data: {myObj: $scope.diskImage },
                file: $scope.file
              }).progress(function(evt) {
                var p = parseInt(100.0 * evt.loaded / evt.total);
                console.log('percent: ' + p);
                if(p==100){
                    BackboneService.prosecces[process] = { name: "File uploaded, Assembling ", percentage:parseInt(100.0 * evt.loaded / evt.total)};
                    $scope.diskImage.state = "Assembling";
                }
                else{
                    BackboneService.prosecces[process] = { name: "File uploading", percentage:parseInt(100.0 * evt.loaded / evt.total)};
                }
              }).success(function(data, status, headers, config) {
                BackboneService.prosecces[process] = { name: "File uploaded", percentage:100};
                BackboneService.stopProcess(process);
                $scope.diskImage.state = "Uploaded";
                //console.log(data);
              });
        }

}]);

OpenDFApp.controller('notificationsController', ['$scope', 'notificationsFactory ', '$location', 'BackboneService' , function ($scope,  DiskImagesFactory, $location, BackboneService) {
        $scope.diskImage = {name: "", depscription: "", createdDate:"", type: "",  size: ""};
        $scope.addNew = function(){
            BackboneService.diskImages.push($scope.diskImage);
            BackboneService.prosecces.push({ name: "File uploading", percentage:10});
            $location.path('/disk-images');
        }

}]);

OpenDFApp.controller('noteController', ['$scope', 'notesFactory', 'BackboneService' , function ($scope,  notesFactory, BackboneService) {
        $scope.note = {name: "", description: "", createdDate:""};
        $scope.note.name = "";
        $scope.note.description = "";
        $scope.note.createdDate =  new Date();
        $scope.send = function(){
            BackboneService.notes.push($scope.note);
        }
}]);
OpenDFApp.controller('notesController', ['$scope', 'notesFactory','BackboneService' , function ($scope,  notesFactory, BackboneService) {
        $scope.notes = BackboneService.notes;
        console.log($scope.notes);
}]);

var services = angular.module('OpenDFApp.services', ['ngResource']);
services.factory('BackboneService', function ($rootScope) {
    var kernel = {};
    kernel.prosecces = {};
    kernel.notes = [];
    kernel.activeProsecces = 0;
    kernel.diskImages = [{name: "Megatron Server", type: "NTFS", size: "1TB", state: "Analized"}, {name: "Mac Book Air", type: "ext4", size: "500GB", state: "Uploaded"}];
    kernel.addProcess = function(obj){
        var processID = 'p'+$.now();
        kernel.prosecces[processID] = obj;
        kernel.activeProsecces = kernel.activeProsecces + 1;
        return processID;
    }
    kernel.stopProcess = function(obj, processID){
        delete kernel.prosecces[processID];
        kernel.activeProsecces = kernel.activeProsecces - 1;
    }
    return kernel;
});
services.factory('DiskImagesFactory', function ($resource) {
    return $resource('api/projects/:id/diskImages', {}, {})
});

services.factory('notesFactory', function ($resource) {
    return $resource('api/notes/:id', {}, {})
});

OpenDFApp.run(function($rootScope) {
        $rootScope.sectionTitle = OpenDFApp.value("sectionTitle");
        T = OpenDFApp.value("sectionTitle");
        $rootScope.$today = function(){ return new Date(); }
        
    });


