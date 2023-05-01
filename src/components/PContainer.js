import { html, render } from 'lit-html';
import { ProjectListComponent, TodoListComponent } from './ProjectComponent';

export class PContainer extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    render(html`
    <div class="column notification projectList">
                    <p class="title ">projects</p>
                    <project-list></project-list>
                </div>
    `, this);

    const projectListContainer = this.querySelector('#project-list-container');
    const todoListContainer = this.querySelector('#todo-list-container');

    const projectList = new ProjectListComponent();
    const todoList = new TodoListComponent();

    projectList.addEventListener('show-project', event => {
      const project = event.detail.project;
      todoList.dataset.project = project;
      todoList.render();
    });

    projectListContainer.appendChild(projectList);
    todoListContainer.appendChild(todoList);
  }
}

customElements.define('project-container', PContainer);