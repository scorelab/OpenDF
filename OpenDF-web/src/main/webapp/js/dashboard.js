var OpenDFApp = angular.module('OpenDFApp', ['ngRoute' ,'OpenDFApp.services']);

OpenDFApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/', {
            templateUrl: 'templates/dashboard/dashboard.htm',
            controller: 'dashboardController'
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
        $scope.diskImages = [{name: "Megatron Server", type: "NTFS", size: "1TB"}, {name: "Mac Book Air", type: "ext4", size: "500GB"}];
        $scope.addNew = function(){
            BackboneService.prosecces.push({ name: "File uploading", percentage:10});
        }

}]);

var services = angular.module('OpenDFApp.services', ['ngResource']);
services.factory('BackboneService', function ($rootScope) {
    var kernel = {};
    kernel.prosecces = [{ name: "File uploading", percentage:40}, { name: "Image processing", percentage:70}];
    return kernel;
});
services.factory('DiskImagesFactory', function ($resource) {
    return $resource('api/projects/:id/diskImages', {}, {})
});
