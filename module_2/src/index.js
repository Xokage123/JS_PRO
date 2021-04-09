import { createTodoApp } from "../todo-app.js"
import myData from "./CONST.js";

// Путь
const path = location.pathname.split('/')[1];
// Хранилище
const container = document.getElementById('todo-app');
switch (path) {
    case "dad.html":
        createTodoApp(container, 'Дела папы', 'Dad', myData.urlDadTodos);
        break;
    case "mam.html":
        createTodoApp(container, 'Дела мамы', 'Mom', myData.urlMomTodos);
        break;
    case "":
    case "index.html":
        createTodoApp(container, 'Мои дела', 'I', myData.urlMyTodos);
        break;
}