import { html, render } from "lit-html";
import { repeat } from 'lit-html/directives/repeat.js';
import * as ListsController from '../objects/ListsController.js'
import TodoList from '../objects/TodoList.js';
import Todo from '../objects/Todo.js';




/////////////////////////
function editDescription(item, list) {
  const span = event.target;
  span.focus(); // Set focus on the span element
  let currentValue = span.textContent.trim();

  // Add a blur event listener to the span element
  span.addEventListener('blur', () => {
    // Update the item object with the new value
    const newItem = { ...item, description: currentValue };
    ListsController.modifyTodoItem(list.name, item, newItem);
    console.log("Descipcion actualizada")
    // render(myTemplate(item), document.body); // Re-render the template
  });

  // Add a keydown event listener to the span element
  span.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      // If the user presses Enter, update the item object with the new value
      const newItem = { ...item, description: currentValue };
      ListsController.modifyTodoItem(list.name, item, newItem);
      // render(myTemplate(item), document.body); // Re-render the template
    }
  });
}


const options = [
  { value: '3', label: 'High' },
  { value: '2', label: 'Medium' },
  { value: '1', label: 'Low' }
];
let selected = '';

const handleExpandTask = (item, todos) => {
  const todoDetailsDiv = document.querySelector(`#todo${item.id}`)

  const todoDetailsComponent = () => {
    return html`
    <p><strong>Description:</strong> <span 
    @click=${() => editDescription(item, todos)} contenteditable>
        ${item.description}
   </span></p>

    <br>
    <p><strong>Due Date:</strong> <span>${item.dueDate}</span></p>
    <p><strong>Priority:</strong><span id="priority${item.id}"></span></p>
    `
  }
  render(todoDetailsComponent(), todoDetailsDiv)
  renderSelect(item, todos);
  todoDetailsDiv.classList.toggle('is-hidden')
};

const renderSelect = (item, list) => {

  const template = html`
    <div class="select is-rounded is-small">
      <select @change=${(event) => handleChange(event, item, list)}>
        ${options.map((option) => html`
          <option value=${option.value} ?selected=${option.value === item.priority}>${option.label}</option>
        `)}
      </select>
    </div>
  `;
  render(template, document.querySelector("#priority" + item.id));
};

const handleChange = (event, item, list) => {
  const selected = event.target.value;
  //update the todo priority
  console.log(list)
  const newItem = { ...item, priority: selected };
  ListsController.modifyTodoItem(list.name, item, newItem);
  ////
  const listItem = document.querySelector(`#listitem${item.id}`);
  listItem.className = `${selected == 3 ? 'has-background-danger-light' : ''} ${selected == 2 ? 'has-background-warning-light' : ''}`;
  const listDiv = document.querySelector(`#todo${item.id}`);
  listDiv.className = `${selected == 3 ? 'has-background-danger-light p-2' : 'p-2'} ${selected == 2 ? 'has-background-warning-light p-2' : 'p-2'}`;
  renderSelect(newItem, list);
};
/////////////////////////////////

const todoListComponent = (todos) => {
  console.log(todos.items)
  return html`
    <ul id="taskList" class="menu-list"> 
    ${repeat(todos.items, (item) => item.title, (item, index) => html`
      <li id="listitem${item.id}" class="${item.priority == 3 ? 'has-background-danger-light' : ''} ${item.priority == 2 ? 'has-background-warning-light' : ''}">
      <span class="material-symbols-outlined" style="cursor:pointer;" @click=${() => handleExpandTask(item, todos)}>
expand_more
</span>
      <input type="checkbox" name="done" id="done">  
      <label for="done" class="subtitle">${item.title}: ${item.description}</label>
      </li>
      <div id="todo${item.id}" 
                            class="is-hidden ${item.priority == 3 ? 'has-background-danger-light' : ''} ${item.priority == 2 ? 'has-background-warning-light' : ''}
                              p-2" style=""></div>
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
  newTask.value = '';
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
};

const renderTaskListHere = document.querySelector('#tasks')
const renderTasksTitleHere = document.querySelector('#taskstitle')
const renderTasksOptionsHere = document.querySelector('#tasksoptions')
function renderTodoList(list) {
  render(todoListTitleComponent(list), renderTasksTitleHere);
  render(todoListOptionsComponent(list), renderTasksOptionsHere);
  render(todoListComponent(list), renderTaskListHere);
}


export { renderTodoList };