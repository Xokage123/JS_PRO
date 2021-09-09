import { mount } from "redom";
import DOM from './components/index.js'
import { generateClass } from './utils/index.js'

for (let item in DOM) {
    generateClass(DOM[item]);
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