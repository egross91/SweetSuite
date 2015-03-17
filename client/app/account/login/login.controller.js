'use strict';

angular.module('sweetSuiteApp')
  .controller('LoginCtrl', function ($scope, Auth, $location, $window) {
    $scope.user = {};
    $scope.errors = {};

    $scope.login = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        Auth.login({
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then( function() {
          Auth.isLoggedInAsync(function(isLoggedIn) {
            if (isLoggedIn) {
              if (Auth.isAdmin()) {
                $location.url('/admin/users');
              }
              else if(Auth.isMaid()){
                $location.url('/maid');
              }
              else {
                // Logged in, redirect to home
                $location.url('/client');
              }
            }
          });
        })
        .catch( function(err) {
          $scope.errors.other = err.message;
        });
      }
    };

    $scope.loginOauth = function(provider) {
      $window.location.href = '/auth/' + provider;
    };
  });
