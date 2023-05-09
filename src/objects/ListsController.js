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
    }
}

export function removeTodoItem(listName, todoItem) {
    const list = todoLists.find(list => list.name === listName);
    if (list) {
        list.removeItem(todoItem);
    }
}

export function removeTodoList(listName) {
    const index = this.todoLists.findIndex(list => list.name === listName);
    this.todoLists.splice(index, 1);
}

export function modifyTodoItem(listName, todoItem, newTodoitem) {
    const list = todoLists.find(list => list.name === listName);
    list.modifyTodo(todoItem, newTodoitem);
}

export function addTodoList(name) {
    const list = new TodoList(name)
    this.addList(list)
}