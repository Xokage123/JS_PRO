import {
    BaseComponent,
    AddToCartComponent
} from './classes.js'

const testObject = {
    selector: '.main'
}

const test = new BaseComponent(testObject);

test.addComponent('.test');

const shopObject = {
    selector: '.shop__container',
}
const card = new AddToCartComponent(shopObject);
card.getElement(card.element);