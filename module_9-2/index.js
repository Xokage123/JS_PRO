"use strict";

(() => {
	// Кнопка начать игру
	const $Bstart = $(".start-parametr_form_button-start");
	// Кнопка закончить игру
	const $Bend = $(".start-parametr_form_button-end");
	// Инпут куда рользователь задает количество карт по вертикали
	const $numberV = $(".start-parametr_form_vertical");
	// Инпут куда рользователь задает количество карт по горизонтали
	const $numberG = $(".start-parametr_form_gorizontal");
	// Секция где отображается счетчик времени
	const $timerValue = $(".start-parametr_timer_value");
	// Секция с полем
	const $field = $(".game-field");
	// Массив со всеми карточками как html элементами
	let allCards = [];
	// Создаем массив для хранения чисел на карточках
	let cardsArray = [];
	// Инициализируем счетчик
	let secondCounter = null;
	//Счетчик
	let counter = 0;

	// Объекты хранящий информацию о первой выбранной карточке
	const firstCard = {
		// Элемент который выбрали первым
		element: null,
		// Выбрали ли первый элемент
		pick: false,
		// Значение этой карточки
		value: null,
	};
	// Массив с элементами и значениями карт
	let arrayCardsObject = [];
	let cardGuessed = 0;

	$timerValue.text(counter);

	// Функция выбирающая карты
	const selectionCard = (ev, element) => {
		for (let card of arrayCardsObject) {
			if (card.element == element) {
				element.innerHTML = card.value;
			}
		}
		if (!firstCard.pick) {
			firstCard.element = element;
			firstCard.pick = true;
			firstCard.value = Number(ev.currentTarget.innerHTML);
		} else if (firstCard.pick) {
			if (firstCard.value == Number(ev.currentTarget.innerHTML)) {
				setTimeout(() => {
					firstCard.pick = false;
					firstCard.value = null;
					cardGuessed++;
					if (cardGuessed == (($numberV.value * $numberG.value) / 2)) {
						alert("Поздравляю, вы отгадали все числа!");
						endGame();
					}
				}, 300)
			} else {
				setTimeout(() => {
					firstCard.element.innerHTML = " ";
					element.innerHTML = " ";
					firstCard.pick = false;
					firstCard.value = null;
				}, 300)
			}
		}
	}
	// Функция создающая архива карт
	const createCards = (row, column) => {
		// Создаем каунтер чтобы отслеживать 
		let counterCards = 0;
		// Мешаем массив
		cardsArray = shuffle(cardsArray);
		for (let i = 0; i < row; i++) {
			// Создаем новую строчку
			let newRow = document.createElement("div");
			newRow.classList.add("game-field_row");
			for (let t = 0; t < column; t++) {
				let newColumn = document.createElement("div");
				newColumn.classList.add("game-field_card");
				newRow.append(newColumn)
			}
			$field.append(newRow);
		};
		// Заполняем массив со всеми карточками в HTML
		allCards = document.querySelectorAll(".game-field_card");

		allCards.forEach((element) => {
			const infoCard = {
				element,
				value: cardsArray[counterCards++]
			}
			arrayCardsObject.push(infoCard);
			$(element).on("click", ev => selectionCard(ev, element));
		});
	}
	// Функция перемешивающая колоду
	const shuffle = array => {
		let copy = [];
		let n = array.length;
		let element;
		while (n) {
			// Pick a remaining element…
			element = Math.floor(Math.random() * n--);
			// And move it to the new array.
			copy.push(array.splice(element, 1)[0]);
		}
		return copy;
	}
	// Функция заканчивающая игру
	const endGame = _ => {
		$field.hide();
		clearInterval(secondCounter);
		counter = 0
		$timerValue.text(counter);
		$field.text(" ");
		clearValue();
	}
	// Функция очишаюшая поле и значения
	const clearValue = _ => {
		$numberV[0].value = 4;
		$numberG[0].value = 4;
		cardsArray = [];
		allCards = [];
		arrayCardsObject = [];
		cardGuessed = 0;
	}
	// Увеличивающая таймер
	const timer = _ => {
		$timerValue.text(++counter);
		counter == 60 ? endGame() : null;
	}
	// Функция создающая поле и добавляющая в него карты
	const createFieldAndCards = ev => {
		ev.preventDefault();
		// Заполняем массив случайными числами
		for (let i = 0; i < (($numberV[0].value * $numberG[0].value) / 2); i++) {
			cardsArray.push(i);
			cardsArray.push(i);
		}
		if ($numberV[0].value >= 2 && $numberV[0].value <= 10 && $numberG[0].value >= 2 && $numberG[0].value <= 10 && $numberV[0].value % 2 == 0 && $numberG[0].value % 2 == 0) {
			if ($field.css("display") != "block") {
				secondCounter = setInterval(timer, 1000);
				createCards($numberV[0].value, $numberG[0].value);
			};
			$field.show();
		} else {
			clearValue();
			alert("Вы ввели неверные значения! Попробуйте еще раз!");
		}
	}
	// Cобытие отвечающее за начало игры
	$Bstart.on("click", createFieldAndCards);
	// Событие отвечающее за конец игры
	$Bend.on("click", endGame);
})();
