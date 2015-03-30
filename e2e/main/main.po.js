/**
 * This file uses the Page Object pattern to define the main page for tests
 * https://docs.google.com/presentation/d/1B6manhG0zEXkC-H-tPo2vwU06JhL8w9-XCF9oehXzAQ
 */

'use strict';

var MainPage = function() {
  this.heroEl = element(by.css('.hero-unit'));
  this.h1El = this.heroEl.element(by.css('h1'));
  this.imgEl = this.heroEl.element(by.css('img'));

  this.navbarEl = element(by.id('navbar-main'));
  this.loginEl = this.navbarEl.element(by.id('login'));
  this.signupEl = this.navbarEl.element(by.id('signup'));
  this.howitworksEl = this.navbarEl.element(by.id('howItWorks'));
  this.myListsEl = this.navbarEl.element(by.id('myLists'));
  this.goHomeEl = element(by.id('sweetsuite'));
  // admin specific
  this.adminManageTodos = this.navbarEl.element(by.id('manageTodos'));
  this.adminManageUsers = this.navbarEl.element(by.id('manageUsers'));

  this.loginFormEl = element(by.name('form'));
  this.emailEl = this.loginFormEl.element(by.name('email'));
  this.passwordEl = this.loginFormEl.element(by.name('password'));
  this.loginBtnEl = this.loginFormEl.element(by.id('loginBtn'));

  this.signupFormEl = element(by.name('signupform'));
  this.signupNameEl = this.signupFormEl.element(by.id('name'));
  this.signupEmailEl = this.signupFormEl.element(by.id('email'));
  this.signupPasswordEl = this.signupFormEl.element(by.id('password'));
  this.signupBtnEl = this.signupFormEl.element(by.id('signupBtn'));

  this.exampleListImg = element(by.id('exampleListImg'));

  this.clientBtnListEl = element(by.id('btnListsDiv'));
  this.viewClientTodoListsBtn = this.clientBtnListEl.element(by.id('viewListsBtn'));  // not working properly
  this.viewTodoListsBtn = this.clientBtnListEl.element(by.id('viewListsBtn'));
  this.viewExampleListBtn = this.clientBtnListEl.element(by.id('viewExampleListBtn'));
  this.hideListsBtn = this.clientBtnListEl.element(by.id('hideListsBtn'));

  this.todoListContainerEl = element(by.css('[id=todoContainer]')).all(by.repeater('client in clients'));
  this.userTodoListEl = function(ind) {
    return this.todoListContainerEl.get(ind);
  };

  //this.todoListItemEl = function(userInd, itemTodo) {
  //  return this.userTodoListEl(userInd);
  //};

  this.todoEditModalEl = element(by.id('todoEditModal'));
  this.todoDescriptionLbl = this.todoEditModalEl.element(by.css('label'));

  this.todoEditModalFooterEl = this.todoEditModalEl.element(by.id('modalFooter'));
  this.modalBtns = this.todoEditModalFooterEl.all(by.id('modalBtn'));

  this.adminUserListEl = element(by.css('[class=list-group]'));
  this.userNameStrongEl = function(ind) {
    return this.adminUserListEl.all(by.css('strong')).get(ind);
  }
};

module.exports = new MainPage();

