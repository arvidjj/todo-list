import {html, render} from 'lit-html';
import header from './components/header.js';
import TodoList from './objects/TodoList.js';
import Todo from './objects/Todo.js';
import {todoListComponent, todoListTitleComponent, todoListOptionsComponent}from './components/todotasks.js'
import * as TodoListsController from './objects/TodoListsController.js'

const headerDiv = document.querySelector('header')
const renderTaskListHere = document.querySelector('#tasks')
const renderTasksTitleHere = document.querySelector('#taskstitle')
const renderTasksOptionsHere = document.querySelector('#tasksoptions')

render(header(), headerDiv);

//TESTING//////
TodoListsController.createTodoList('Primera Lista')
const todo1 = new Todo('First task', 'learn how to code', '2023-05-33', 'high');
TodoListsController.addItemTodoList(todo1, 'Primera Lista')
//add a new todo
//////////////

render(todoListTitleComponent(TodoListsController.getTodoList('Primera Lista')), renderTasksTitleHere);
render(todoListOptionsComponent(TodoListsController.getTodoList('Primera Lista')), renderTasksOptionsHere);
render(todoListComponent(TodoListsController.getTodoList('Primera Lista')), renderTaskListHere);
