'use strict';

angular.module('sweetSuiteApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth) {
    // Add code here if you want it to show for everyone all the time.
    $scope.menu = [{
      'title': 'Home',
      'link': '/home'
    }];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.isMaid= Auth.isMaid;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
