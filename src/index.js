import {html, render} from 'lit-html';
import renderHeader from './components/header.js';
import TodoList from './objects/TodoList.js';
import Todo from './objects/Todo.js';

const headerDiv = document.querySelector('header')
renderHeader(headerDiv);
//TESTING
const todoList = new TodoList('PrimeraLista');
const todo1 = new Todo('First task', 'learn how to code', '2023-05-33', 'high');
//add a new todo
todoList.addTodo(todo1);

//remove an existing todo
todoList.removeItem(0);