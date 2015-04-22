'use strict';

angular.module('sweetSuiteApp')
  .controller('AdminMaidsCtrl', function ($scope, $http, Auth, User) {
  	
  	$scope.maids = User.query();
    $scope.errors = {};

    $scope.addClient = function(maid, newClient){
    	/*
		*
    	Idea was to use localStorage variables to keep track of the email
    	addresses of clients associated to a maid, but currently unable to
    	get it working
		*
    	*/

    	/*
    	var maidEmail = maid.email;
    	var temp = localStorage[maidEmail];
    	localStorage[maidEmail] = temp + | + newClient;
		*/

    };

  });
