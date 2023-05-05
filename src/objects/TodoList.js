import Todo from './Todo.js';

class TodoList {
  constructor(name) {
    this.name = name;
    this.items = [];
    this._id = TodoList.incrementId()
  }

  static incrementId() {
    if (!this.latestId) this.latestId = 1
    else this.latestId++
    return this.latestId
  }

  addItem(title, description, dueDate, priority) {
    const newItem = new Todo(title, description, dueDate, priority);
    this.items.push(newItem);
  }

  addTodo(todo) {
    this.items.push(todo);
  }

  modifyTodo(todo, newTodo) {
    const index = this.items.findIndex(item => item === todo);
    this.items.splice(index, 1, newTodo);
  }

  removeItem(index) {
    this.items.splice(index, 1);
  }

}

export default TodoList;