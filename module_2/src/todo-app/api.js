import myData from "../CONST.js";
// Что нужно чтоьбы добавить дело
const body = {
    name: "Dad Artemov Maksim",
    email: "maxartemDad0419@gmail.com",
    status: "Active",
    gender: "Male"
}

export async function addUser() {
    const answer = await fetch(myData.urlUser, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            'Authorization': `Bearer ${myData.bearer}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    const todos = await answer.json();
    console.log(answer);
    console.log(todos);
}

export async function addCaseTodos() {
    const answer = await fetch(myData.urlMyTodos, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            'Authorization': `Bearer ${myData.bearer}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    const todos = await answer.json();
    console.log(answer);
    console.log(todos);
}

export async function getTodos() {
    const answer = await fetch(myData.urlMyTodos, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${myData.bearer}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    const todos = await answer.json();
    console.log(todos);
}

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
    console.log(todos);
}