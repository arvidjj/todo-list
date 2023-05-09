import { html, render } from 'lit-html';
import { renderTodoList, getRenderedList, renderEmptyTodoList} from './todoTasks.js'

import * as ListsController from '../objects/ListsController.js'
import * as LCD from '../objects/LocalStorageData.js'

const handleRenderList = (item) => {
  renderTodoList(ListsController.getList(item.id));
};

const removeList = (item) => {
  ListsController.removeTodoList(item.id)

  const currentLists = ListsController.getLists();
  if (getRenderedList() == item.name) {
    renderEmptyTodoList();
  }
  
  renderProjectList();
};

export const ProjectList = (items) => html`
  <ul class="">
    ${items.map((item) => html`
      <li class="is-flex is-flex-wrap-nowrap is-justify-content-space-between">
        <p class="" style="cursor:pointer;" @click=${() => handleRenderList(item)}>${item.name}</p>
        <button class="button is-danger is-outlined p-1" @click=${() => removeList(item)}>
            <span class="material-symbols-outlined">
              close
            </span>
          </button>
      </li>
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
  LCD.saveToStorage('lists', ListsController.getLists())
  if (ListsController.hasLists()) {
    render(ProjectList(ListsController.getLists()), renderProjectListHere)
  }
  render(AddProject() , renderProjectAddHere);  
}