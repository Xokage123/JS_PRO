export function createAppTitle(title) {
    const appTitle = document.createElement("h2");
    appTitle.innerHTML = title;
    return appTitle;
}

export function createTodoItemForm() {
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

export function createTodoList() {
    const list = document.createElement("ul");
    list.classList.add("list-group");
    return list;
}

// Cоздание дела в списке
export function createTodoItem(name, id) {
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

export function toggleDisabled({ input, button } = item) {
    input.addEventListener("input", () => {
        if (!input.value) {
            button.disabled = true;
        } else {
            button.disabled = false;
        }
    })
}

const buttonCase = document.getElementById("load-case");
buttonCase.innerHTML = "Список дел загружается локально";
export { buttonCase };