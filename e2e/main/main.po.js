/**
 * This file uses the Page Object pattern to define the main page for tests
 * https://docs.google.com/presentation/d/1B6manhG0zEXkC-H-tPo2vwU06JhL8w9-XCF9oehXzAQ
 *
 * Page objects help access elements on pages so tests can do their thing.
 */

'use strict';

var MainPage = function() {
  this.heroEl = element(by.css('.hero-unit'));
  this.h1El = this.heroEl.element(by.css('h1'));
  this.imgEl = this.heroEl.element(by.css('img'));

  this.footerEl = element(by.css('.footer'));
  this.contactEl = this.footerEl.element(by.id('maidclick'));
  this.meanjsEl = this.footerEl.element(by.id('meanjsclick'));

  /* start of nav bar elements */
  this.navbarEl = element(by.id('navbar-main'));
  this.loginEl = this.navbarEl.element(by.id('login'));
  this.signupEl = this.navbarEl.element(by.id('signup'));
  this.settingsEl = this.navbarEl.element(by.id('settings'));
  this.myListsEl = this.navbarEl.element(by.id('myLists'));
  this.goHomeEl = element(by.id('sweetsuite'));
  this.howitworksEl = this.navbarEl.element(by.id('howItWorks'));
  /* end of nav bar elements */

  /* start of admin elements */
  this.adminManageTodos = this.navbarEl.element(by.id('manageTodos'));
  this.adminManageUsers = this.navbarEl.element(by.id('manageUsers'));
  this.adminManageMaids = this.navbarEl.element(by.id('manageMaids'));
  /* end of admin elements */

  /* start of login elements */
  this.loginFormEl = element(by.name('form'));
  this.emailEl = this.loginFormEl.element(by.name('email'));
  this.passwordEl = this.loginFormEl.element(by.name('password'));
  this.facebookLoginBtnEl = this.loginFormEl.element(by.name('facebookLogin'));
  this.loginBtnEl = this.loginFormEl.element(by.id('loginBtn'));
  /* end of login elements */

  /* start of signup elements */
  this.signupFormEl = element(by.name('signupform'));
  this.signupNameEl = this.signupFormEl.element(by.id('name'));
  this.signupEmailEl = this.signupFormEl.element(by.id('email'));
  this.signupPasswordEl = this.signupFormEl.element(by.id('password'));
  this.signupClientBtnEl = this.signupFormEl.element(by.id('client'));
  this.signupMaidBtnEl = this.signupFormEl.element(by.id('maid'));
  this.facebookSignupBtnEl = this.signupFormEl.element(by.id('facebookSignup'));
  this.signupBtnEl = this.signupFormEl.element(by.id('signupBtn'));
  /* end of signup elements */

  /* start of change password elements */
  this.changepasswordFormEl = element(by.name('changepasswordform'));
  this.changepasswordCurrentEl = this.changepasswordFormEl.element(by.id('password'));
  this.changepasswordNewEl = this.changepasswordFormEl.element(by.id('newPassword'));
  this.changepasswordNewOtherEl = this.changepasswordFormEl.element(by.id('confirmNewPassword'));
  this.changepasswordBtnEl = this.changepasswordFormEl.element(by.id('passwordBtn'));
  /* end of change password elements */

  /* start of list elements */
  this.exampleListImg = element(by.id('exampleListImg'));
  this.clientBtnListEl = element(by.id('btnListsDiv'));
  this.viewClientTodoListsBtn = this.clientBtnListEl.element(by.id('viewListsBtn'));  // not working properly
  this.viewTodoListsBtn = this.clientBtnListEl.element(by.id('viewListsBtn'));
  this.viewExampleListBtn = this.clientBtnListEl.element(by.id('viewExampleListBtn'));
  this.hideListsBtn = this.clientBtnListEl.element(by.id('hideListsBtn'));

  this.todoListContainerThingy = element(by.id('todoContainer'))

  this.todoListContainerEl = element(by.css('[id=todoContainer]')).all(by.repeater('client in clients'));
  this.userTodoListEl = function(ind) {
    return this.todoListContainerEl.get(ind);
  };

  /* end of list elements */

  /* start of todo elements */
  this.todoEditModalEl = element(by.id('todoEditModal'));
  this.todoDescriptionLbl = this.todoEditModalEl.element(by.css('label'));

  this.todoEditModalFooterEl = this.todoEditModalEl.element(by.id('modalFooter'));
  this.modalBtns = this.todoEditModalFooterEl.all(by.id('modalBtn'));
  /* end of todo elements */

  this.adminUserListEl = element(by.css('[class=list-group]'));
  this.userNameStrongEl = function(ind) {
    return this.adminUserListEl.all(by.css('strong')).get(ind);
  }  
  this.deleteUserEl = function(ind) {
    return this.adminUserListEl.all(by.repeater('user in users')).get(ind);
  }
};

module.exports = new MainPage();

