'use strict';
(function(){
  const app = angular.module('bluuitApp');

  app.config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'home.html',
        controller: 'topicController',
        controllerAs: 'tCtrl'
      })
      .when('/login', {
        templateUrl: 'login.html',
        controller: 'AuthCtrl',
        controllerAs: 'authCtrl'
      })
      .when('/register', {
        templateUrl: 'registration.html',
        controller: 'RegCtrl',
        controllerAs: 'regCtrl'
      });
  });
})();
