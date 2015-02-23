'use strict';

angular.module('sweetSuiteApp')
  .controller('ClientCtrl', function ($scope, socket, $http, Modal) {
    $scope.awesomeThings = [];
    $scope.showTodoExampleImage = false;
    $scope.showTodoExample = false;
    $scope.showModal = true;

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
      socket.syncUpdates('thing', $scope.awesomeThings);
    });

    $scope.addThing = function() {
      if($scope.newThing === undefined || $scope.newThing === '') {
        return;
      }
      $http.post('/api/things', { name: $scope.newThing });
      $scope.newThing = '';
    };

    $scope.displayThingInfo = function(thing, size) {
      if ($scope.showModal) {
        Modal.edit.view(thing, size).apply();
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
      // If the user clicked the 'delete x,' then don't show the modal.
      $scope.showModal = false;

      $http.delete('/api/things/' + thing._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
    });
  });
