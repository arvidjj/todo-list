import TodoList from './TodoList.js';
import Todo from './Todo.js';

let TodosList = [];

export const createTodoList = (name) => {
    const todoList = new TodoList(name);
    TodosList.push(todoList);
}

export const addItemTodoList = (item, list) => {
    const lista = TodosList.find((item) => item.name = list)
    lista.addTodo(item)
}

export const getTodoList = (list) => {
    //console.log(list)
    return TodosList.find((item) => item.name = list)
}

export const printTodoLists = () => {
    TodosList.forEach(i => console.log(i));
}