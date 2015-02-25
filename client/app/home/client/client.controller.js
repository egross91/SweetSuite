'use strict';

angular.module('sweetSuiteApp')
  .controller('ClientCtrl', function ($scope, socket, $http, Modal, _) {
    $scope.awesomeThings = [];
    $scope.showTodoExampleImage = false;
    $scope.showTodoExample = false;
    $scope.showModal = true;

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
      socket.syncUpdates('thing', $scope.awesomeThings);
    });

    $scope.addThing = function() {
      // Check for duplicates
      if ($scope.containsDuplicates($scope.newThing)) {
        return;
      }
      if($scope.newThing === undefined || $scope.newThing === '') {
        return;
      }
      $http.post('/api/things', { name: $scope.newThing });
      $scope.newThing = '';
    };

    $scope.displayThingInfo = function(thing, size) {
      // Show the modal if user didn't click the delete 'x'.
      if ($scope.showModal) {
        // Callback function to grab the text from the modal and store it into the appropriate thing.
        Modal.edit.view(function(event) {
          thing.info = event;
        }, thing, size).apply();
      }

      // Bit flag to show the modal or not. Kinda hacky, ain't gonna lie.
      $scope.showModal = true;
    };

    $scope.toggleTodoExampleImage = function() {
      $scope.showTodoExampleImage = !$scope.showTodoExampleImage;
    };

    $scope.toggleTodoExample = function() {
      $scope.showTodoExample = !$scope.showTodoExample;
    };

    $scope.hideExampleLists = function() {
      $scope.showTodoExampleImage = false;
      $scope.showTodoExample = false;
    };

    $scope.deleteThing = function(thing) {
      // If the user clicked the delete 'x,' then don't show the modal.
      $scope.showModal = false;

      $http.delete('/api/things/' + thing._id);
      --$scope.thingCount;
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
    });

    $scope.containsDuplicates = function(name) {
      var names = _.pluck($scope.awesomeThings, 'name');
      var ii;

      for (ii = 0; ii < names.length; ++ii) {
        if (name === names[ii]) {
          return true;
        }
      }

      return false;
    }
  });
