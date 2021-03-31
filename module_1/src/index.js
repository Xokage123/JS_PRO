"use strict"

// Задание 1

// Кнопка
const dropdownButton = document.getElementById("dropdownMenuButton");
// Меню
const dropdownMenu = document.querySelector(".dropdown-menu");
function openMenu (ev) {
  ev.preventDefault();
  ev._checkPick = true;
  dropdownMenu.style.display = 'block';
}
function closeMenu (ev) {
  ev.preventDefault();
  const value = ev.target.className;
  if (value === "dropdown-menu" || value === "dropdown-item") {
    return null;
  } else if (!ev._checkPick) {
    dropdownMenu.style.display = 'none';
  }
}
window.addEventListener("click", closeMenu);
// Вешаем обработчик события на кнопку
dropdownButton.addEventListener("click", openMenu)

// Задание 2
const form = document.getElementById("form");
const inputName = document.getElementById("form__name");
const inputFirstName = document.getElementById("form__first-name");
const inputSecondName = document.getElementById("form__second-name");
const buttonSubmit = document.getElementById("form-submit");

function checkingFields (ev) {
  ev.preventDefault();
  // Массив для хранения букв, проходящтх проверку
  let sword = "";
  for (let letter of ev.target.value) {
    if (letter === " " || letter === "-") {
      sword = sword + letter;
    } else {
      if(isKyr(letter)) {
        sword = sword + letter;
      }
    }
  }

  function checkStart () {
    if (sword.startsWith("-") || sword.startsWith(" ")) {
      sword = sword.slice(1);
      checkStart();
    }
  }
  function checkEnd () {
    if (sword.endsWith("-") || sword.endsWith(" ")) {
      sword = sword.slice(0, -1);
      checkEnd()
    }
  }
  checkStart();
  checkEnd();
  // Соединяем пробелы в 1
  sword = sword.replace(/\s+/g, ' ');
  // Соеднияем дефисы в 1
  sword = sword.replace(/(-)+/g, '-');
  sword.trim();
  let firstLetter = sword.slice(0, 1);
  let letter = sword.slice(1);
  firstLetter = firstLetter.toUpperCase();
  letter = letter.toLowerCase();
  sword = `${firstLetter}${letter}`;
  ev.target.value = sword;
}
// Проверка на кирилицу
const isKyr = function (str) {
  return /[а-я]/i.test(str);
}
// Проверка ввода с кливиатуры символов
function checkValue (ev) {
  ev.preventDefault();
  ev.target.value = ev.target.value.replace(/[a-z0-9]/i, "");
}
// Добавление обзазца и очищение полей
function addInitial (ev) {
  ev.preventDefault();
  const name = inputName.value;
  const firstName = inputFirstName.value;
  const secondName = inputSecondName.value;
  console.log(name);
  console.log(firstName);
  console.log(secondName);
  if (name && firstName && secondName) {
    inputName.value = " ";
    inputFirstName.value = " ";
    inputSecondName.value = " ";
    const initial = `${firstName} ${name} ${secondName}`;
    const newInitial = document.createElement("p");
    newInitial.innerHTML = initial;
    form.after(newInitial);
    console.log(initial);
  } else {
    alert("Вы что то не ввели! Проверьте все поля!");
    throw new Error("Вы что то не ввели!");
  }
}

inputName.addEventListener("blur", checkingFields);
inputFirstName.addEventListener("blur", checkingFields);
inputSecondName.addEventListener("blur", checkingFields);
inputName.addEventListener("keyup", checkValue);
inputFirstName.addEventListener("keyup", checkValue);
inputSecondName.addEventListener("keyup", checkValue);
buttonSubmit.addEventListener("click", addInitial);

// Задание 3

const buttonScrollTop = document.querySelector(".scroll-top__button");
buttonScrollTop.addEventListener("click", goTop)

function goTop (ev) {
  ev.preventDefault();
  if (!(window.pageYOffset === 0)) {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

window.addEventListener("scroll", ev => {
  if (window.pageYOffset >= 100) {
    buttonScrollTop.style.display = "block";
  } else {
    buttonScrollTop.style.display = "none";
  }
},{
  passive: true
})
