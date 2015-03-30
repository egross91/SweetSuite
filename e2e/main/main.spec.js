'use strict';

describe('Main View', function() {
  var page
    , loginUser
    , logout
    , registerUser;
    //, waitUntilReady;

  beforeEach(function() {
    browser.get('/');
    page = require('./main.po');
  });

  loginUser = function(email, password) {
    page.loginEl.click();
    page.emailEl.sendKeys(email);
    page.passwordEl.sendKeys(password);
    page.loginBtnEl.click();
  };

  registerUser = function(name, email, password) {
    page.signupEl.click();
    page.signupNameEl.sendKeys(name);
    page.signupEmailEl.sendKeys(email);
    page.signupPasswordEl.sendKeys(password);
    page.signupBtnEl.click();
  };

  logout = function() {
    page.navbarEl.element(by.id('logout')).click();
  };

  //waitUntilReady = function(el) {
  //  browser.wait(function() {
  //    return el.isPresent();
  //  }, 2000);
  //  browser.wait(function() {
  //    return el.isDisplayed();
  //  }, 2000);
  //};

  it('should include jumbotron with correct data', function() {
    expect(page.h1El.getText()).toBe('Howdy!');
    expect(page.imgEl.getAttribute('src')).toMatch(/assets\/images\/MadeSuite.png$/);
    expect(page.imgEl.getAttribute('alt')).toBe('( ͡° ͜ʖ ͡°)');
  });

  it('should successfully go to how it works', function() {
    page.howitworksEl.click();
  });

  it('should successfully signup', function() {
    registerUser('Alain Dobra', 'real@user.com', 'password');
    page.myListsEl.click();
    expect(page.myListsEl.getText()).toBe('My Lists');
    page.goHomeEl.click();
    logout();
  });

  it('should successfully log in to admin page and traverse navbar options', function() {
    loginUser('admin@admin.com', 'admin');
    page.adminManageTodos.click();
    page.adminManageUsers.click();
    logout();
  });

  it('should reflect admin list changes on the client', function() {
    loginUser('admin@admin.com', 'admin');
    page.adminManageTodos.click();
    logout();
  });

  it('should login the user in and take them to the client page with the base elements showing', function() {
    loginUser('test@test.com', 'test');

    expect(page.viewTodoListsBtn.getText()).toBe('View Lists');
    expect(page.viewExampleListBtn.getText()).toBe('View Example List');
    expect(page.hideListsBtn.getText()).toBe('Hide All');

    logout();
  });

  it('should allow the user to view the example list', function() {
    loginUser('test@test.com', 'test');

    expect(page.todoListContainerEl).toBeTruthy();

    /* click the example list */
    page.viewExampleListBtn.click();
    expect(page.exampleListImg).toBeTruthy();

    logout();
  });

  it('should hide all lists when the "Hide All" button is clicked', function() {
    loginUser('test@test.com', 'test');

    expect(page.todoListContainerEl).toBeTruthy();

    /* click view lists and view example lists */

    page.viewClientTodoListsBtn.click();
    page.viewExampleListBtn.click();
    /* TODO: Check that lists are there */
    page.hideListsBtn.click();
    /* TODO: make sure lists are gone */

    logout();
  });

  it('should allow the user to click a todo item and edit the description', function() {
    loginUser('test@test.com', 'test');

    expect(page.todoListContainerEl).toBeTruthy();

    /* Click Test User's accordion */
    var testUserTodoList = page.userTodoListEl(0);

    page.viewTodoListsBtn.click();
    expect(testUserTodoList.getText()).toBe('Test User | test@test.com');
    testUserTodoList.element(by.css('[class=accordion-toggle]')).click();
    expect(testUserTodoList.all(by.css('[class=accordion-toggle]')).get(1).getText()).toBe('House');
    testUserTodoList.all(by.css('[class=accordion-toggle]')).get(1).click();
    testUserTodoList.all(by.repeater('todo in todoList.todos')).count().then(function(count) {
      /* -1 because it counts the title of the accordion as well. */
      expect(count-1).toBe(3);
    });

    /* Check the modal and its contents. */
    //expect(page.todoEditModalEl).toBeTruthy();
    //expect(page.todoDescriptionLbl).toBeTruthy();
    //expect(page.todoEditModalFooterEl).toBeTruthy();

    /* Close the modal to logout. */
    //page.modalBtns.get(0).click();

    logout();
  });
  it('ensure that maid promotion works', function() {
    registerUser('Maide Maid', 'maid@maid.com', 'maid');
    logout();

    loginUser('admin@admin.com', 'admin');
    expect(page.userNameStrongEl(3).getText()).toBe('Maide Maid');
  });
});
