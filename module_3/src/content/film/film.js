import {
    contentUpload,
    API_laodFilm
} from "../../api/api.js"

const titleStartPage = document.querySelector(".title");

// Подпись на кнопе вернуться назад
const BACK__CONTENT = "Back to episodes";
// Подпись загловка
const PLANET__TITLE = "Planets";
const SPECIES__TITLE = "Species";

export const createPageWithMovie = async(number, container) => {
    const infoFilm = await API_laodFilm(number);
    const buttonBack = document.createElement("button");
    buttonBack.classList.add("btn");
    buttonBack.classList.add("btn-secondary");
    buttonBack.innerHTML = BACK__CONTENT;

    function handleBack(ev) {
        ev.preventDefault();
        container.innerHTML = "";
        history.back();
    }
    buttonBack.addEventListener('click', handleBack);
    // Секция с информацией
    const card = document.createElement("div");
    card.classList.add("card");
    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    titleStartPage.classList.add("card-title");
    titleStartPage.innerHTML = infoFilm.title;
    const cardText = document.createElement("p");
    cardText.classList.add("card-text");
    cardText.innerHTML = infoFilm.opening_crawl;
    const planetTitle = document.createElement("h2");
    planetTitle.classList.add("planet-title");
    planetTitle.innerHTML = `${PLANET__TITLE} (Планеты, представленные в данном фильме)`;
    const planetList = document.createElement("ol");
    planetList.classList.add("planet-list");
    const speciesTitle = document.createElement("h2");
    speciesTitle.classList.add("species-title");
    speciesTitle.innerHTML = `${SPECIES__TITLE} (Рассы, представленные в данном фильме)`;
    const speciesList = document.createElement("ol");
    speciesList.classList.add("species-list");
    // Добавляем планеты
    Promise.all([].concat(infoFilm.planets.map((element) => {
        return contentUpload(element);
    }), infoFilm.species.map((element) => {
        return contentUpload(element);
    }))).then((answer) => {
        for (let element of answer) {
            if (element.rotation_period) {
                const planetItem = document.createElement("li");
                planetItem.classList.add("planet-item");
                planetItem.innerHTML = element.name;
                planetList.append(planetItem);
            } else if (element.language) {
                const spaciesItem = document.createElement("li");
                spaciesItem.classList.add("species-item");
                spaciesItem.innerHTML = element.name;
                speciesList.append(spaciesItem);
            }
        }
    });
    container.append(buttonBack);
    cardBody.append(cardText);
    cardBody.append(planetTitle);
    cardBody.append(planetList);
    cardBody.append(speciesTitle);
    cardBody.append(speciesList);
    card.append(cardBody);
    container.append(card);
}