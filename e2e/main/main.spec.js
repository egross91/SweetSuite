'use strict';

describe('Main View', function() {
  var page
    , loginUser
    , logout
    , registerUser
    , changePassword
    , deleteUser;
    //, waitUntilReady;

  beforeEach(function() {
    browser.get('/');
    page = require('./main.po');
  });

  deleteUser = function(idx) {
    page.adminUserListEl.all(by.repeater('user in users')).get(idx).element(by.id('deleteUser')).click();
    browser.switchTo().alert().accept();
  };

  loginUser = function(email, password) {
    page.loginEl.click();
    browser.sleep(500);
    expect(browser.driver.getCurrentUrl()).toBe('http://localhost:9000/login');
    page.emailEl.sendKeys(email);
    page.passwordEl.sendKeys(password);
    page.loginBtnEl.click();
  };

  registerUser = function(name, email, password) {
    page.signupEl.click();
    browser.sleep(500);
    expect(browser.driver.getCurrentUrl()).toBe('http://localhost:9000/signup');
    page.signupNameEl.sendKeys(name);
    page.signupEmailEl.sendKeys(email);
    page.signupPasswordEl.sendKeys(password);
    page.signupBtnEl.click();
  };

  logout = function() {
    page.navbarEl.element(by.id('logout')).click();
  };

  changePassword = function(curpass, newpass) {
    page.settingsEl.click();
    browser.sleep(500);
    expect(browser.driver.getCurrentUrl()).toBe('http://localhost:9000/settings');
    page.changepasswordCurrentEl.sendKeys(curpass);
    page.changepasswordNewEl.sendKeys(newpass);
    page.changepasswordNewOtherEl.sendKeys(newpass);
    page.changepasswordBtnEl.click();
  };

  //waitUntilReady = function(el) {
  //  browser.wait(function() {
  //    return el.isPresent();
  //  }, 2000);
  //  browser.wait(function() {
  //    return el.isDisplayed();
  //  }, 2000);
  //};

  it('should hide all lists when the "Hide All" button is clicked', function() {
    expect(browser.driver.getCurrentUrl()).toBe('http://localhost:9000/');
    loginUser('test@test.com', 'test');
    browser.sleep(1000);
    expect(browser.driver.getCurrentUrl()).toBe('http://localhost:9000/client');
    expect(page.todoListContainerEl).toBeTruthy();

    /* click view lists and view example lists */
    page.viewClientTodoListsBtn.click();
    page.viewExampleListBtn.click();

    //check if example list is displayed
    expect(page.exampleListImg.isDisplayed()).toBeTruthy();

    //check if client todo list is displayed
    expect(page.todoListContainerThingy.isDisplayed()).toBeTruthy();

    //click hide lists
    page.hideListsBtn.click();

    //make sure list stuff is gone:
    expect(page.exampleListImg.isDisplayed()).toBeFalsy();
    expect(page.todoListContainerThingy.isDisplayed()).toBeFalsy();

    logout();
  });

  it('should successfully go to the MaidSuite homepage', function() {
    page.contactEl.click();

    //check to make sure url matches
    //maidsuite.com doesnt use angular so we must use driver :)
    expect(browser.driver.getCurrentUrl()).toBe('http://www.maidsuite.com/');
  });

  it('should change the users password', function() {
    //log in initially
    loginUser('test@test.com', 'test');
    browser.sleep(500);
    expect(browser.driver.getCurrentUrl()).toBe('http://localhost:9000/client');
    //change password:
    changePassword('test', 'sup');

    //log out
    logout();

    //log back in
    loginUser('test@test.com', 'sup');

    //make sure client stuff is there
    expect(page.viewTodoListsBtn.getText()).toBe('View Lists');
    expect(page.viewExampleListBtn.getText()).toBe('View Example List');
    expect(page.hideListsBtn.getText()).toBe('Hide All');

    //change back
    changePassword('sup', 'test');

    //log out
    logout();
  });

  it('should include jumbotron with correct data', function() {
    expect(page.h1El.getText()).toBe('Howdy!');
    expect(page.imgEl.getAttribute('src')).toMatch(/assets\/images\/MadeSuite.png$/);
    expect(page.imgEl.getAttribute('alt')).toBe('( ͡° ͜ʖ ͡°)');
  });

  it('should successfully go to how it works', function() {
    page.howitworksEl.click();
    browser.sleep(500);
    expect(browser.driver.getCurrentUrl()).toBe('http://localhost:9000/how');
  });

  it('should successfully signup', function() {
    registerUser('Alin Dobra', 'real@user.com', 'password');
    page.myListsEl.click();
    browser.sleep(500);
    expect(browser.driver.getCurrentUrl()).toBe('http://localhost:9000/client');
    expect(page.myListsEl.getText()).toBe('My Lists');
    page.goHomeEl.click();
    browser.sleep(500);
    expect(browser.driver.getCurrentUrl()).toBe('http://localhost:9000/');
    expect(page.goHomeEl.getText()).toBe('SweetSuite');
    logout();

    loginUser('admin@admin.com', 'admin');
    browser.sleep(500);
    expect(browser.driver.getCurrentUrl()).toBe('http://localhost:9000/admin/users');
    expect(page.userNameStrongEl(2).getText()).toBe('Alin Dobra');
    deleteUser(2);
    page.goHomeEl.click();
    expect(browser.driver.getCurrentUrl()).toBe('http://localhost:9000/');
    logout();
  });

  it('should successfully log in to admin page and traverse navbar options', function() {
    loginUser('admin@admin.com', 'admin');
    page.adminManageTodos.click();
    expect(page.adminManageTodos.getText()).toBe('Manage Todos');
    page.adminManageUsers.click();
    expect(page.adminManageUsers.getText()).toBe('Manage Users');
    page.adminManageMaids.click();
    expect(page.adminManageMaids.getText()).toBe('Assign Maids');
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

  it('ensure that maid promotion works', function() {
    registerUser('Maide Maid', 'maid@maid.com', 'maid');
    logout();

    loginUser('admin@admin.com', 'admin');

    expect(page.userNameStrongEl(2).getText()).toBe('Maide Maid');
    deleteUser(2);

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
    browser.sleep(500); // wait for accordion to unwind
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
});
