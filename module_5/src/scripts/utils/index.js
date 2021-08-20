export function wait(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // reject(new FetchError('Ошибка'));
            resolve("Какие то данные с севрера");
        }, ms);
    });

}