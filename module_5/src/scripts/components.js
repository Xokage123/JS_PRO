export const errorContainer = document.querySelector('.error__container');
export const shopContainer = document.querySelector('.shop__container');

export const errorText = document.createElement('p');
errorText.classList.add('error__text');

export const buttonError = document.createElement('button');
buttonError.type = 'button';
buttonError.classList.add('btn', 'btn-danger');
buttonError.innerHTML = 'Danger';

export const spiner = document.createElement('div');
spiner.classList.add('spinner-border');
spiner.role = 'status';
spiner.innerHTML = `<span class="visually-hidden">Loading...</span>`;

export const shopButtonStart = document.createElement('button');
shopButtonStart.type = 'button';
shopButtonStart.classList.add('btn', 'btn-success');
shopButtonStart.innerHTML = 'Добавить в корзину';

export const containerNav = document.createElement('div');
export const infoNumber = document.createElement('p');
export const shopPlus = document.createElement('button');
shopPlus.type = 'button';
shopPlus.classList.add('btn', 'btn-primary');
shopPlus.innerHTML = '+';
export const shopMinus = document.createElement('button');
shopMinus.type = 'button';
shopMinus.classList.add('btn', 'btn-primary');
shopMinus.innerHTML = '-';