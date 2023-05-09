import Todo from './Todo.js';

class TodoList {
  constructor(name) {
    this.name = name;
    this.items = [];
    this.id = TodoList.incrementId()
  }

  static incrementId() {
    if (!this.latestId) this.latestId = 1
    else this.latestId++
    return this.latestId
  }

  setItems(todos) {
    this.items = todos;
  }

  addItem(title, description, dueDate, priority, inList) {
    const newItem = new Todo(title, description, dueDate, priority, inList);
    this.items.push(newItem);
  }

  addTodo(todo) {
    this.items.push(todo);
  }

  modifyTodo(todo, newTodo) {
    const index = this.items.findIndex(item => item === todo);
    this.items.splice(index, 1, newTodo);
  }

  getTodoById(todoId) {
    return this.items.find(item => item.id === todoId)
  }

  removeIndex(index) {
    this.items.splice(index, 1);
  }
  removeItem(todo) {
    const index = this.items.findIndex(item => item === todo);
    this.items.splice(index, 1);
  }

}

export default TodoList;