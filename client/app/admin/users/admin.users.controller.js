'use strict';

angular.module('sweetSuiteApp')
  .controller('AdminUsersCtrl', function ($scope, $http, Auth, User) {

    // Store the admin that is currently viewing the page
    $scope.me = User.get();
    // Use the User $resource to fetch all users
    $scope.users = User.query();
    $scope.errors = {};

    /**
     * PRIVATE API
     */
    var changeRole = function(newRole, user) {
      Auth.changeRole(newRole, user)
        .then(function() {
          $scope.message = 'success';
        })
        .catch(function() {
          $scope.errors.others = 'can\'t do dat';
          $scope.message = '';
        });
    };

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
      return user._id === $scope.me._id;
    };

    $scope.makeAdmin = function(user) {
      changeRole('admin', user);
      angular.forEach($scope.users, function(u, i) {
        if (u === user) {
          $scope.users[i].role = 'admin';
        }
      });
    };

    $scope.demoteAdmin = function(admin) {
      changeRole('user', admin);
      angular.forEach($scope.users, function(u, i) {
        if (u === admin) {
          $scope.users[i].role = 'user';
        }
      });
    }
  });
