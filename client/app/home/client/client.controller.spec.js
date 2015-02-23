'use strict';

describe('Controller: ClientCtrl', function() {
  // load the controller's module
  beforeEach(module('sweetSuiteApp'));
  beforeEach(module('socketMock'));

  var ClientCtrl,
    scope,
    $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function(_$httpBackend_, $controller, $rootScope) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('/api/things')
      .respond(['HTML5 Boilerplate', 'AngularJS', 'Karma', 'Express']);

    scope = $rootScope.$new();
    ClientCtrl = $controller('ClientCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of things to the scope', function() {
    $httpBackend.flush();
    expect(scope.awesomeThings.length).toBe(4);
  });

  it('should say that the example TODO example is NOT being displayed', function() {
    expect(scope.showTodoExample).toBe(false);
  });

  it('should toggle $scope.showTodoExample to true when executing the ng-click function', function() {
    scope.toggleTodoExample(scope);
    expect(scope.showTodoExample).toBe(true);
  });

  it('should say that the example TODO image is NOT being displayed', function() {
    expect(scope.showTodoExampleImage).toBe(false);
  });

  it('should toggle $scope.showTodoExampleImage to true when executing the ng-click function', function() {
    scope.toggleTodoExampleImage();
    expect(scope.showTodoExampleImage).toBe(true);
  });

  it('should have the $scope.showModal property as the default value', function() {
    expect(scope.showModal).toBe(true);
  });

  it('should toggle the $scope.showModal property as false after delete()ing a thing', function() {
    $httpBackend.flush();
    scope.deleteThing(scope.awesomeThings[0]);
    expect(scope.showModal).toBe(false);
  });

  it('should toggle the $scope.showModal property back to true after clicking a new thing in the list', function() {
    $httpBackend.flush();
    scope.deleteThing(scope.awesomeThings[0]);
    scope.displayThingInfo();
    expect(scope.showModal).toBe(true);
  });
})
