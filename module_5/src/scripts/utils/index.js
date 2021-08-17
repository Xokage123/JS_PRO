export function wait(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // reject(new FetchError('Ошибка'));
            resolve("Данные c сервера");
        }, ms);
    });

}