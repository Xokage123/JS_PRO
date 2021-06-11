export function calculateDiscount(price, percent) {
    try {
        const messages = [];
        if (typeof price !== "number") {
            messages.push("Вы ввели неправильно первое значение!!!");
        }
        if (typeof percent !== "number") {
            messages.push("Вы ввели неправильно второе значение!!!");
        }
        if (messages.length === 0) {
            return (price / 100) * percent;
        } else {
            const error = new TypeError();
            error.messages = messages;
            throw error;
        }
    } catch (error) {
        throw error
    }
}

export function getMarketingPrice(product) {
    const productObject = JSON.parse(product);
    try {
        if ("prices" in productObject) {
            return productObject.prices.marketingPrice
        } else {
            throw new Error();
        }
    } catch (error) {
        return null;
    }
}

// Функция имитирует неудачный запрос за картинкой
function fetchAvatarImage(userId) {
    return new Promise((resolve, reject) => {
        if (typeof userId === "string") {
            resolve({
                status: true,
                url: userId
            })
        } else {
            reject({
                status: false,
                url: "/images/default.jpg"
            });
        }
        // reject(new Error(`Error while fetching image for user with id ${userId}`));
    });
}

export async function getAvatarUrl(userId) {
    try {
        const image = await fetchAvatarImage(userId);
        return image.url;
    } catch (error) {
        return error.url;
    }
}