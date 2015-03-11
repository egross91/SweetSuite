'use strict';

angular.module('sweetSuiteApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('ClientHome', {
        url: '/client',
        templateUrl: 'app/home/client/client.html',
        controller: 'ClientCtrl',
        authenticate: true
      })
      .state('MaidHome', {
        url: '/maid',
        templateUrl: 'app/home/maid/maid.html',
        controller: 'MaidCtrl',
        authenticate: true
    });
  });
