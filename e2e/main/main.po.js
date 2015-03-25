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

  this.thingListContainerEl = element(by.id('todoContainer'));
  this.testUserUserAccordionEl = this.thingListContainerEl.element(by.id('user5512d88eab199968138c49b7')).element(by.css('accordion-toggle'));
  this.userTestTodoListEl = this.testUserUserAccordionEl.element(by.id('todoListHouse')).element(by.css('accordion-toggle'));
  this.userTestTodoListTodosEl = this.userTestTodoListEl.all(by.css('ul'));

  this.todoEditModalEl = element(by.id('todoEditModal'));
  this.todoDescriptionLbl = this.todoEditModalEl.element(by.css('label'));

  this.todoEditModalFooterEl = this.todoEditModalEl.element(by.id('modalFooter'));
  this.modalBtns = this.todoEditModalFooterEl.all(by.id('modalBtn'));
};

module.exports = new MainPage();

