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
      angular.forEach($scope.clients, function(c, i1) {
        if (client === c) {
          angular.forEach($scope.clients[i1].lists, function(l, i2) {
            if (list.$$hashKey === l.$$hashKey) {
              $scope.clients[i1].lists.splice(i2, 1);
              Auth.updateUserLists(client, $scope.clients[i1].lists);
            }
          });
        }
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
