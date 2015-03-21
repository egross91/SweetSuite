'use strict';

angular.module('sweetSuiteApp')
  .controller('ListsCtrl', function($scope, $location, $anchorScroll, Modal, _, Auth, ListValidation) {
    $scope.clients = [];

    $scope.$on('setClients', function(events, arg) {
      $scope.clients = arg;
    });

    /**
     * PRIVATE API
     */
    var anchor = function(aref) {
      if ($location.hash() !== aref) {
        $location.hash(aref);
      } else {
        $anchorScroll();
      }
    };

    /**
     * PUBLIC API
     */
    $scope.addTodo = function(clientIndex, listIndex, newTodo, priority) {
      // Check for duplicates
      if (ListValidation.containsDuplicates($scope.clients[clientIndex].lists[listIndex].todos, newTodo, 'name')) {
        alert('No Duplicates');
        return;
      }
      if(ListValidation.isFalsy(newTodo)) {
        alert("You didn't enter anything");
        return;
      }

      $scope.clients[clientIndex].lists[listIndex].todos.push({ name: newTodo, info: '', priority: priority });
      Auth.updateUserLists($scope.clients[clientIndex], $scope.clients[clientIndex].lists);
    };

    $scope.createNewTodoList = function() {
      Modal.edit.create(function(listName) {
        var verifyName = listName.replace(/\n54+/g,'').trim();
        if (ListValidation.isFalsy(verifyName) || ListValidation.containsDuplicates($scope.client.lists, verifyName, 'title')) {
          alert('No Duplicates!');
          return;
        }
        $scope.client.lists.push({ title: verifyName, todos: [] });
        //Auth.updateUserLists($scope.clients[clientIndex], $scope.clients[clientIndex].lists);
      }).apply();
    };

    $scope.displayTodoInfo = function(clientIndex, listIndex, todoIndex, size) {
      // Show the modal if user didn't click the delete 'x'.
      if ($scope.showModal) {
        // Callback function to grab the text from the modal and store it into the appropriate thing.
        Modal.edit.todo(function(todoDesc, todoName) {
          $scope.clients[clientIndex].lists[listIndex].todos[todoIndex].info = todoDesc;
        }, $scope.clients[clientIndex].lists[listIndex].todos[todoIndex], size).apply();
      }

      // Bit flag to show the modal or not. Kinda hacky, ain't gonna lie.
      $scope.showModal = true;
    };

    $scope.deleteList = function(clientIndex, listIndex) {
      $scope.clients[clientIndex].lists.splice(listIndex, 1);
      Auth.updateUserLists($scope.clients[clientIndex], $scope.clients[clientIndex].lists);
    };

    $scope.deleteTodo = function(clientIndex, listIndex, todoIndex) {
      $scope.clients[clientIndex].lists[listIndex].todos.splice(todoIndex, 1);
      Auth.updateUserLists($scope.clients[clientIndex], $scope.clients[clientIndex].lists);
    };

    $scope.focusUser = function(name) {
      var aref = 'user' + name;
      anchor(aref);
    };

    $scope.focusList = function(user, name) {
      var aref = 'todoList' + user + name;
      anchor(aref);
    };
  });
