'use strict';

angular.module('sweetSuiteApp')
  .controller('ListsCtrl', function($scope, Modal, _, Auth, ListValidation) {
    $scope.clients = [];
    $scope.resetPriority = true;
    $scope.accordionIsDisabled = false;

    $scope.$on('setClients', function(events, arg) {
      $scope.clients = arg;
    });

    /**
     * PRIVATE API
     */
    //var anchor = function(aref) {
    //  if ($location.hash() !== aref) {
    //    $location.hash(aref);
    //  } else {
    //    $anchorScroll();
    //  }
    //};

    /**
     * PUBLIC API
     */
    $scope.addTodo = function(client, todoList, newTodo, priority) {
      angular.forEach($scope.clients, function(c, clientIndex) {
        if (c._id === client._id) {
          angular.forEach($scope.clients[clientIndex].lists, function(l, listIndex) {
            if (l.$$hashKey === todoList.$$hashKey) {
              // Check for duplicates
              if (ListValidation.containsDuplicates($scope.clients[clientIndex].lists[listIndex].todos, newTodo, 'name')) {
                alert('No Duplicates!');
                return;
              }
              if(ListValidation.isFalsy(newTodo)) {
                alert("You didn't enter anything.");
                return;
              }
              if (ListValidation.isFalsy(priority)) {
                alert('Need to set a priority.');
                return;
              }

              $scope.clients[clientIndex].lists[listIndex].todos.push({ name: newTodo, info: '', priority: priority });
              Auth.updateUserLists($scope.clients[clientIndex], $scope.clients[clientIndex].lists);

              $scope.resetPriority = true;
            }
          });
        }
      });
    };

    $scope.createNewTodoList = function(client) {
      $scope.accordionIsDisabled = true;

      Modal.edit.create(function(listName) {
        angular.forEach($scope.clients, function(c, clientIndex) {
          if (c._id === client._id) {
            var verifyName = listName.replace(/\n54+/g,'').trim();
            if (ListValidation.isFalsy(verifyName) || ListValidation.containsDuplicates($scope.clients[clientIndex].lists, verifyName, 'title')) {
              alert('No Duplicates!');
              return;
            }

            $scope.clients[clientIndex].lists.push({ title: verifyName, todos: [] });
            Auth.updateUserLists($scope.clients[clientIndex], $scope.clients[clientIndex].lists);
          }
        });
      },  $scope).apply();
    };

    $scope.displayTodoInfo = function(client, todoList, todo, size) {
      var clientIndex
        , listIndex
        , todoIndex;

      angular.forEach($scope.clients, function(c, ci) {
        if (c._id === client._id) {
          clientIndex = ci;
          angular.forEach($scope.clients[clientIndex].lists, function(l, li) {
            if (l.$$hashKey === todoList.$$hashKey) {
              listIndex = li;
              angular.forEach($scope.clients[clientIndex].lists[listIndex].todos, function(t, ti) {
                if (t.$$hashKey === todo.$$hashKey) {
                  todoIndex = ti;
                }
              })
            }
          })
        }
      });

      // Show the modal if user didn't click the delete 'x'.
      if ($scope.showModal) {
        // Callback function to grab the text from the modal and store it into the appropriate thing.
        Modal.edit.todo(function(todoDesc, todoPriority) {
          if (ListValidation.isFalsy(todoPriority)) {
            alert('Need to set a priority.');
            return;
          }
          $scope.clients[clientIndex].lists[listIndex].todos[todoIndex].info = todoDesc;
          $scope.clients[clientIndex].lists[listIndex].todos[todoIndex].priority = todoPriority;

          Auth.updateUserLists($scope.clients[clientIndex], $scope.clients[clientIndex].lists);
        }, $scope.clients[clientIndex].lists[listIndex].todos[todoIndex], size).apply();
      }

      // Bit flag to show the modal or not. Kinda hacky, ain't gonna lie.
      $scope.showModal = true;
    };

    $scope.deleteList = function(client, list) {
      angular.forEach($scope.clients, function(c, clientIndex) {
        if (c._id === client._id) {
          angular.forEach($scope.clients[clientIndex].lists, function(l, listIndex) {
            if (list.$$hashKey === l.$$hashKey) {
              $scope.clients[clientIndex].lists.splice(listIndex, 1);
              Auth.updateUserLists($scope.clients[clientIndex], $scope.clients[clientIndex].lists);
            }
          });
        }
      });
    };

    $scope.deleteTodo = function(client, todoList, todo) {
      angular.forEach($scope.clients, function(c, clientIndex) {
        if (c._id === client._id) {
          angular.forEach($scope.clients[clientIndex].lists, function(l, listIndex) {
            if (l.$$hashKey === todoList.$$hashKey) {
              angular.forEach($scope.clients[clientIndex].lists[listIndex].todos, function(t, todoIndex) {
                if (t.$$hashKey === todo.$$hashKey) {
                  $scope.clients[clientIndex].lists[listIndex].todos.splice(todoIndex, 1);
                  Auth.updateUserLists($scope.clients[clientIndex], $scope.clients[clientIndex].lists);
                }
              });
            }
          });
        }
      });

      $scope.showModal = false;
    };

    $scope.priorityChanged = function() {
      $scope.resetPriority = false;
    };

    //$scope.focusUser = function(name) {
    //  var aref = 'user' + name;
    //  anchor(aref);
    //};
    //
    //$scope.focusList = function(user, name) {
    //  var aref = 'todoList' + user + name;
    //  anchor(aref);
    //};
  });
