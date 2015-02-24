'use strict';

describe('Main View', function() {
  var page;

  beforeEach(function() {
    browser.get('/');
    page = require('./main.po');
  });

  it('should include jumbotron with correct data', function() {
    expect(page.h1El.getText()).toBe('Howdy!');
    expect(page.imgEl.getAttribute('src')).toMatch(/assets\/images\/MadeSuite.png$/);
    expect(page.imgEl.getAttribute('alt')).toBe('( ͡° ͜ʖ ͡°)');
  });

  it('should login the user in and take them to the client page with the base elmeents showing', function() {
    //page.navbarEl.getText();
    page.loginEl.click();
    page.emailEl.sendKeys('test@test.com');
    page.passwordEl.sendKeys('test');
    page.loginBtnEl.click();

    expect(page.createTodoListBtn.getText()).toBe('Create A TO-DO List');
    expect(page.viewExampleListBtn.getText()).toBe('View Example List');
    expect(page.removeListsBtn.getText()).toBe('Remove Lists');
  });
});
