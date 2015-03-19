'use strict';

angular.module('sweetSuiteApp')
  .controller('ClientCtrl', function ($scope, socket, $http, Modal, _, User, $location, $anchorScroll, Auth) {
    $scope.client = User.get();
    $scope.showTodoExampleImage = false;
    $scope.showTodoExample = false;
    $scope.showModal = true;

    var containsDuplicates = function(list, name, prop) {
      var names = _.pluck(list, prop)
        , ii;

      for (ii = 0; ii < names.length; ++ii) {
        if (name === names[ii]) {
          return true;
        }
      }

      return false;
    };

    $scope.addTodo = function(list, newTodo) {
      // Check for duplicates
      if (containsDuplicates(list.todos, newTodo, 'name')) {
        alert('No Duplicates');
        return;
      }
      if(newTodo === undefined || newTodo === '') {
        alert("You didn't enter anything");
        return;
      }

      list.todos.push({ name: newTodo, info: '' });
    };

    $scope.createNewTodoList = function() {
      Modal.edit.create(function(listName) {
        var verifyName = listName.replace(/\n54+/g,'').trim();
        if (verifyName === '' || containsDuplicates($scope.client.lists, verifyName, 'title')) {
          alert('No Duplicates!');
          return;
        }

        $scope.client.lists.push({ title: verifyName, todos: [] });
      }).apply();
    };

    $scope.displayThingInfo = function(thing, size) {
      // Show the modal if user didn't click the delete 'x'.
      if ($scope.showModal) {
        // Callback function to grab the text from the modal and store it into the appropriate thing.
        Modal.edit.todo(function(todoDesc, todoName) {
          thing.info = todoDesc;
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

    $scope.deleteList = function(list) {
      angular.forEach($scope.client.lists, function(l, i) {
        if (list.$$hashKey === l.$$hashKey) {
          $scope.client.lists.splice(i, 1);
        }
      });
    };

    $scope.deleteTodo = function(list, todo) {
      // If the user clicked the delete 'x,' then don't show the modal.
      $scope.showModal = false;
      angular.forEach(list.todos, function(t, i) {
        if (todo.$$hashKey === t.$$hashKey) {
          list.todos.splice(i, 1);
        }
      });
    };

    $scope.focusList = function(title) {
      var aref = 'todoList' + title;
      if ($location.hash() !== aref) {
        $location.hash(aref);
      } else {
        $anchorScroll();
      }
    };

    $scope.saveChanges = function() {
      Auth.updateUserLists(Auth.getCurrentUser(), $scope.client.lists);
    }
  });
