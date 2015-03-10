'use strict';

angular.module('sweetSuiteApp')
  .controller('AdminCtrl', function ($scope, $http, Auth, User) {

    // Store the admin that is currently viewing the page
    $scope.me = User.get();
    // Use the User $resource to fetch all users
    $scope.users = User.query();

    $scope.delete = function(user) {
      User.remove({ id: user._id });
      angular.forEach($scope.users, function(u, i) {
        if (u === user) {
          $scope.users.splice(i, 1);
        }
      });
    };

    $scope.isAdmin = function(user) {
      return user.role === 'admin';
    };

    $scope.isCurrentUser = function(user) {
      return user.email === $scope.me.email;
    }
  });
