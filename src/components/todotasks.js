import { html, render } from "lit-html";
import { repeat } from 'lit-html/directives/repeat.js';
import * as ListsController from '../objects/ListsController.js'
import TodoList from '../objects/TodoList.js';
import Todo from '../objects/Todo.js';


const renderTaskListHere = document.querySelector('#tasks')
const renderTasksTitleHere = document.querySelector('#taskstitle')
const renderTasksOptionsHere = document.querySelector('#tasksoptions')


const todoListComponent = (todos) => {
    console.log(todos.items)
    return html`
    <ul id="taskList" class="menu-list"> 
    ${repeat(todos.items, (item) => item.title, (item, index) => html`
      <li>
      <span class="material-symbols-outlined">
expand_more
</span>
      <input type="checkbox" name="done" id="done">  
      <label for="done" class="subtitle">${item.title}: ${item.description}</label>
      </li>
    `)}
    </ul>
        `;
}
    ;

const todoListTitleComponent = (todoList) => {
    return html`
    <p class="title"><span class="material-symbols-outlined">
arrow_forward_ios
</span>${todoList.name}</p>
        `;
}
    ;

const handleClick = (item) => {
    //ListsController.getList(item.name);
    const newTask = document.querySelector("#taskinquestion");
    ListsController.getList(item.name).addItem(newTask.value, "", "", 0);
    renderTodoList(item)
};

const todoListOptionsComponent = (todoList) => {
    return html`
    <div class="field has-addons mb-2">
  <div class="control">
    <input class="input" type="text" placeholder="Task 1..." id="taskinquestion">
  </div>
  <div class="control">
    <a class="button is-success" @click=${() => handleClick(todoList)}>
    <span class="material-symbols-outlined">
    add
    </span>Add
    </a>
  </div>
</div>
    
     `;
}
    ;

function renderTodoList(list) {
    render(todoListTitleComponent(list), renderTasksTitleHere);
    render(todoListOptionsComponent(list), renderTasksOptionsHere);
    render(todoListComponent(list), renderTaskListHere);
}


export { renderTodoList };