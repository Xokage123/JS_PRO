import {
    BaseComponent,
    AddToCartComponent
} from './classes.js'

const testObject = {
    selector: '.main',
    showLoader: false,
    showErorState: false
}

const test = new BaseComponent(testObject);

test.addComponent('.test');

const shopObject = {
    selector: '.shop__container',
    showLoader: false,
    showErorState: false
}
const card = new AddToCartComponent(shopObject);
card.getElement(card.element);