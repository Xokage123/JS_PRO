import { el } from "redom";

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
        name: {
            element: el('p'),
            class: `${path}bank-name`
        }
    },
    form: {
        element: el('form'),
        class: `${path}form`,
        inputs: {
            number: {
                element: el('input'),
                type: 'text',
                placeholder: 'Номер карты',
                class: [
                    `${path}form-number`,
                ]
            },
            date: {
                element: el('input'),
                type: 'text',
                placeholder: 'Срок',
                class: `${path}form-date`
            },
            CVC: {
                element: el('input'),
                type: 'text',
                placeholder: 'CVC',
                class: `${path}form-number`
            },
            mail: {
                element: el('input'),
                type: 'mail',
                placeholder: 'Введите почту',
                class: `${path}form-mail`
            }
        },
        buttons: {
            submit: {
                element: el('button'),
                type: 'submit',
                inner: 'Оплатить',
                disabled: true,
                class: `${path}form-submit`
            }
        }
    }
}

export default DOM;