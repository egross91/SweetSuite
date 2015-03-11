'use strict';

angular.module('sweetSuiteApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('admin', {
        url: '/admin/users',
        templateUrl: 'app/admin/users/admin.users.html',
        controller: 'AdminCtrl',
        authenticate: true
      });
  });
