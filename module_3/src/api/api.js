// Функция для подгрузки контента
export async function contentUpload(url, params) {
    if (url.endsWith(".js")) {
        console.log("Загружаю файл скрипт")
        return import (url);
    } else if (url.endsWith(".css")) {

    } else {
        const answer = await fetch(url);
        return await answer.json();
    }
}