import { html, render } from 'lit-html';
import { renderTodoList }from './TodoTasks.js'

import * as ListsController from '../objects/ListsController.js'

const handleClick = (item) => {
  renderTodoList(ListsController.getList(item.name));
  console.log(`You clicked ${item.name}`);
};

export const ProjectList = (items) => html`
  <ul class="">
    ${items.map((item) => html`
      <li style="cursor:pointer;" @click=${() => handleClick(item)}>${item.name}</li>
    `)}
  </ul>
`;
