'use strict';

angular.module('sweetSuiteApp')
  .controller('AdminTodosCtrl', function ($scope, $http, $rootScope, Auth, User) {

    /**
     * PRIVATE API
     */
    var filterByRole = function(users, role) {
      var roleUsers = [];

      angular.forEach(users, function(u) {
        if (u.role === role) {
          roleUsers.push(u);
        }
      });

      $rootScope.$broadcast('setClients', roleUsers);
    };

    User.query().$promise.then(function(users) {
      filterByRole(users, 'user');
    });
  });
