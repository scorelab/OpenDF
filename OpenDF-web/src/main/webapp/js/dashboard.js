
var OpenDFApp = angular.module('OpenDFApp', ['ngRoute' ,'OpenDFApp.services', 'angularFileUpload']);

OpenDFApp.value("sectionTitle" , "Dashboard");

OpenDFApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/:idProject/file-system', {
            templateUrl: 'templates/dashboard/file-system.htm',
            controller: ''
        }).
        when('/:idProject/bookmarks', {
            templateUrl: 'templates/dashboard/bookmarks.htm',
            controller: ''
        }).
        when('/:idProject/browse-by-hierarchy/:idFile', {
            templateUrl: 'templates/dashboard/browse-by-hierarchy.htm',
            controller: 'filesController'
        })
        .when('/:idProject/browse-by-type/', {
            templateUrl: 'templates/dashboard/browse-by-type-select.htm',
            controller: ''
        })
        .when('/:idProject/browse-by-type/:type', {
            templateUrl: 'templates/dashboard/browse-by-type.htm',
            controller: 'filesController'
        }).
        when('/:idProject/reports', {
            templateUrl: 'templates/dashboard/reports.htm',
            controller: 'reportsController'
        }).
        when('/:idProject/report/:id', {
            templateUrl: 'templates/dashboard/report.htm',
            controller: 'reportsController'
        }).
        when('/:idProject/disk-images', {
            templateUrl: 'templates/dashboard/disk-images.htm',
            controller: 'diskImagesController'
        }).
        when('/:idProject/disk-images/add-new', {
            templateUrl: 'templates/dashboard/disk-images-add-new.htm',
            controller: 'diskImagesController'
        }).
        when('/:idProject/settings/modules', {
            templateUrl: 'templates/dashboard/settings/modules.htm',
            controller: ''
        }).
        when('/:idProject/settings/investigators', {
            templateUrl: 'templates/dashboard/settings/investigators.htm',
            controller: 'investigatorsController'
        }).
        when('/:idProject/settings/add-investigators', {
            templateUrl: 'templates/dashboard/settings/add-investigators.htm',
            controller: 'investigatorsController'
        }).
        when('/:idProject/settings/project', {
            templateUrl: 'templates/dashboard/settings/project.htm',
            controller: ''
        }).
        when('/:idProject', {
            templateUrl: 'templates/dashboard/dashboard.htm',
            controller: 'dashboardController'
        }).
        otherwise({
            redirectTo: '/'
        });
    }]);
