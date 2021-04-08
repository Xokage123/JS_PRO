import { createTodoApp } from "../todo-app.js"
import {
    addCaseTodos,
    getTodos,
    deleteCaseFromTodos
} from "./todo-app/api.js"
import "./DOM.js"
const path = location.pathname.split('/')[1];
// addCaseTodos();
getTodos();
switch (path) {
    case "dad.html":
        createTodoApp(document.getElementById('todo-app'), 'Дела папы', 'Папа');
        break;
    case "mam.html":
        createTodoApp(document.getElementById('todo-app'), 'Дела мамы', 'Мама');
        break;
    case "":
    case "index.html":
        createTodoApp(document.getElementById('todo-app'), 'Мои дела', 'Я');
        break;
}