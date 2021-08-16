export const errorContainer = document.querySelector('.error-container');

export const buttonError = document.createElement('button');
buttonError.type = 'button';
buttonError.classList.add('btn', 'btn-danger');
buttonError.innerHTML = 'Danger';

export const spiner = document.createElement('div');
spiner.classList.add('spinner-border');
spiner.role = 'status';
spiner.innerHTML = `<span class="visually-hidden">Loading...</span>`;