import { v4 } from 'node-uuid';

// This is a fake in-memory implementation of something
// that would be implemented by calling a REST server.

const fakeData = [
  {
    id: v4(),
    text: 'hey',
    completed: true,
    deleted: false,
  }, {
    id: v4(),
    text: 'ho',
    completed: true,
    deleted: false,
  }, {
    id: v4(),
    text: 'let’s go',
    completed: false,
    deleted: false,
  },
];

const fakeDatabase = {
  todos: [],
};

const delay = ms =>
  new Promise(resolve => setTimeout(resolve, ms));

export const fetchTodos = filter =>
  delay(500).then(() => {
    switch (filter) {
      case 'all':
        return fakeDatabase.todos.filter(t => !t.deleted);
      case 'active':
        return fakeDatabase.todos.filter(t => !t.completed && !t.deleted);
      case 'completed':
        return fakeDatabase.todos.filter(t => t.completed && !t.deleted);
      default:
        throw new Error(`Unknown filter: ${filter}`);
    }
  });


export const addTodo = text =>
  delay(500).then(() => {
    const todo = {
      id: v4(),
      text,
      completed: false,
    };
    fakeDatabase.todos.push(todo);
    return todo;
  });

export const toggleTodo = id =>
  delay(500).then(() => {
    const todo = fakeDatabase.todos.find(t => t.id === id);
    todo.completed = !todo.completed;
    return todo;
  });

export const deleteTodo = id =>
  delay(500).then(() => {
    let deleted;
    fakeDatabase.todos.map((t) => {
      if (t.id === id) {
        t.deleted = true;
        deleted = t;
      }
      return t;
    });

    return deleted;
  });

export const undoLastDelete = id =>
  delay(500).then(() => {
    let undo;
    fakeDatabase.todos.map((t) => {
      if (t.id === id) {
        t.deleted = false;
        undo = t;
      }
      return t;
    });

    return undo;
  });
