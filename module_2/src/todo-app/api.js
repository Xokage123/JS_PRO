// Добавление дела в список
export async function addCaseTodos(object) {
    const answer = await fetch('http://localhost:3000/api/todos', {
        method: "POST",
        body: JSON.stringify(object),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    const todo = await answer.json();
    return todo;
}

// Дает конкретный список
export async function getTodos(owner) {
    const answer = await fetch('http://localhost:3000/api/todos', {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    let todos = await answer.json();
    todos = todos.filter((item) => item.owner === owner)
    return todos;
}

export async function deleteCaseFromTodos(id) {
    const answer = await fetch(`http://localhost:3000/api/todos/${id}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });
    const response = await answer.json();
    if (response.status === 404) console.log('Не удалось удалить дело, так как его не существует');
    const todos = await answer.json();
}

export async function updateCaseFromTodos(id, doneValue) {
    const answer = await fetch(`http://localhost:3000/api/todos/${id}`, {
        method: "PATCH",
        body: JSON.stringify(doneValue),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    const todos = await answer.json();
}

export async function getTodo(id) {
    const answer = await fetch(`http://localhost:3000/api/todos/${id}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    const todos = await answer.json();
    return todos;
}