import {
    addCaseTodos,
    getTodos,
    getTodo,
    deleteCaseFromTodos,
    updateCaseFromTodos
} from "./src/todo-app/api.js"
import {
    createAppTitle,
    createTodoItemForm,
    createTodoList,
    createTodoItem,
    toggleDisabled,
    buttonCase
} from "./src/todo-app/view.js"

let newArrayItemObject = [];
let arrayLocalItemString = "";

// Работа с локальным хранилищем
function addItemInLocal(localItemKey) {
    for (let i = 0; i <= newArrayItemObject.length; i++) {
        arrayLocalItemString = "";

        for (let i = 0; i < newArrayItemObject.length; i++) {
            arrayLocalItemString += JSON.stringify(newArrayItemObject[i]);
            if (i != newArrayItemObject.length - 1) {
                arrayLocalItemString += ",";
            };
        }
    };
    localStorage.setItem(localItemKey, arrayLocalItemString);
}

async function addTodoInStore(todo, store, { input, button } = item, key, realizationButton) {
    switch (store) {
        case "local":
            const todoListObjectLocal = {
                name: input.value,
                status: "not-done",
            };
            newArrayItemObject.push(todoListObjectLocal);
            addItemInLocal(key);
            realizationButton(todo);
            break;
        case "server":
            const todoListObjectServer = {
                name: input.value,
                owner: key,
                done: false,
            };
            const answer = await addCaseTodos(todoListObjectServer);
            realizationButton(todo, answer.id);
            break;
    }
    input.value = "";
    button.disabled = true;
}

function createTodoApp(container, title = "Список дел", localItemKey) {
    function startInfo(key) {
        const array = localStorage.getItem(key);
        if (array) {
            arrayLocalItemString = array.split("},");
            for (let i = 0; i < arrayLocalItemString.length; i++) {
                if (i != arrayLocalItemString.length - 1) {
                    arrayLocalItemString[i] += "}";
                }
                newArrayItemObject.push(JSON.parse(arrayLocalItemString[i]));
            };
        }
        if (!localStorage.key("caseTodos")) {
            localStorage.setItem("caseTodos", "local");
            switchCase(localStorage.getItem("caseTodos"));
        } else {
            switch (localStorage.getItem("caseTodos")) {
                case "local":
                    buttonCase.innerHTML = "Список дел загружается локально";
                    break;
                case "server":
                    buttonCase.innerHTML = "Список дел загружается c сервера";
                    break;
            }
        }
    }
    startInfo(localItemKey);
    // Добавляем реализацию кнопкам
    function addButtonsImplementation({ doneButton, deleteButton, item } = item, id) {
        function toggleDoneStatus() {
            switch (localStorage.getItem("caseTodos")) {
                case "local":
                    item.classList.toggle("list-group-item-success");
                    for (let i = 0; i < newArrayItemObject.length; i++) {
                        if (newArrayItemObject[i].name == item.firstChild.data) {
                            if (newArrayItemObject[i].status == "done") {
                                newArrayItemObject[i].status = "not-done";
                            } else if (newArrayItemObject[i].status = "not-done") {
                                newArrayItemObject[i].status = "done";
                            }
                        }
                    };
                    addItemInLocal(localItemKey);
                    break;
                case "server":
                    getTodo(id)
                        .then((answer) => {
                            if (answer.done) {
                                updateCaseFromTodos(id, { "done": false })
                                    .then(() => {
                                        switchCase(localStorage.getItem("caseTodos"));
                                    })
                            } else {
                                updateCaseFromTodos(id, { "done": true })
                                    .then(() => {
                                        switchCase(localStorage.getItem("caseTodos"));
                                    })
                            }
                        });
                    break;
            }
        }

        function deleteItem() {
            if (confirm("Вы уверены что хотите удалить это дело?")) {
                switch (localStorage.getItem("caseTodos")) {
                    case "local":
                        for (let i = 0; i < newArrayItemObject.length; i++) {
                            if (newArrayItemObject[i].name == item.firstChild.data) {
                                if (newArrayItemObject.length == 1) {
                                    newArrayItemObject.pop();
                                } else {
                                    newArrayItemObject.splice(i, 1);
                                }
                            }
                        };
                        addItemInLocal(localItemKey);
                        break;
                    case "server":
                        deleteCaseFromTodos(id);
                        break;
                }
            };
            item.remove();
        }
        doneButton.addEventListener("click", toggleDoneStatus);
        deleteButton.addEventListener("click", deleteItem);
        todoList.append(item);
    }
    // СОздание нового дела в списке
    function createNewTodo({ form, input } = item, item) {
        function createTodo(ev) {
            ev.preventDefault();
            const todoItem = createTodoItem(input.value);
            addTodoInStore(todoItem, localStorage.getItem("caseTodos"), item, localItemKey, addButtonsImplementation);
        }
        form.addEventListener("submit", createTodo);
    }
    // Проходится по массиву и добавляем элементы списка
    function iteratingArray(array) {
        for (let item of array) {
            let todoItem;
            switch (localStorage.getItem("caseTodos")) {
                case "local":
                    todoItem = createTodoItem(item.name);
                    if (item.status == "done") {
                        todoItem.item.classList.toggle("list-group-item-success");
                    };
                    addButtonsImplementation(todoItem);
                    break;
                case "server":
                    todoItem = createTodoItem(item.name);
                    if (item.done) {
                        todoItem.item.classList.toggle("list-group-item-success");
                    };
                    addButtonsImplementation(todoItem, item.id);
                    break;
            }
        }
    }

    function switchCase(prop) {
        switch (prop) {
            case "local":
                iteratingArray(newArrayItemObject);
                break;
            case "server":
                getTodos(localItemKey)
                    .then(answer => {
                        const list = document.querySelector('.list-group');
                        list.innerHTML = " ";
                        iteratingArray(answer);
                    });
                break;
            default:
                return;
        }
    }

    function toggleCase(store) {
        switch (store) {
            case "local":
                localStorage.setItem("caseTodos", "server");
                buttonCase.innerHTML = "Список дел загружается c сервера";
                break;
            case "server":
                localStorage.setItem("caseTodos", "local");
                buttonCase.innerHTML = "Список дел загружается локально";
                break;
        }
    }

    function updateCase() {
        const list = document.querySelector('.list-group');
        list.innerHTML = " ";
        toggleCase(localStorage.getItem("caseTodos"));
        switchCase(localStorage.getItem("caseTodos"));
    }


    const todoAppTitle = createAppTitle(title);
    const todoItemForm = createTodoItemForm();
    const todoList = createTodoList();
    container.append(todoAppTitle);
    container.append(todoItemForm.form);
    container.append(todoList);

    buttonCase.addEventListener("click", updateCase);

    toggleDisabled(todoItemForm);
    switchCase(localStorage.getItem("caseTodos"));
    createNewTodo(todoItemForm, todoItemForm);
}
export { createTodoApp };