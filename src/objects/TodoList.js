import Todo from './Todo.js';

class TodoList {
  constructor(name) {
    this.name = name;
    this.items = [];
  }

  addItem(title, description, dueDate, priority) {
    const newItem = new Todo(title, description, dueDate, priority);
    this.items.push(newItem);
  }

  addTodo(todo) {
    this.items.push(todo);
  }

  removeItem(index) {
    this.items.splice(index, 1);
  }

}

export default TodoList;