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