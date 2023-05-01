import { html, render } from "lit-html";
import { repeat } from 'lit-html/directives/repeat.js';
import TodoList from '../objects/TodoList.js';
import Todo from '../objects/Todo.js';

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
    //console.log(todoList)
    return html`
    <p class="title"><span class="material-symbols-outlined">
arrow_forward_ios
</span>${todoList.name}</p>
        `;
}
    ;

const clickHandler = {
    // handleEvent method is required.
    handleEvent(e) {
        const Lista = document.querySelector("#taskinquestion")
        if (taskinquestion.value) {
            console.log(taskinquestion.value);
            const newtodo = new Todo(taskinquestion.value, '', '', '1');
        }
    },
    // event listener objects can also define zero or more of the event
    // listener options: capture, passive, and once.
    capture: true,
};

const todoListOptionsComponent = (todoList) => {
    return html`
    <div class="field has-addons mb-2">
  <div class="control">
    <input class="input" type="text" placeholder="Task 1..." id="taskinquestion">
  </div>
  <div class="control">
    <a class="button is-success" @click=${clickHandler}>
    <span class="material-symbols-outlined">
    add
    </span>Add
    </a>
  </div>
</div>
    
     `;
}
    ;

export { todoListComponent, todoListTitleComponent, todoListOptionsComponent };