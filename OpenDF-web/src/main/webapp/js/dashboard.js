var OpenDFApp = angular.module('OpenDFApp', ['ngRoute' ,'OpenDFApp.services', 'angularFileUpload']);

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
        when('/disk-images', {
            templateUrl: 'templates/dashboard/disk-images.htm',
            controller: 'diskImagesController'
        }).
        when('/disk-images/add-new', {
            templateUrl: 'templates/dashboard/disk-images-add-new.htm',
            controller: 'diskImagesController'
        }).
        otherwise({
            redirectTo: '/'
        });
    }]);
OpenDFApp.controller('dashboardController', ['$scope', '$location' , function ($scope, $location) {
        
}]);
OpenDFApp.controller('processesController', ['$scope', '$location' , 'BackboneService', function ($scope, $location, BackboneService) {
        $scope.processes = BackboneService.prosecces;
}]);

OpenDFApp.controller('diskImagesController', ['$scope', 'DiskImagesFactory', '$location', 'BackboneService' , function ($scope,  DiskImagesFactory, $location, BackboneService) {
        $scope.diskImages =  BackboneService.diskImages;
        $scope.addNew = function(){
           //BackboneService.prosecces.push({ name: "File uploading", percentage:10});
        }

}]);


OpenDFApp.controller('diskImageController', ['$scope', 'DiskImagesFactory', '$location', 'BackboneService' , '$upload', function ($scope,  DiskImagesFactory, $location, BackboneService , $upload) {
        $scope.diskImage = {name: "", depscription: "", createdDate:"", type: "",  size: ""};
        $scope.file = {};
        $scope.addNew = function(){
            BackboneService.diskImages.push($scope.diskImage);
            BackboneService.prosecces.push({ name: "File uploaded", percentage: "100"});
            $location.path('/disk-images');
            $upload.upload({
                url: '/OpenDF-web/DiskImageUpload', //upload.php script, node.js route, or servlet url
//                //method: 'POST' or 'PUT',
//                //headers: {'header-key': 'header-value'},
//                //withCredentials: true,
                data: {myObj: $scope.diskImage },
                file: $scope.file
              }).progress(function(evt) {
                console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
              }).success(function(data, status, headers, config) {
                // file is uploaded successfully
                console.log(data);
                
              });
        }

}]);

var services = angular.module('OpenDFApp.services', ['ngResource']);
services.factory('BackboneService', function ($rootScope) {
    var kernel = {};
    kernel.prosecces = [{ name: "Image processing", percentage:70}];
    kernel.diskImages = [{name: "Megatron Server", type: "NTFS", size: "1TB"}, {name: "Mac Book Air", type: "ext4", size: "500GB"}];
    console.log(kernel.diskImages);
    return kernel;
});
services.factory('DiskImagesFactory', function ($resource) {
    return $resource('api/projects/:id/diskImages', {}, {})
});
