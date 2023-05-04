import TodoList from './TodoList.js'
import { Todo } from './Todo.js'


export const todoLists = [];

export function getLists() {
    return todoLists;
}

export function getList(listname) {
    return todoLists.find(l => (l.name === listname));
}

export function addList(list) {
    todoLists.push(list)
}

export function addTodoItem(listName, todoItem) {
    const list = todoLists.find(list => list.name === listName);
    if (list) {
        list.addTodo(todoItem);
        //const todoList = document.querySelector(`[data-list="${listName}"]`);
        //if (todoList) {
        //  todoList.render();
        //}
    }
}
export function modifyTodoItem(listName, todoItem, newTodoitem) {
    const list = todoLists.find(list => list.name === listName);
    list.modifyTodo(todoItem, newTodoitem);
}

export function addTodoList(name) {
    const list = new TodoList(name)
    this.addList(list)
}