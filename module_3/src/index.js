import { contentUpload } from "./api/api.js"
// import { createPageWithMovie } from "./content/film/film.js"
const main = document.querySelector(".main");

const titleStartPage = document.querySelector(".title");
const startTitle = "Эписоды звездных войн";

const searcPerams = new URLSearchParams(location.search);

window.addEventListener('popstate', (ev) => {
    titleStartPage.innerHTML = startTitle;
    Promise.all([
        contentUpload("../content/content.js"),
        contentUpload("https://swapi.dev/api/films"),
        contentUpload("https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css"),
    ]).then(createList);
})

function createList([content, films] = answer) {
    films.results.map(element => {
        switch (element.episode_id) {
            case 4:
                element.number = 1;
                break;
            case 5:
                element.number = 2;
                break;
            case 6:
                element.number = 3;
                break;
            case 1:
                element.number = 4;
                break;
            case 2:
                element.number = 5;
                break;
            case 3:
                element.number = 6;
                break;
        }
    });

    content.createListFilms(main, films.results);
};
if (searcPerams.has("film")) {
    Promise.all([
        contentUpload("../content/film/film.js"),
        contentUpload("https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css")
    ]).then((film) => {
        film[0].createPageWithMovie(searcPerams.get("film"), main)
    })
} else {
    Promise.all([
        contentUpload("../content/content.js"),
        contentUpload("https://swapi.dev/api/films"),
        contentUpload("https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css"),
    ]).then(createList);
}