import { contentUpload } from "./api/api.js"
const button = document.querySelector(".test");

button.addEventListener("click", async(ev) => {
    ev.preventDefault();
    console.log("Дошло!");
    // const myContent = await contentUpload("../content/content.js");
    // console.log(myContent);
    // const films = await contentUpload("https://swapi.dev/api/films");
    // console.log(films);
    const [value, films] = await Promise.all([
        contentUpload("../content/content.js"),
        contentUpload("https://swapi.dev/api/films")
    ]);
    console.log(value);
    console.log(films);
})