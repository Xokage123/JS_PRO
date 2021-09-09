import {
    mount
} from "redom";
// import JustValidate from "just-validate"
import Inputmask from "inputmask"
import {
    nameInputs
} from "./data/index.js"
import DOM, {
    valueInputs
} from './components/index.js'

const maskNumberInput = new Inputmask("9999 9999 9999 9999");
maskNumberInput.mask(DOM.form.inputs.number.element);

// console.log(JustValidate);

const checkInput = (ev, value) => {
    console.log(value);
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

const validateAllInputs = inputs => {
    let check = true;
    for (let name in inputs) {
        // !inputs[name] ? check = false : null;
    }
    return check;
}

for (let nameInput in DOM.form.inputs) {
    DOM.form.inputs[nameInput].element.addEventListener('input', ev => {
        valueInputs[nameInput] = checkInput(ev, valueInputs[nameInput]);
        DOM.form.buttons.submit.element.disabled = (validateAllInputs(valueInputs) ? false : true);
    });
}

DOM.form.element.append(
    DOM.form.inputs.number.element,
    DOM.form.inputs.date.element,
    DOM.form.inputs.CVC.element,
    DOM.form.inputs.mail.element,
    DOM.form.buttons.submit.element)
DOM.container.element.append(
    DOM.bank.logoContainer.element,
    DOM.bank.nameBank.element,
    DOM.form.element);

mount(document.body, DOM.container.element);

console.log(DOM.form.class[0]);
new JustValidate(`.${DOM.form.class[0]}`, {
    rules: {
        [nameInputs.number]: {
            required: true,
            function: (name) => {
                const realyValue = DOM.form.inputs[name].element.inputmask ? DOM.form.inputs[name].element.inputmask.unmaskedvalue() : DOM.form.inputs[name].element.value;
                return realyValue.length === 16;
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
        }
    },
    messages: {
        [nameInputs.number]: {
            required: 'Данное поле обязательно для заполнения',
            function: 'Вы ввели меньше 16 обязательных символов'
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
        }
    },
});