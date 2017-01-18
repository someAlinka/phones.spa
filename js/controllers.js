'use strict';

/* Controllers */
var phonecatApp = angular.module('phonecatApp', ['ngRoute', 'ngResource']);

/* Config */
phonecatApp.config([
  '$routeProvider', '$locationProvider',
  function($routeProvide, $locationProvider){
    $routeProvide
        .when('/',{
            templateUrl:'template/home.html',
            controller:'PhoneListCtrl'
        })
        .when('/about',{
            templateUrl:'template/about.html',
            controller:'AboutCtrl'
        })
        .when('/contact',{
            templateUrl:'template/contact.html',
            controller:'ContactCtrl'
        })
        .when('/phones/:phoneId', {
            templateUrl:'template/phone-detail.html',
            controller:'PhoneDetailCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
  }
]);

/* Factory */
phonecatApp.factory('Phone', [
    '$resource', function($resource) {
        return $resource('phones/:phoneId.:format', {
            phoneId: 'phones',
            format: 'json'
        }, {
            update: {method: 'PUT', params: {phoneId: '@phone'}, isArray: true}
        });
    }
]);

/* Filter */
phonecatApp.filter('checkmark', function() {
    return function(input) {
        return input ? '\u2713' : '\u2718';
    }
});

phonecatApp.controller('PhoneListCtrl',[
    '$scope','$http', '$location', 'Phone',
    function($scope, $http, $location, Phone) {

        Phone.query({phoneId: 'phones'}, function(data) {
            $scope.phones = data;
        });
    }
]);

/* About Controller */
phonecatApp.controller('AboutCtrl',[
    '$scope','$http', '$location',
    function($scope, $http, $location) {

    }
]);

/* Contact Controller */
phonecatApp.controller('ContactCtrl',[
    '$scope','$http', '$location',
    function($scope, $http, $location) {

    }
]);

/* Phone Detail Controller */
phonecatApp.controller('PhoneDetailCtrl',[
    '$scope','$http', '$location', '$routeParams', 'Phone',
    function($scope, $http, $location, $routeParams, Phone) {
        $scope.phoneId = $routeParams.phoneId;

        Phone.get({phoneId: $routeParams.phoneId}, function(data) {
            $scope.phone = data;
            $scope.mainImageUrl = data.images[0];
        });

        $scope.setImage = function(imageUrl) {
            $scope.mainImageUrl = imageUrl;
        };
    }
]);


