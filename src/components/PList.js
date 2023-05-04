import { html, render } from 'lit-html';
import { renderTodoList } from './TodoTasks.js'

import * as ListsController from '../objects/ListsController.js'

const handleAddItem = (item) => {
  renderTodoList(ListsController.getList(item.name));
  console.log(`You clicked ${item.name}`);
};

export const ProjectList = (items) => html`
  <ul class="">
    ${items.map((item) => html`
      <li style="cursor:pointer;" @click=${() => handleAddItem(item)}>${item.name}</li>
    `)}
  </ul>
`;

const handleAddProject = () => {
  const newProject = document.querySelector("#projectinquestion");
  ListsController.addTodoList(newProject.value);
  newProject.value = '';
  renderProjectList();
};

export const AddProject = () => html`
      <div class="field has-addons mb-2">
  <div class="control">
    <input class="input" type="text" placeholder="List Name..." id="projectinquestion">
  </div>
  <div class="control">
    <a class="button is-success" @click=${() => handleAddProject()}>
    <span class="material-symbols-outlined">
    add
    </span>Add
    </a>
  </div>
</div>
    `;

const renderProjectListHere = document.querySelector('#projectlist')
const renderProjectAddHere = document.querySelector('#addproject')

export function renderProjectList() {
  render(ProjectList(ListsController.getLists()), renderProjectListHere)
  render(AddProject() , renderProjectAddHere);  
}