import { contentUpload } from "../api/api.js"

function goToInfoFilm(url, container) {
    history.pushState(null, '', url);
    container.innerHTML = "";
    const searchParams = new URLSearchParams(location.search);
    contentUpload("../content/film/film.js")
        .then(answer => {
            answer.createPageWithMovie(searchParams.get("film"), container);
        })
}

export function createListFilms(container, elements) {
    const list = document.createElement('ul');
    list.classList.add("films__list");
    for (let film of elements) {
        const item = document.createElement("li");
        const linkFilms = document.createElement("a");
        linkFilms.href = `${location.href}?film=${film.number}`;
        linkFilms.innerHTML = film.title;
        linkFilms.addEventListener("click", (ev) => {
            ev.preventDefault();
            goToInfoFilm(linkFilms.href, container);
        });
        item.append(linkFilms);
        list.append(item);
    }
    container.append(list);
}