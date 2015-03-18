'use strict';

angular.module('sweetSuiteApp')
  .controller('AdminTodosCtrl', function ($scope, $http, Auth, User, _, $location, $anchorScroll) {
    /**
     * PRIVATE API
     */
    var anchor = function(aref) {
      if ($location.hash() !== aref) {
        $location.hash(aref);
      } else {
        $anchorScroll();
      }
    };

    var filterByRole = function(users, role) {
      var roleUsers = [];

      angular.forEach(users, function(u) {
        if (u.role === role) {
          roleUsers.push(u);
        }
      });

      $scope.clients = roleUsers;
    };

    /**
     * CONTROLLER PROPERTIES
     */
    $scope.clients = User.query().$promise.then(function(users) {
      filterByRole(users, 'user');
    });

    /**
     * PUBLIC API
     */
    $scope.deleteList = function(client, list) {
      angular.forEach(list.todos, function(l, i) {
        // TODO
      });
    };

    $scope.focusUser = function(name) {
      var aref = 'user' + name;
      anchor(aref);
    };

    $scope.focusList = function(user, name) {
      var aref = 'todoList' + user + name;
      anchor(aref);
    };
  });
