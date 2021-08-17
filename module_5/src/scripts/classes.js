import {
    buttonError,
    spiner,
    errorContainer,
    errorText,
    shopButtonStart,
    containerNav,
    shopPlus,
    infoNumber,
    shopMinus
} from './components.js'
import { wait } from './utils/index.js'

export class BaseComponent {
    constructor(props) {
        buttonError.addEventListener('click', _ => this.fetch(this.element))
        try {
            console.log(props);
            this.element = document.querySelector(props.selector);
            this.showLoader = props.showLoader;
            this.showEror = props.showErorState;
            if (!this.element) {
                throw new ComponentError('Ошибка!!! Данный элемент не найден на странице');
            }
            if (typeof this.showLoader !== 'boolean' || typeof this.showEror !== 'boolean') {
                throw new Error("Ошибка логического значения!!!");
            }
        } catch (e) {
            console.log(e.message);
        }
    }
    addComponent(value) {
        this.fetch(this.element).then((data) => {
            this._fetchData = data;
            this.element.append(this.getElement(value));
        }).catch((er) => {
            if (this.showEror) {
                errorText.innerHTML = er.message;
                errorContainer.append(errorText, buttonError);
            } else {
                errorContainer.innerHTML = 'Произошла ошибка при загрузке данных с сервера, но вы сочли нужным, чтобы мы не показывали информацию о ошибках!!!';
            }
        })
    }
    getElement(selector) {
        try {
            const element = document.querySelector(selector);
            if (!element) {
                throw new ComponentError('Ошибка!!! Данный элемент не найден на странице');
            }
            return element
        } catch (e) {
            console.log(e.message);
        }
    }
    async fetch(element) {
        if (this.showLoader) {
            element.append(spiner);
        } else {
            element.innerHTML = 'Идет загрузка...';
        }
        const value = await wait(5000).finally(() => {
            spiner.remove();
        });
        return new Promise((resolve, reject) => {
            element.innerHTML = '';
            reject(new FetchError('Данные c сервера не загрузились!!'));
            resolve(value);
        })
    }
}

export class AddToCartComponent extends BaseComponent {
    constructor(props) {
        super(props);
        this._numberPosition = 0;
        shopButtonStart.addEventListener('click', _ => {
            this.fetch = this._numberPosition + 1;
            this.getElement(this.element);
        })
        shopMinus.addEventListener('click', _ => {
            this.fetch = this._numberPosition - 1;
            this.getElement(this.element);
        });
        shopPlus.addEventListener('click', _ => {
            this.fetch = this._numberPosition + 1;
            this.getElement(this.element);
        })
        containerNav.append(shopMinus, infoNumber, shopPlus);
    }
    get fetch() {
        return this._numberPosition;
    }
    set fetch(value) {
        this._numberPosition = value;
    }
    getElement() {
        this.element.innerHTML = '';
        if (this.fetch === 0) {
            this.element.append(shopButtonStart);
            return shopButtonStart;
        } else {
            infoNumber.innerHTML = `${this._numberPosition} товаров в корзине`;
            this.element.append(containerNav);
            return containerNav;
        }
    }
}
export class ComponentError extends Error {
    constructor(props) {
        super(props);
    }
}

class FetchError extends Error {
    constructor(props) {
        super(props);
    }
}