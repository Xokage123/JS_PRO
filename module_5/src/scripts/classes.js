import { buttonError, spiner, errorContainer } from './components.js'

export class BaseComponent {
    constructor(props) {
        buttonError.addEventListener('click', _ => this.fetch(this.element))
        try {
            this.element = document.querySelector(props.selector);
            this.showLoader = props.showLoader ? props.showLoader : true;
            this.showEror = props.showErorState ? props.showErorState : true;
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
        this.fetch(this.element).then(() => {
            this.element.append(this.getElement(value));
        }).catch((er) => {
            buttonError.removeEventListener('click')
            errorContainer.append(buttonError);
            console.log(er.message);
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
        element.append(spiner);
        const value = await wait(5000).finally(() => {
            spiner.remove();
        });
        return new Promise((resolve, reject) => {
            this._fetchData = value;
            reject(new FetchError('Ошибка'));
            // resolve('Данные загружены успешно!!!');
        })
    }
}

function wait(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // reject(new FetchError('Ошибка'));
            resolve("Данные c сервера");
        }, ms);
    });

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