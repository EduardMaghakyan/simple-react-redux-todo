/* global browser, describe, it, beforeEach */
const expect = require('chai').expect;

describe('TodoList VisibleTodos', () => {
  const todoText = 'Some nice todo';
  const fakeApiResponseTime = 500;

  beforeEach(() => {
    browser.url('http://localhost:3000/');
  });

  it('Should load with the right title', () => {
    const actualTitle = browser.getTitle();
    expect(actualTitle).to.eql('Todo List');
  });

  it('Should disable "Add Todo" button when there is empty input', () => {
    expect(browser.isEnabled('.todo-submit')).to.equal(false);
  });

  it('Should enable "Add Todo" when the there is text in input', () => {
    browser.element('.todo-input').setValue(todoText);
    expect(browser.isEnabled('.todo-submit')).to.equal(true);
  });

  it('Should allow me to create a todo', () => {
    browser.element('.todo-input').setValue(todoText);
    browser.click('.todo-submit').pause(fakeApiResponseTime);
    const actual = browser.element('.todo-text').getText();
    expect(actual).to.equal(todoText);
  });

  it('Should allow to delete a todo', () => {
    browser.element('.todo-input').setValue(todoText);
    browser.click('.todo-submit').pause(fakeApiResponseTime);
    browser.click('.todo-delete').pause(fakeApiResponseTime);
    const actual = browser.element('.todo-text');
    expect(actual.state).to.equal('failure');
  });

  it('Undo delete should be disabled', () => {
    expect(browser.isEnabled('.todo-undo')).to.equal(false);
  });

  it('Should undo last delete.', () => {
    browser.element('.todo-input').setValue(todoText);
    browser.click('.todo-submit').pause(fakeApiResponseTime);
    browser.click('.todo-delete').pause(fakeApiResponseTime);
    browser.click('.todo-undo').pause(fakeApiResponseTime);
    const actual = browser.element('.todo-text').getText();
    expect(actual).to.equal(todoText);
  });

  it('Should mark todo as complete.', () => {
    browser.element('.todo-input').setValue(todoText);
    browser.click('.todo-submit').pause(fakeApiResponseTime);
    browser.element('.todo-text').click().pause(fakeApiResponseTime);
    const actual = browser.element('.todo-text');
    expect(actual.getAttribute('style')).to.equal('text-decoration: line-through;');
  });

  it('Should filter completed todos', () => {
    const secondTodoText = 'second todo text';
    browser.element('.todo-input').setValue(todoText);
    browser.click('.todo-submit').pause(fakeApiResponseTime);
    browser.element('.todo-text').click().pause(fakeApiResponseTime);
    browser.element('.todo-input').setValue(secondTodoText);
    browser.click('.todo-submit').pause(fakeApiResponseTime);

    browser.element('.todo-filters a:nth-child(3)').click().pause(fakeApiResponseTime);
    const completed = browser.element('.todo-text').getText();
    expect(completed).to.equal(todoText);

    browser.element('.todo-filters a:nth-child(2)').click().pause(fakeApiResponseTime);
    const active = browser.element('.todo-text').getText();
    expect(active).to.equal(secondTodoText);
  });
});
