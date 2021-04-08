const buttonCase = document.getElementById("load-case");
buttonCase.setAttribute("data-case", "local");
buttonCase.innerHTML = "Список дел загружается локально";

function toggleCase(ev) {
    ev.preventDefault();
    switch (buttonCase.getAttribute("data-case")) {
        case "local":
            buttonCase.setAttribute("data-case", "server");
            buttonCase.innerHTML = "Список дел загружается c сервера";
            break;
        case "server":
            buttonCase.setAttribute("data-case", "local");
            buttonCase.innerHTML = "Список дел загружается локально";
            break;
    }

}

buttonCase.addEventListener("click", toggleCase)