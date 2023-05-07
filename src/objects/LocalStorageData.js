import * as ListsController from '../objects/ListsController.js'

export const saveToStorage = (key, value) => {
    const taskJson = JSON.stringify(value);
    localStorage.setItem(key, taskJson);
};

export const getStorage = (key) => {
    return localStorage.getItem(key)
};

export function loadLists() {
    const listsJson = localStorage.getItem('lists');
    if (listsJson) {
        return JSON.parse(listsJson);
    }
}

export function loadTodos() {
    const todosJSON = localStorage.getItem('todos');
    if (todosJSON) {
        const parsed = JSON.parse(todosJSON);
        parsed.array.forEach(item => {
            ListsController.addTodoItem(item[inList], item)
        });
    }
}