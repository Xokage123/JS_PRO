import {
	el
} from "redom";

import {
	nameInputs
} from "../data/index.js"
import {
	generateClass
} from '../utils/index.js'

const path = 'card__';
const DOM = {
	container: {
		element: el('div'),
		class: `${path}container`
	},
	bank: {
		logoContainer: {
			element: el('div'),
			class: `${path}bank-logo-container`
		},
		nameBank: {
			element: el('p'),
			class: `${path}bank-name`
		}
	},
	form: {
		element: el('form'),
		class: [`${path}form`],
		inputs: {
			number: {
				element: el('input'),
				type: 'text',
				placeholder: 'Номер карты',
				name: nameInputs.number,
				class: [
					`${path}form-number`,
					'form__input'
				],
				data: [{
					name: "validateField",
					value: nameInputs.number
				}]
			},
			date: {
				element: el('input'),
				type: 'date',
				placeholder: 'Срок',
				name: nameInputs.date,
				class: [
					`${path}form-date`,
					'form__input'
				],
				data: [{
					name: "validateField",
					value: nameInputs.date
				}]
			},
			CVC: {
				element: el('input'),
				type: 'number',
				placeholder: 'CVC',
				name: nameInputs.CVC,
				class: [
					`${path}form-number`,
					'form__input'
				],
				data: [{
					name: "validateField",
					value: nameInputs.CVC
				}]
			},
			mail: {
				element: el('input'),
				type: 'mail',
				placeholder: 'Введите почту',
				name: nameInputs.mail,
				class: [
					`${path}form-mail`,
					'form__input'
				],
				data: [{
					name: "validateField",
					value: nameInputs.mail
				}]
			}
		},
		buttons: {
			submit: {
				element: el('button'),
				type: 'submit',
				inner: 'Оплатить',
				disabled: false,
				class: [
					`${path}form-submit`,
					'form-submit',
					"btn",
					"btn-primary"
				]
			}
		}
	}
}

for (let item in DOM) {
	generateClass(DOM[item]);
}

export const valueInputs = {
	number: DOM.form.inputs.number.element.value,
	date: DOM.form.inputs.date.element.value,
	CVC: DOM.form.inputs.CVC.element.value,
	mail: DOM.form.inputs.mail.element.value
}

export default DOM;