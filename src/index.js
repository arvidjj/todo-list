import {html, render} from 'lit-html';
import './style/main.css';
import header from './components/Header.js';
import TodoList from './objects/TodoList.js';
import Todo from './objects/Todo.js';
import { renderTodoList }from './components/TodoTasks.js'
import { renderProjectList } from './components/PList.js';

import * as ListsController from './objects/ListsController.js'

const headerDiv = document.querySelector('header')
const renderProjectListHere = document.querySelector('#projectlist')
const renderProjectAddHere = document.querySelector('#addproject')

render(header(), headerDiv);


//TESTING//////
const project1 = new TodoList('Project 1')
const project2 = new TodoList('Project 2')

project1.addItem('First task', 'learn how to code', '2023-05-25', '3')

ListsController.addList(project1);
ListsController.addList(project2);
//add a new todo
//////////////

///////////////////// EJEMPLO
renderProjectList();

renderTodoList(ListsController.getList('Project 1'));
