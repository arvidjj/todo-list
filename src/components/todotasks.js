import { html, render } from "lit-html";
import { repeat } from 'lit-html/directives/repeat.js';
import * as ListsController from '../objects/ListsController.js'
import * as LCD from '../objects/LocalStorageData.js'
import TodoList from '../objects/TodoList.js';
import Todo from '../objects/Todo.js';
import { format, parseISO } from 'date-fns';

/////////////////////////
function editTitle(item, list) {
  const selectedTodo = ListsController.getTodo(list.id, item.id);

  const input = event.target;
  input.focus(); // Set focus on the input element

  // Add a blur event listener to the input element
  input.addEventListener('blur', () => {
    const currentValue = input.value.trim();

    // Update the item object with the new value
    const newItem = { ...selectedTodo, title: currentValue };
    ListsController.modifyTodoItem(list.id, selectedTodo, newItem);
    //renderTodoList(ListsController.getList(list.name))
    LCD.saveToStorage('lists', ListsController.getLists())
  });

  // Add a keydown event listener to the input element
  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent default behavior of Enter key

      const currentValue = input.value.trim();

      // Update the item object with the new value
      const newItem = { ...selectedTodo, title: currentValue };
      ListsController.modifyTodoItem(list.id, selectedTodo, newItem);
      input.blur(); // Trigger blur event to save changes
      //renderTodoList(ListsController.getList(list.name))
      LCD.saveToStorage('lists', ListsController.getLists())
      console.log(ListsController.getList(list.id))
    }
  });
}

function editDescription(item, list) {
  const selectedTodo = ListsController.getTodo(list.id, item.id);

  const input = event.target;
  input.focus(); // Set focus on the input element

  // Add a blur event listener to the input element
  input.addEventListener('blur', () => {
    const currentValue = input.value.trim();

    // Update the item object with the new value
    const newItem = { ...selectedTodo, description: currentValue };
    ListsController.modifyTodoItem(list.id, selectedTodo, newItem);
    renderTodoList(ListsController.getList(list.id))
  });

  // Add a keydown event listener to the input element
  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent default behavior of Enter key

      const currentValue = input.value.trim();

      // Update the item object with the new value
      const newItem = { ...selectedTodo, description: currentValue };
      ListsController.modifyTodoItem(list.id, selectedTodo, newItem);
      input.blur(); // Trigger blur event to save changes
      renderTodoList(ListsController.getList(list.id))
    }
  });
}

const options = [
  { value: '3', label: 'High' },
  { value: '2', label: 'Medium' },
  { value: '1', label: 'Low' }
];

const changeDate = (event, todo, list) => {
  const selectedTodo = ListsController.getTodo(list.id, todo.id);

  const newDueDate = parseISO(event.target.value);
  const formattedDate = format(newDueDate, 'yyyy-MM-dd');
  const newItem = { ...selectedTodo, dueDate: formattedDate };
  ListsController.modifyTodoItem(list.id, selectedTodo, newItem);
  LCD.saveToStorage('lists', ListsController.getLists())
};

const handleExpandTask = (item, todos) => {
  const selectedTodo = ListsController.getTodo(todos.id, item.id);
  const todoDetailsDiv = document.querySelector(`#todo${selectedTodo.id}`)

  const todoDetailsComponent = () => {
    return html`
    <p><strong>Description:</strong> <input type="text" class="input is-rounded editable-text" 
    @click=${() => editDescription(selectedTodo, todos)} value="${selectedTodo.description}"/></p>

    <br>
    <label for="duedate${selectedTodo.id}"><strong>Due Date:</strong> <input id="duedate${selectedTodo.id}" name="duedate${selectedTodo.id}" type="date" value="${selectedTodo.dueDate}" @change=${(event) => changeDate(event, selectedTodo, todos)}></label>
    <label for="prio${selectedTodo.id}"><strong>Priority:</strong><span id="priority${selectedTodo.id}"></span></label>
    `
  }
  render(todoDetailsComponent(), todoDetailsDiv)
  renderSelect(selectedTodo, todos);
  todoDetailsDiv.classList.toggle('deployed')
};

const renderSelect = (item, list) => {
  const selectedTodo = ListsController.getTodo(list.id, item.id);
  const template = html`
    <div class="select is-rounded is-small">
      <select id="prio${selectedTodo.id}" @change=${(event) => handleChange(event, selectedTodo, list)}>
        ${options.map((option) => html`
          <option value=${option.value} ?selected=${option.value == selectedTodo.priority}>${option.label}</option>
        `)}
      </select>
    </div>
  `;
  render(template, document.querySelector("#priority" + selectedTodo.id));
};

