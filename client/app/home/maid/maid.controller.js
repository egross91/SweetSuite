'use strict';

angular.module('sweetSuiteApp')
  .controller('MaidCtrl', function ($scope, socket, $http, Modal, _, User, $location, $anchorScroll, Auth) {
    $scope.client = User.get();
    $scope.showUsers = !$scope.showUsers;

    $scope.toggleUserList = function() {
      $scope.showUsers = !$scope.showUsers;
      //should list all users linked to the maid.
      //I believe admins must assign the user to maid.
    }
    $scope.showUserList = function(user) {
      // don't do anything if no user
      if(user==undefined)
        return;

      // otherwise let's display this user's list
    }
    //**Needs to be implemented**//

    //After the maid can toggle its userList, it should be able to click on a user
    //and view that users active list(The user may have various list but may only wish to
    //display some to the maid(the ones that he/she needs to accomplish
    //The maid may then view the lists and check off the tasks as done
  });
