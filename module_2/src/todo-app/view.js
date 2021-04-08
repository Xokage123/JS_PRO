let newArrayItemObject = [];
let arrayLocalItemString = "";

function addItemInLocal(localItemKey) {
    for (let i = 0; i < newArrayItemObject.length; i++) {
        arrayLocalItemString = "";

        for (let i = 0; i < newArrayItemObject.length; i++) {
            arrayLocalItemString += JSON.stringify(newArrayItemObject[i]);
            if (i != newArrayItemObject.length - 1) {
                arrayLocalItemString += ",";
            };
        }
    };

    if (newArrayItemObject.length == 0) {
        localStorage.removeItem(localItemKey);
    } else {
        localStorage.setItem(localItemKey, arrayLocalItemString);
    }
}

function createAppTitle(title) {
    const appTitle = document.createElement("h2");
    appTitle.innerHTML = title;
    return appTitle;
}

function createTodoItemForm() {
    const form = document.createElement("form");
    const input = document.createElement("input");
    const buttonWrapper = document.createElement("div");
    const button = document.createElement("button");

    form.classList.add('input-group', 'mb-3');
    input.classList.add('form-control');
    input.placeholder = 'Введите название нового дела';
    buttonWrapper.classList.add('input-group-append');
    button.classList.add('btn', 'btn-primary');
    button.disabled = true;
    button.textContent = "Добавить имя";

    buttonWrapper.append(button);
    form.append(input);
    form.append(buttonWrapper);

    return {
        form,
        input,
        button
    }
}

function createTodoList() {
    const list = document.createElement("ul");
    list.classList.add("list-group");
    return list;
}

function createTodoApp(container, title = "Список дел", localItemKey) {
    // Загружаем из хранилища все данные строкой
    const localItem = localStorage.getItem(localItemKey);
    // Проверяем, если ты значение в кейсе
    if (localItem) {
        arrayLocalItemString = localItem.split("},");
        for (let i = 0; i < arrayLocalItemString.length; i++) {
            if (i != arrayLocalItemString.length - 1) {
                arrayLocalItemString[i] += "}";
            }
            newArrayItemObject.push(JSON.parse(arrayLocalItemString[i]));
        };
    } else {
        arrayLocalItemString = [];
    }

    const todoAppTitle = createAppTitle(title);
    const todoItemForm = createTodoItemForm();
    const todoList = createTodoList();

    container.append(todoAppTitle);
    container.append(todoItemForm.form);
    container.append(todoList);

    for (let i = 0; i < newArrayItemObject.length; i++) {
        const todoItem = createTodoItem(newArrayItemObject[i].name);

        if (newArrayItemObject[i].status == "done") {
            todoItem.item.classList.toggle("list-group-item-success");
        };

        todoItem.doneButton.addEventListener("click", (ev) => {
            todoItem.item.classList.toggle("list-group-item-success");
            for (let i = 0; i < newArrayItemObject.length; i++) {
                if (newArrayItemObject[i].name == todoItem.item.firstChild.data) {
                    if (newArrayItemObject[i].status == "done") {
                        newArrayItemObject[i].status = "not-done";
                    } else if (newArrayItemObject[i].status = "not-done") {
                        newArrayItemObject[i].status = "done";
                    }
                }
            };
            addItemInLocal(localItemKey);
        })
        todoItem.deleteButton.addEventListener("click", (ev) => {
            if (confirm("Вы уверены что хотите удалить это дело?")) {
                for (let i = 0; i < newArrayItemObject.length; i++) {
                    if (newArrayItemObject[i].name == todoItem.item.firstChild.data) {
                        if (newArrayItemObject.length == 1) {
                            newArrayItemObject.pop();
                        } else {
                            newArrayItemObject.splice(i - 1, 1);
                        }
                    }
                };
                addItemInLocal(localItemKey);
                todoItem.item.remove();
            };
        });
        todoList.append(todoItem.item);
    }

    todoItemForm.input.addEventListener("input", (ev) => {
        if (!todoItemForm.input.value) {
            todoItemForm.button.disabled = true;
        } else {
            todoItemForm.button.disabled = false;
        }
    })

    todoItemForm.form.addEventListener("submit", (ev) => {
        ev.preventDefault();

        if (!todoItemForm.input.value) {
            return;
        }

        const todoItem = createTodoItem(todoItemForm.input.value);

        todoItem.doneButton.addEventListener("click", (ev) => {
            todoItem.item.classList.toggle("list-group-item-success");
            for (let i = 0; i < newArrayItemObject.length; i++) {
                if (newArrayItemObject[i].name == todoItem.item.firstChild.data) {
                    if (newArrayItemObject[i].status == "done") {
                        newArrayItemObject[i].status = "not-done";
                    } else if (newArrayItemObject[i].status = "not-done") {
                        newArrayItemObject[i].status = "done";
                    }
                }
            };
            addItemInLocal(localItemKey);
        })
        todoItem.deleteButton.addEventListener("click", (ev) => {
            if (confirm("Вы уверены что хотите удалить это дело?")) {
                for (let i = 0; i < newArrayItemObject.length; i++) {
                    if (newArrayItemObject[i].name == todoItem.item.firstChild.data) {
                        if (newArrayItemObject.length == 1) {
                            newArrayItemObject.pop();
                        } else {
                            newArrayItemObject.splice(i - 1, 1);
                        }
                    }
                };
                addItemInLocal(localItemKey);
                todoItem.item.remove();
            };
        })

        todoList.append(todoItem.item);

        const todoListObject = {
            name: todoItemForm.input.value,
            status: "not-done",
        }

        newArrayItemObject.push(todoListObject);

        addItemInLocal(localItemKey);

        todoItemForm.input.value = "";
        todoItemForm.button.disabled = true;
    })
}

function createTodoItem(name) {
    const item = document.createElement("li");
    const buttonGroup = document.createElement("div");
    const doneButton = document.createElement("button");
    const deleteButton = document.createElement("button");

    item.classList.add("list-group-item", "d-flex", "justify-content-between", "alogn-item-center");
    item.textContent = name;

    buttonGroup.classList.add("btn-group", "btn-group-sm");
    doneButton.classList.add("btn", "btn-success");
    doneButton.textContent = "Готово";
    deleteButton.classList.add("btn", "btn-danger");
    deleteButton.textContent = "Удалить";

    buttonGroup.append(doneButton);
    buttonGroup.append(deleteButton);
    item.append(buttonGroup);

    return {
        item,
        doneButton,
        deleteButton
    }
}
export { createTodoApp };