'use strict';

describe('Controller: ListsCtrl', function() {
  beforeEach(module('sweetSuiteApp'));
  beforeEach(module('socketMock'));

  var ListsCtrl
    , scope
    , $httpBackend
    , $Modal
    , rootScope
    , Users;

  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope, User) {
    rootScope = $rootScope;
    Users = [];
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('/api/users')
      .respond([{
        provider: 'local',
        name: 'Test User',
        email: 'test@test.com',
        role: 'user',
        password: 'test',
        lists: [
          {title: 'House',
            todos: [{name: 'The Lawn', info: 'There\'s garbage all over the lawn that needs to be picked up.', priority: 3},
              {name: 'The Trash', info: 'Please place the recyclables in the green can outside. Place the rest of the garbage in the black can.', priority: 3},
              {name: 'The Kitchen', info: 'All food left out needs to be disposed off. There are a few dishes that need to be washed.', priority: 1}]
          },
          {title: 'Guest House',
            todos: [{name: 'Bedrooms', info : 'All beds need to be made. Carpets in all bedrooms must be vacuumed', priority: 2}]
          }]
      }, {
        provider: 'local',
        role: 'admin',
        name: 'Admin',
        email: 'admin@admin.com',
        password: 'admin'
      }]);

    scope = $rootScope.$new();
    ListsCtrl = $controller('ListsCtrl', {
      $scope: scope
    });

    User.query().$promise.then(function(users) {
      Users = users;
    });
  }));

  var getAllUsers = function() {
    return Users;
  }, getUser = function(name) {
    var users = getAllUsers();
    var target;

    angular.forEach(users, function(user) {
      if (user.name === name) {
        target = user;
      }
    });

    return user;
  }, getUsersByRole = function(role) {
    var users = getAllUsers();
    var targets = [];

    angular.forEach(users, function(user) {
      if (user.role === role) {
        targets.push(user);
      }
    });

    return targets;
  }, setClients = function(users) {
    rootScope.$broadcast('setClients', users);
  };


  it('the default user should only appear in the list if we query just the users and set them from the broadcast', function() {
    $httpBackend.flush();
    setClients(getUsersByRole('user'));

    expect(scope.clients.length).toBe(1);
    expect(scope.clients[0].name).toBe('Test User');
  });

  it('new todos are added to the user\'s list of todos with the appropriate priority', function() {
    $httpBackend.flush();
    setClients(getUsersByRole('user'));

    scope.addTodo(scope.clients[0], scope.clients[0].lists[0], 'Testing', "1");
    expect(scope.clients[0].lists[0].todos[3].name).toBe('Testing');
  });

  it('todos are removed from the clients appropriate list', function() {
    var GuestHouse = 'Guest House';
    $httpBackend.flush();
    setClients(getUsersByRole('user'));

    // Assert the name of the list.
    var oldLength = scope.clients[0].lists[1].todos.length;
    expect(scope.clients[0].lists[1].title).toBe(GuestHouse);
    scope.deleteTodo(scope.clients[0], scope.clients[0].lists[1], scope.clients[0].lists[1].todos[0]);

    // Assert the name of the list and the length, as well as the changes made.
    expect(oldLength-1).toBe(scope.clients[0].lists[1].todos.length);
    expect(scope.clients[0].lists[1].title).toBe(GuestHouse);
  });

  it('a list is deleted from the appropriate user', function() {
    $httpBackend.flush();
    setClients(getAllUsers());

    var oldTitle = scope.clients[0].lists[0].title;
    scope.deleteList(scope.clients[0], scope.clients[0].lists[0]);

    expect(scope.clients[0].lists[0].title).toBe('Guest House');
    expect(oldTitle).toBe('House');
  });
});
