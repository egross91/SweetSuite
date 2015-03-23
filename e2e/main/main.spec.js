'use strict';

describe('Main View', function() {
  var page, clientLoginSetup, adminLoginSetup, logoutTearDown, signupSetup;

  clientLoginSetup = function() {
    page.loginEl.click();
    page.emailEl.sendKeys('test@test.com');
    page.passwordEl.sendKeys('test');
    page.loginBtnEl.click();
  };

  adminLoginSetup = function() {
    page.loginEl.click();
    page.emailEl.sendKeys('admin@admin.com');
    page.passwordEl.sendKeys('admin');
    page.loginBtnEl.click();
  };

  signupSetup = function() {
    page.signupEl.click();
    page.signupNameEl.sendKeys('Alain Dobra');
    page.signupEmailEl.sendKeys('real@user.com');
    page.signupPasswordEl.sendKeys('password');
    page.signupBtnEl.click();
  };

  logoutTearDown = function() {
    page.navbarEl.element(by.id('logout')).click();
  };

  beforeEach(function() {
    browser.get('/');
    page = require('./main.po');
  });

  it('should include jumbotron with correct data', function() {
    expect(page.h1El.getText()).toBe('Howdy!');
    expect(page.imgEl.getAttribute('src')).toMatch(/assets\/images\/MadeSuite.png$/);
    expect(page.imgEl.getAttribute('alt')).toBe('( ͡° ͜ʖ ͡°)');
  });

  it('should successfully go to how it works', function() {
    page.howitworksEl.click();
  });

  it('should successfully signup', function() {
    signupSetup();
    page.myListsEl.click();
    expect(page.myListsEl.getText()).toBe('My Lists');
    page.goHomeEl.click();
    logoutTearDown();
  });

  it('should successfully log in to admin page and traverse navbar options', function() {
    adminLoginSetup();
    page.adminManageTodos.click();
    page.adminManageUsers.click();
    logoutTearDown();
  });

  it('should reflect admin list changes on the client', function() {
    adminLoginSetup();
    page.adminManageTodos.click();


    logoutTearDown();
  });

  it('should login the user in and take them to the client page with the base elements showing', function() {
    clientLoginSetup();

    expect(page.createTodoListBtn.getText()).toBe('Create New List');
    expect(page.viewExampleListBtn.getText()).toBe('View Example List');
    expect(page.removeListsBtn.getText()).toBe('Hide All');

    logoutTearDown();
  });

  it('should allow the user to view the example list', function() {
    clientLoginSetup();

    expect(page.thingListContainerEl).toBeTruthy();

    /* click the example list */
    page.viewExampleListBtn.click();
    /* TODO: Check to see it it's actually there*/
    page.viewExampleListBtn.click();

    logoutTearDown();
  });

  it('should hide all lists when the "Hide All" button is clicked', function() {
    clientLoginSetup();

    expect(page.thingListContainerEl).toBeTruthy();

    /* click view lists and view example lists */

    page.viewClientTodoListsBtn.click();
    page.viewExampleListBtn.click();
    /* TODO: Check that lists are there */
    page.removeListsBtn.click();
    /* TODO: make sure lists are gone */

    logoutTearDown();
  });

  it('should allow the user to click a todo item and edit the description', function() {
    clientLoginSetup();

    expect(page.thingListContainerEl).toBeTruthy();

    /* Make the todo list visible & has 3 elements. */
    page.createTodoListBtn.click();
    expect(page.thingsEls.count()).toBe(3);
    page.thingsEls.get(0).click();

    /* Check the modal and its contents. */
    expect(page.todoEditModalEl).toBeTruthy();
    expect(page.todoDescriptionLbl).toBeTruthy();
    expect(page.todoEditModalFooterEl).toBeTruthy();

    /* Close the modal to logout. */
    page.modalBtns.get(0).click();

    logoutTearDown();
  });

});
