import { createTodoApp } from "../todo-app.js"
// Путь
const path = location.pathname.split('/')[1];

// Хранилище
const container = document.getElementById('todo-app');
switch (path) {
    case "dad.html":
        createTodoApp(container, 'Дела папы', 'Dad');
        break;
    case "mam.html":
        createTodoApp(container, 'Дела мамы', 'Mom');
        break;
    case "":
    case "index.html":
        createTodoApp(container, 'Мои дела', 'I');
        break;
}