OpenDFApp.controller('dashboardController', ['$scope', '$location', '$routeParams','ProjectsFactory', 'BackboneService', '$rootScope' , function ($scope, $location, $routeParams, ProjectsFactory, BackboneService, $rootScope) {
        BackboneService.id = $routeParams.idProject;
        $rootScope.idProject = $routeParams.idProject;
        ProjectsFactory.get({ id: $routeParams.idProject }, function(data) {
            $scope.project = data;
            console.log($scope.project.idProject);
        }); 
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

OpenDFApp.controller('diskImagesController', ['$scope', 'DiskImagesFactory', '$location', '$routeParams', '$http', 'BackboneService' , function ($scope,  DiskImagesFactory, $location, $routeParams, $http,BackboneService) {
        $scope.diskImages =  BackboneService.diskImages;
        $scope.uploadingDiskImages = BackboneService.uploadingDiskImages;
        DiskImagesFactory.getDiskImages({ id: BackboneService.id || $routeParams.idProject }, function(diskImages){
            BackboneService.diskImages = diskImages;
            $scope.diskImages = BackboneService.diskImages;
        });
        $scope.addNew = function(){
           //BackboneService.prosecces.push({ name: "File uploading", percentage:10});
        }
        $scope.startAnalyzing = function(index){
           console.log(index);
           BackboneService.diskImages[index].idDiskImage.state = "Analyzing";
           var process = BackboneService.addProcess({ name: "Analyzing "+BackboneService.diskImages[index].name, percentage: 0});
           $http.get("api/diskimage/startAnalyzing/"+BackboneService.diskImages[index].idDiskImage);
           $http.get('Work/SheduleWork?id='+BackboneService.diskImages[index].idDiskImage);
        }

}]);


OpenDFApp.controller('diskImageController', ['$scope', '$rootScope', 'DiskImagesFactory', '$location', 'BackboneService' , '$upload', function ($scope, $rootScope, DiskImagesFactory, $location, BackboneService , $upload) {
        $scope.diskImage = {name: "", depscription: "", createdDate:"", type: "",  size: ""};
        $scope.file = {};
        $scope.states = ['Uploading', 'Uploaded', 'Analyzed'];
        $scope.addNew = function(){
            $scope.diskImage.projectidProject = { idProject : parseInt($rootScope.idProject) };
            $scope.diskImage.state = "Uploading";
            var key = $.now();
            BackboneService.uploadingDiskImages[key] = $scope.diskImage;
            console.log(BackboneService.uploadingDiskImages);
            var process = BackboneService.addProcess({ name: "File uploading1", percentage: 0});
            $location.path($rootScope.idProject+'/disk-images');
            $upload.upload({
                url: 'DiskImageUpload', //upload.php script, node.js route, or servlet url
                method: 'POST',
//                //headers: {'header-key': 'header-value'},
//                //withCredentials: true,
                data: { name: $scope.diskImage.name,
                        description: $scope.diskImage.description,
                        createdDate: $scope.diskImage.createdDate,
                        idProject: $scope.diskImage.projectidProject.idProject } ,
                file: $scope.file
              }).progress(function(evt) {
                var p = parseInt(100.0 * evt.loaded / evt.total);
                console.log('percent: ' + p);
                if(p==100){
                    BackboneService.prosecces[process] = { name: "File uploaded, Assembling ", percentage:parseInt(100.0 * evt.loaded / evt.total)};
                    $scope.diskImage.state = "Assembling...";
                }
                else{
                    BackboneService.prosecces[process] = { name: "File uploading", percentage:parseInt(100.0 * evt.loaded / evt.total)};
                    $scope.diskImage.state = "Uploading ["+parseInt(100.0 * evt.loaded / evt.total)+"%]";
                }
              }).success(function(response, status, headers, config) {
                BackboneService.prosecces[process] = { name: "File uploaded", percentage:100};
                BackboneService.stopProcess(process);
                
                console.log(response);
                if(!response['error']){
                    $scope.diskImage.path = response['file'];
                    DiskImagesFactory.save($scope.diskImage, function(){
                        
                        
                        DiskImagesFactory.getDiskImages({ id: BackboneService.id || $routeParams.idProject }, function(diskImages){
                            $scope.diskImage.state = "Uploaded";
                            delete BackboneService.uploadingDiskImages[key];
                            console.log(BackboneService.uploadingDiskImages);
                            $scope.$apply(function(){
                                BackboneService.diskImages = diskImages;
                            });
                            //$scope.$apply();
                        });
                    });
                }
              });
        }

}]);


OpenDFApp.controller('notificationsController', ['$scope', 'NotificationsFactory', '$location', 'BackboneService' , function ($scope,  DiskImagesFactory, $location, BackboneService) {
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
    kernel = {};
    kernel.id = -1;
    kernel.notifications = [{createdDate:"",last_visted:"",agent:""}]
    kernel.prosecces = {};
    kernel.notes = [];
    kernel.activeProsecces = 0;
    kernel.diskImages = [];
    kernel.uploadingDiskImages = {};
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

services.factory('ProjectsFactory', function ($resource) {
    return $resource('api/project/:id', { id: '@_id' }, {
        update: {method: 'PUT'}
    });
});
services.factory('DiskImagesFactory', function ($resource) {
    return $resource('api/diskimage/:id', {id: '@_id'}, {
            getDiskImages: {
                method: 'GET',
                url : 'api/project/:id/diskImages',
                params : { id: '@_id' },
                isArray : true
            },
            getFile: {
                method: 'GET',
                url : 'api/project/:id/file/:idFile',
                params : { id: '@_id', file: '@_idFile' },
                isArray : false
            },
            getFileByType: {
                method: 'GET',
                url : 'api/project/:id/files/type/:type',
                params : { id: '@_id', file: '@_type' },
                isArray : true
            }
        })
});
OpenDFApp.controller('investigatorsController', ['$scope', '$location', '$routeParams', '$http', 'InvestigatorsFactory', function ($scope, $location, $routeParams, $http, InvestigatorsFactory) {
        console.log('investigatorsController');
        InvestigatorsFactory.investigators({ id: $routeParams.idProject }, function(data) {
            $scope.investigators = data;
        }); 
        $scope.otherInvestigators = function (){
            return InvestigatorsFactory.otherInvestigators({ id: $routeParams.idProject }); 
        }
        $scope.addInvestigator = function(idUser){
            $http.get('api/project/'+$routeParams.idProject+'/add-investigator?user='+idUser);
        }
        $scope.removeInvestigator = function(idUser){
            $http.get('api/project/'+$routeParams.idProject+'/remove-investigator?user='+idUser);
        }
}]);
services.factory('InvestigatorsFactory', function ($resource) {
    return $resource('api/user/:id', {id: '@_id'}, {
            investigators: {
                method: 'GET',
                url : 'api/project/:id/investigators',
                params : { id: '@_id' },
                isArray : true
            },
            otherInvestigators: {
                method: 'GET',
                url : 'api/project/:id/other-investigators',
                params : { id: '@_id' },
                isArray : true
            },
        })
});
OpenDFApp.controller('filesController', ['$scope', '$location', '$routeParams' , 'DiskImagesFactory', function ($scope, $location, $routeParams, DiskImagesFactory) {
       
        $scope.getFilesByHierarchy = function(){
            DiskImagesFactory.getFile({ id: $routeParams.idProject,  idFile: $routeParams.idFile  }, function(data) {
                        console.log(data);
                        $scope.file = data; 
            });
        }   
        $scope.getFilesByType = function(){
            DiskImagesFactory.getFileByType({ id: $routeParams.idProject,  type: $routeParams.type  }, function(data) {
                    console.log(data);
                    $scope.files = data; 
            });
        }
        
}]);
services.factory('filesFactory', function ($resource) {
    return $resource('api/projects/:id/files/', {id: '@_id'}, {})
});
OpenDFApp.controller('reportsController', ['$scope', '$location', '$routeParams' , function ($scope, $location, $routeParams) {
        $scope.reports = [{title: "Current Progress Report", date: new Date() ,description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eleifend"},{title: "Current Progress Report", date: new Date(1411436124013) ,description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eleifend"}, {title: "Current Progress Report", date: new Date(1411234124013), description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eleifend"}];
}]);
services.factory('reportsFactory', function ($resource) {
    return $resource('api/projects/:id/reports', {id: '@_id'}, {})
});


services.factory('notesFactory', function ($resource) {
    return $resource('api/notes/:id', {}, {})
});

services.factory('NotificationsFactory', function ($resource) {
    var notifications = [];
                        
    return notifications;
});


OpenDFApp.controller('NotificationController', ['$scope', 'NotificationFactory' , function ($scope,  NotificationFactory) {
        //$scope.notifications = NotificationFactory;
}]);

services.factory('NotificationFactory', function ($resource) {
    var notifications = [   {new_comments:[{type:'New Comments',quantity:'200',time:'100'}]},
                            {new_follwers:[{type:'New Followers',quantity:'2',time:'15'}]},
                            {sent_messages:[{type:'Messages Sent',quantity:'3',time:'10'}]},
                            {new_task:[{type:'New Task',quantity:'3',time:'10'}]},
                            {sever_rebooted:[{type:'Server Rebooted',quantity:'3',time:'10'}]}
                        ];
                        
    return notifications;
});

OpenDFApp.controller('projectController', ['$scope', 'ProjectsFactory' , '$routeParams', function ($scope, ProjectsFactory, $routeParams) {
        ProjectsFactory.get({ id: $routeParams.idProject }, function(data) {
            $scope.project = data;
            $scope.update = function(){
                ProjectsFactory.update($scope.project);
                window.location = 'dashboard.jsp#'+$scope.project.idProject;
            };
        }); 
        
}]);

OpenDFApp.run(function($rootScope) {
        $rootScope.sectionTitle = OpenDFApp.value("sectionTitle");
        T = OpenDFApp.value("sectionTitle");
        $rootScope.$today = function(){ return new Date(); }
});



