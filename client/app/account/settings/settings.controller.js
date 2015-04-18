'use strict';

angular.module('sweetSuiteApp')
  .controller('SettingsCtrl', function ($scope, User, Auth) {
    $scope.errors = {};

    $scope.changePassword = function(form) {
      $scope.submitted = true;
      if(form.$valid) {
        if($scope.user.confirmNewPassword != $scope.user.newPassword) {
          form.password.$setValidity('mongoose', false);
          $scope.message = 'Passwords Do Not Match';
          $scope.errors.other = '';
        }
        else {
          Auth.changePassword( $scope.user.oldPassword, $scope.user.newPassword )
            .then( function() {
              $scope.message = 'Password Successfully Changed';
              $scope.newPassword = '';
            })
            .catch( function() {
              form.password.$setValidity('mongoose', false);
              $scope.message = 'Incorrect Password';
              $scope.errors.other = '';
            });
        }
      }
		};
  });
