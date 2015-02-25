'use strict';

describe('Main View', function() {
  var page, clientLoginSetup, logoutTearDown;

  clientLoginSetup = function() {
    page.loginEl.click();
    page.emailEl.sendKeys('test@test.com');
    page.passwordEl.sendKeys('test');
    page.loginBtnEl.click();
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

  it('should login the user in and take them to the client page with the base elements showing', function() {
    clientLoginSetup();

    expect(page.createTodoListBtn.getText()).toBe('Create A TO-DO List');
    expect(page.viewExampleListBtn.getText()).toBe('View Example List');
    expect(page.removeListsBtn.getText()).toBe('Remove Lists');

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
