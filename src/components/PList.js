import { html, render } from 'lit-html';

const handleClick = (item) => {
  console.log(`You clicked ${item.name}`);
};

export const ProjectList = (items) => html`
  <ul class="">
    ${items.map((item) => html`
      <li style="cursor:pointer;" @click=${() => handleClick(item)}>${item.name}</li>
    `)}
  </ul>
`;
