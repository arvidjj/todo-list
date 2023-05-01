import {html, render} from 'lit-html';
import header from './components/header.js';
import TodoList from './objects/TodoList.js';
import { ProjectListComponent, TodoListComponent } from './components/ProjectComponent.js';
import Todo from './objects/Todo.js';
import {todoListComponent, todoListTitleComponent, todoListOptionsComponent}from './components/todotasks.js'
import { PContainer } from './components/PContainer.js';

const headerDiv = document.querySelector('header')
const renderTaskListHere = document.querySelector('#tasks')
const renderTasksTitleHere = document.querySelector('#taskstitle')
const renderTasksOptionsHere = document.querySelector('#tasksoptions')

render(header(), headerDiv);

export const TodoLists = [];

export function getLists() {
  return TodoLists;
}

export function addTodoItem(listName, todoItem) {
    const list = TodoLists.find(list => list.name === listName);
    if (list) {
        list.addTodoItem(todoItem);
      const todoList = document.querySelector(`[data-list="${listName}"]`);
      if (todoList) {
        todoList.render();
      }
    }
  }
//TESTING//////
const project1 = new TodoList('Project 1')
const project2 = new TodoList('Project 2')

project1.addItem('First task', 'learn how to code', '2023-05-33', '3')

TodoLists.push(project1);
TodoLists.push(project2);
//add a new todo
//////////////

const projectList = document.querySelector('#project-list');
projectList.render();

render(todoListTitleComponent(project1), renderTasksTitleHere);
render(todoListOptionsComponent(project1), renderTasksOptionsHere);
render(todoListComponent(project1), renderTaskListHere);
