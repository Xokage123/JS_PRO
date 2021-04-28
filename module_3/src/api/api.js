const cssTest = {};

// Функция для подгрузки контента
export async function contentUpload(url) {
    if (url.endsWith(".js")) {
        console.log("Загружаю файл скрипт")
        return import (url);
    } else if (url.endsWith(".css")) {
        if (cssTest[url]) {
            return;
        } else {
            cssTest[url] = url;
            const link = document.createElement("link");
            link.href = url;
            link.rel = "stylesheet";
            document.head.append(link);
        }
    } else {
        const answer = await fetch(url);
        return await answer.json();
    }
}

export async function API_laodFilm(number) {
    const answer = await fetch(`https://swapi.dev/api/films/${number}`, {
        method: "GET"
    });
    const infoFilm = answer.json();
    return infoFilm;
}