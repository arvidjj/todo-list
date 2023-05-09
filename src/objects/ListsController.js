import TodoList from './TodoList.js'
import Todo from './Todo.js'


export let todoLists = [];

export function getLists() {
    return todoLists;
}

export function hasLists() {
    if (todoLists.length === 0) {
        return false
    }
    return true;
}

//USE THIS WITH LOCALSTORAGE
export function setLists(lists) {
    const newTodoLists = [];
    
    lists.forEach(item => {
        const todoList = new TodoList(item.name);
        const todosInList = [];
        item.items.forEach(todo => {
            const todoItem = new Todo(todo.title, todo.description, todo.dueDate, todo.priority, todo.isDone, todo.inList);
            todosInList.push(todoItem)
        })
        todoList.setItems(todosInList);
        newTodoLists.push(todoList)
    });
    todoLists = newTodoLists;
}

export function getList(listId) {
    return todoLists.find(l => (l.id === listId));
}

export function getListByName(listname) {
    return todoLists.find(l => (l.name === listname));
}

export function getTodo(listId, todoId) {
    const list = todoLists.find(list => list.id === listId);
    return list.getTodoById(todoId)
}

export function addList(list) {
    todoLists.push(list)
}

export function addTodoItem(listId, todoItem) {
    const list = todoLists.find(list => list.id === listId);
    if (list) {
        list.addTodo(todoItem);
    }
}

export function addTodoItemByName(listName, todoItem) {
    const list = todoLists.find(list => list.name === listName);
    if (list) {
        list.addTodo(todoItem);
    }
}

export function removeTodoItem(listId, todoItem) {
    const list = todoLists.find(list => list.id === listId);
    if (list) {
        list.removeItem(todoItem);
    }
}

export function removeTodoItemByName(listName, todoItem) {
    const list = todoLists.find(list => list.name === listName);
    if (list) {
        list.removeItem(todoItem);
    }
}

export function removeTodoList(listId) {
    const index = this.todoLists.findIndex(list => list.id === listId);
    this.todoLists.splice(index, 1);
}

export function removeTodoListByName(listName) {
    const index = this.todoLists.findIndex(list => list.name === listName);
    this.todoLists.splice(index, 1);
}

export function modifyTodoItem(listId, todoItem, newTodoitem) {
    const list = todoLists.find(list => list.id === listId);
    list.modifyTodo(todoItem, newTodoitem);
}

export function modifyTodoItemByName(listName, todoItem, newTodoitem) {
    const list = todoLists.find(list => list.name === listName);
    list.modifyTodo(todoItem, newTodoitem);
}

export function addTodoList(name) {
    const list = new TodoList(name)
    this.addList(list)
}