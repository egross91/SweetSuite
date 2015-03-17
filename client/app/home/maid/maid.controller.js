'use strict';

angular.module('sweetSuiteApp')
  .controller('MaidCtrl', function ($scope, socket, $http, Modal, _, User, $location, $anchorScroll, Auth) {
    $scope.client = User.get();

    $scope.toggleUserList = function(){
      //should list all users linked to the maid.
      //I believe admins must assign the user to maid.
    }
    //**Needs to be implemented**//

    //After the maid can toggle its userList, it should be able to click on a user
    //and view that users active list(The user may have various list but may only wish to
    //display some to the maid(the ones that he/she needs to accomplish
    //The maid may then view the lists and check off the tasks as done.



  });
