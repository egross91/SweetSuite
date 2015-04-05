'use strict';

angular.module('sweetSuiteApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('admin/users', {
        url: '/admin/users',
        templateUrl: 'app/admin/users/admin.users.html',
        controller: 'AdminUsersCtrl',
        authenticate: true
      })
      .state('admin/todos', {
        url: '/admin/todos',
        templateUrl: 'app/admin/todos/admin.todos.html',
        controller: 'AdminTodosCtrl',
        authenticate: true
      })

      .state('admin/maids', {
        url: '/admin/maids',
        templateUrl: 'app/admin/maids/admin.maids.html',
        controller: 'AdminMaidsCtrl',
        authenticate: true
      });
  });
