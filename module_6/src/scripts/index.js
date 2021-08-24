"use strict";

import { checkValue } from './logic/elements.js'

const container = document.querySelector('.container');
const main = document.querySelector('.main');
const input = document.querySelector('.input');
const button = document.querySelector('.button');
button.addEventListener('click', _ => checkValue(objeactElements));
const list = document.querySelector('.list');
const listTitle = document.querySelector('.list__title');
const objeactElements = {
    input,
    list,
    listTitle,
    container,
    main,
    container
}
container.remove();