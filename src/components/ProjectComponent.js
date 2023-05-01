import { html, render } from 'lit-html';
import TodoList from '../objects/TodoList';
import { getLists } from '../index.js'

export class ProjectListComponent extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    const lists = getLists();
    const listItems = lists.map(list => html`
      <li>
        <a href="#" @click=${() => this.showList(list)}>
          ${list.name}
        </a>
      </li>
    `);

    render(html`
      <ul>
        ${listItems}
        <li>
          <form @submit=${this.addList}>
            <input type="text" name="listname" required>
            <button type="submit">Create Project</button>
          </form>
        </li>
      </ul>
    `, this);
  }

  showList(list) {
    const event = new CustomEvent('show-list', {
      detail: {
        list
      }
    });
    this.dispatchEvent(event);
  }

  addList(event) {
    event.preventDefault();
    const form = event.target;
    const listName = form.elements.listName.value.trim();
    if (listName) {
      const list = new TodoList(listName);
      lists.push(list);
      form.reset();
      this.render();
    }
  }
}

export class TodoListComponent extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    const { list } = this.dataset;
    const todoItems = list.getTodoItems().map(todo => html`
      <li>${todo}</li>
    `);

    render(html`
      <ul>
        ${todoItems}
        <li>
          <form @submit=${this.addTodoItem}>
            <input type="text" name="todoItem" required>
            <button type="submit">Add Todo</button>
          </form>
        </li>
      </ul>
    `, this);
  }

  addTodoItem(event) {
    event.preventDefault();
    const form = event.target;
    const { list } = this.dataset;
    const todoItem = form.elements.todoItem.value.trim();
    if (todoItem) {
      addTodoItem(list, todoItem);
      form.reset();
      this.render();
    }
  }
}

customElements.define('project-list', ProjectListComponent);
customElements.define('todo-list', TodoListComponent);