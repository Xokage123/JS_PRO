import myData from "../CONST.js";

// Добавление дела в список
export async function addCaseTodos(urlPerson, deal) {
    const answer = await fetch(urlPerson, {
        method: "POST",
        body: JSON.stringify(deal),
        headers: {
            'Authorization': `Bearer ${myData.bearer}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    const todos = await answer.json();
    return todos;
}

// Дает конкретный список
export async function getTodos(urlPerson) {
    const answer = await fetch(urlPerson, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${myData.bearer}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    const todos = await answer.json();
    if (todos.code == 200) {
        return todos.data;
    }
}

// for (let i = 2016; i <= 2021; i++) {
//     deleteCaseFromTodos(i);
// }

export async function deleteCaseFromTodos(id) {
    const answer = await fetch(`https://gorest.co.in/public-api/todos/${id}`, {
        method: "DELETE",
        headers: {
            'Authorization': `Bearer ${myData.bearer}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    const todos = await answer.json();
}

export async function updateCaseFromTodos(id, deal) {
    const answer = await fetch(`https://gorest.co.in/public-api/todos/${id}`, {
        method: "PATCH",
        body: JSON.stringify(deal),
        headers: {
            'Authorization': `Bearer ${myData.bearer}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    const todos = await answer.json();
}

export async function getTodo(id) {
    const answer = await fetch(`https://gorest.co.in/public-api/todos/${id}`, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${myData.bearer}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    const todos = await answer.json();
    return todos;
}