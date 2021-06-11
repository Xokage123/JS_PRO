const titleHeader = document.querySelector(".header__title");
const listProducts = document.querySelector(".catalog__list");
const lietErrors = document.querySelector(".errors__list");

const ERROR_200 = "Произошла ошибка, попробуйте обновить страницу позже";
const ERROR_404 = "Список товаров пуст";
const ERROR_500 = "Произошла ошибка, попробуйте обновить страницу позже";
const INFO_ONLINE = "Ваше устройство подключено к интернету!!!";
const INFO_OFFLINE = "Ваше устройство не имеет подключения к интернету!!!";

const loadSpiner = document.createElement("div");
loadSpiner.style = "display: flex";
loadSpiner.innerHTML = `
<div class="spinner-border" role="status">
<span class="visually-hidden">Loading...</span>
</div>
<p class="load__text">...Идет загрузка, подождите</p>
`

window.addEventListener("online", () => generateErrorItem(navigator.onLine ? INFO_ONLINE : INFO_OFFLINE, navigator.onLine));
window.addEventListener("offline", () => generateErrorItem(navigator.onLine ? INFO_ONLINE : INFO_OFFLINE, navigator.onLine));

const loadContent = async() => {
    listProducts.append(loadSpiner);
    let codeStatus;
    try {
        const data = await fetch("/api/products");
        codeStatus = data.status;
        if (codeStatus === 200) {
            const answer = await data.json();
            return answer;
        } else if (codeStatus === 404) {
            throw new Error(data.status);
        } else if (codeStatus === 500) {
            throw new Error(data.status);
        }
    } catch (error) {
        throw new Error(codeStatus);
    }
}

function createListProducts(answer) {
    answer.products.forEach((element) => {
        const itemProducts = document.createElement("li");
        itemProducts.classList.add("card", "catalog__item");
        itemProducts.innerHTML = `
        <div class="card-body">
        <h5 class="card-title">${element.name}</h5>
        <img src=${element.image} class="card-img-top mb-2" alt="photo">
        <h6 class="card-subtitle text-muted">Price: ${element.price}</h6>
        </div>
        `;
        listProducts.append(itemProducts);
    });
}

function generateErrorItem(content, online) {
    const errorMessage = document.createElement("li");
    errorMessage.classList.add("errors__item", online ? "good" : "bad");
    errorMessage.innerHTML = content;
    lietErrors.append(errorMessage);
    setTimeout(() => {
        errorMessage.remove();
    }, 5000)
}

loadContent()
    .then(createListProducts)
    .catch((error) => {
        const codeError = Number(error.message);
        switch (codeError) {
            case 200:
                generateErrorItem(ERROR_200);
                break;
            case 404:
                titleHeader.innerHTML = ERROR_404;
                generateErrorItem(ERROR_404);
                break;
            case 500:
                loadContent()
                    .then(createListProducts)
                    .catch(() => {
                        generateErrorItem(ERROR_500);
                        loadContent()
                            .then(createListProducts)
                            .catch(() => {
                                generateErrorItem(ERROR_500);
                            })
                    })
                break;
            default:
                return null;
        }
    })
    .finally(() => {
        loadSpiner.remove();
    });
