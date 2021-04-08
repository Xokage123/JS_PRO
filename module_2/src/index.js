import { createTodoApp } from "../todo-app.js";

const path = location.pathname.split('/')[1];
switch (path) {
    case "dad.html":
        createTodoApp(document.getElementById('todo-app'), 'Дела папы', 'Папа');
        break;
    case "mam.html":
        createTodoApp(document.getElementById('todo-app'), 'Дела мамы', 'Мама');
        break;
    case "index.html":
        createTodoApp(document.getElementById('todo-app'), 'Мои дела', 'Я');
        break;
}