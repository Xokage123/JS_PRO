import {
	mount,
	el
} from "redom";
import "just-validate/dist/js/just-validate.min.js"
import Inputmask from "inputmask"
import CardInfo from "card-info"
import {
	Moon
} from "./utils/index"
import {
	nameInputs
} from "./data/index.js"
import DOM, {
	valueInputs
} from './components/index.js'
import "../style/index.scss"

const maskNumberInput = new Inputmask("9999 9999 9999 9999");
maskNumberInput.mask(DOM.form.inputs.number.element);

const maskDateInput = new Inputmask("99/99");
maskDateInput.mask(DOM.form.inputs.date.element);

const checkInput = (ev, value) => {
	const input = ev.target;
	const valueInput = input.inputmask ? input.inputmask.unmaskedvalue() : input.value;
	const nameInput = input.name;
	let checkValue = value;
	switch (nameInput) {
		case nameInputs.number:
			checkValue = valueInput;
			break;
		case nameInputs.CVC:
			valueInput.length <= 3 ? checkValue = valueInput : null;
			break;
		case nameInputs.date:
			const dateUser = new Date(valueInput);
			const dateNow = new Date;
			if (!(dateUser.getFullYear() > dateNow.getFullYear())) {
				checkValue = valueInput;
			}
			break;
		case nameInputs.mail:
			checkValue = valueInput;
			break;
		default:
			checkValue = valueInput;

	}
	ev.target.value = checkValue;
	return checkValue;
}

DOM.form.inputs.number.element.addEventListener('input', ev => {
	const input = ev.target;
	const value = input.inputmask.unmaskedvalue();
	const cardInfo = new CardInfo(value);
	console.log(isFinite(value));
	if (cardInfo.bankAlias) {
		DOM.bank.nameBank.element.innerHTML = `Название банка: ${bankAlias}`;
	} else {
		DOM.bank.nameBank.element.innerHTML = ""
	}
	if (cardInfo.brandAlias) {
		DOM.bank.nameBrand.element.innerHTML = `Платежная система: ${cardInfo.brandName}`;
		const brandPhoto = el("img", {
			src: `./images/brands-logos/${cardInfo.brandAlias}-colored.png`
		});
		DOM.bank.nameBrand.element.append(brandPhoto);
	} else {
		DOM.bank.nameBrand.element.innerHTML = "";
	}
});

const validateAllInputs = (arrayInputs) => {
	let checkValuesInputs = true;
	for (let value in arrayInputs) {
		!arrayInputs[value] ? checkValuesInputs = false : null;
	}
	return checkValuesInputs
}

for (let nameInput in DOM.form.inputs) {
	DOM.form.inputs[nameInput].element.addEventListener('input', ev => {
		valueInputs[nameInput] = checkInput(ev, valueInputs[nameInput]);
		DOM.form.buttons.submit.element.disabled = (validateAllInputs(valueInputs) ? false : true);
	});
};

export const addInputsInForm = (form, inputs = []) => {
	inputs.forEach(input => {
		form.append(input);
	});
	console.log(form['0'],
		form['1'],
		form['2'],
		form['3']);
	return [
		form['0'],
		form['1'],
		form['2'],
		form['3'],
	];
}

addInputsInForm(DOM.form.element, [
	DOM.form.inputs.number.element,
	DOM.form.inputs.date.element,
	DOM.form.inputs.CVC.element,
	DOM.form.inputs.mail.element,
]);

export const addSubmitInForm = (form, sumbit) => {
	form.append(sumbit);
}

addSubmitInForm(DOM.form.element, DOM.form.buttons.submit.element);

DOM.container.element.append(
	DOM.bank.nameBrand.element,
	DOM.bank.nameBank.element,
	DOM.form.element);

mount(document.body, DOM.container.element);

new JustValidate(`.${DOM.form.class[0]}`, {
	rules: {
		[nameInputs.number]: {
			required: true,
			function: (name) => {
				const realyValue = DOM.form.inputs[name].element.inputmask ? DOM.form.inputs[name].element.inputmask.unmaskedvalue() : DOM.form.inputs[name].element.value;
				return (realyValue.length === 16 && Moon(realyValue));
			}
		},
		[nameInputs.mail]: {
			required: true,
			email: true
		},
		[nameInputs.CVC]: {
			required: true,
			function: (name, value) => {
				return value.length === 3;
			}
		},
		[nameInputs.date]: {
			required: true,
			function: (name, value = "") => {
				const splitdate = value.split('/');
				const mounthEnd = Number(splitdate[0]);
				const yearEnd = Number(splitdate[1]);
				return (mounthEnd > 12 || mounthEnd === 0 || yearEnd < new Date().getFullYear().toString().slice(2));
			}
		}
	},
	messages: {
		[nameInputs.number]: {
			required: 'Данное поле обязательно для заполнения',
			function: 'Проверка номера не прошла, попробуйте еще раз!'
		},
		[nameInputs.mail]: {
			required: 'Данное поле обязательно для заполнения',
			email: 'Вы ввели некорректную электронную почту'
		},
		[nameInputs.CVC]: {
			required: 'Данное поле обязательно для заполнения',
			function: 'Вы ввели меньше 3 обязательных символов'
		},
		[nameInputs.date]: {
			required: 'Данное поле обязательно для заполнения',
			function: 'Вы ввели неверную дату'
		}
	},
});