const handleChange = (event, item, list) => {
  const selectedTodo = ListsController.getTodo(list.id, item.id);
  const selectedList = ListsController.getList(list.id)
  const selected = event.target.value;
  //update the todo priority

  const newItem = { ...selectedTodo, priority: selected };
  ListsController.modifyTodoItem(selectedList.id, selectedTodo, newItem);
  ////
  const listItem = document.querySelector(`#listitem${selectedTodo.id}`);
  listItem.className = `${selected == 3 ? 'is-flex-grow-1 has-background-danger-light' : 'has-background-light asd is-flex-grow-1'} ${selected == 2 ? 'is-flex-grow-1 has-background-warning-light' : 'has-background-light asd is-flex-grow-1'}`;
  const listDiv = document.querySelector(`#todo${selectedTodo.id}`);
  listDiv.className = `${selected == 3 ? 'not-deployed pl-6 has-background-danger-light p-2' : 'not-deployed pl-6 p-2'} ${selected == 2 ? 'not-deployed pl-6 has-background-warning-light p-2' : 'not-deployed pl-6 p-2'}`;
  //handleExpandTask(item, list);
  renderSelect(newItem, selectedList);
  //renderTodoList(ListsController.getList(list.name))
  LCD.saveToStorage('lists', ListsController.getLists())
};
/////////////////////////////////

function removeTodo(item, list) {
  const selectedTodo = ListsController.getTodo(list.id, item.id);

  ListsController.removeTodoItem(list.id, selectedTodo)
  renderTodoList(ListsController.getList(list.id))
}

const handleCheckboxChange = (event, todo, list) => {
  const selectedTodo = ListsController.getTodo(list.id, todo.id);

  const isChecked = event.target.checked;
  const newItem = { ...selectedTodo, isDone: isChecked };
  ListsController.modifyTodoItem(list.id, selectedTodo, newItem);
  renderTodoList(ListsController.getList(list.id))
};

const todoListComponent = (todos) => {
  return html`
    <ul id="taskList" class="menu-list"> 
    ${repeat(todos.items, (item) => item.title, (item, index) => html`
      <div class="is-flex is-flex-wrap-nowrap is-justify-content-space-between">
        <li id="listitem${item.id}" class="is-flex-grow-1 ${item.priority == 3 ? 'has-background-danger-light' : 'has-background-light'} ${item.priority == 2 ? 'has-background-warning-light' : 'has-background-light'}">
        <span class="material-symbols-outlined" style="cursor:pointer;" @click=${() => handleExpandTask(item, todos)}>
        expand_more
        </span>
        <input type="checkbox" name="done${item.id}" id="done${item.id}" ?checked=${item.isDone} @change=${(event) => handleCheckboxChange(event, item, todos)}>
        <input type="text" class="input subtitle editable-title" 
          @focus=${() => editTitle(item, todos)} value="${item.title}"/>
        </li>
        <button class="button is-danger is-outlined" @click=${() => removeTodo(item, todos)}>
          <span class="material-symbols-outlined">
            close
          </span>
        </button>
      </div>
      <div id="todo${item.id}" 
           class="not-deployed pl-6 ${item.priority == 3 ? 'has-background-danger-light' : ''} ${item.priority == 2 ? 'has-background-warning-light' : ''}
                              p-2" style="gap :5px;">
      </div>
      <br>
    `)}
    </ul>
        `;
}
  ;

const todoListTitleComponent = (todoList) => {
  return html`
    <p class="title"><span class="material-symbols-outlined">
arrow_forward_ios
</span><span id="currentTitle">${todoList.name}</span></p>
        `;
}
  ;

const handleClick = (item) => {
  //ListsController.getList(item.name);
  const newTask = document.querySelector("#taskinquestion");
  ListsController.getList(item.id).addItem(newTask.value, "", "", 1, false, item.name);
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

  LCD.saveToStorage('lists', ListsController.getLists())
}

function renderEarliestList() {
  if (ListsController.hasLists()) { //if there are lists
    const list = ListsController.getLists()[0];
    render(todoListTitleComponent(list), renderTasksTitleHere);
    render(todoListOptionsComponent(list), renderTasksOptionsHere);
    render(todoListComponent(list), renderTaskListHere);
  } else { //if there are no lists
    renderEmptyTodoList()
  }
  LCD.saveToStorage('lists', ListsController.getLists())
}

function renderEmptyTodoList() {
  render(html`<h1 class="title">Select or create a project!</h1>`, renderTasksTitleHere);
  render(html``, renderTasksOptionsHere);
  render(html`-`, renderTaskListHere);

  LCD.saveToStorage('lists', ListsController.getLists())
}

//returns false if there is no rendered list
function getRenderedList() {
  const renderedList = document.querySelector('#currentTitle');
  console.log(renderedList)
  if (renderedList) {
    return renderedList.textContent;
  }
  return false;
}


export { renderTodoList, getRenderedList, renderEmptyTodoList, renderEarliestList };