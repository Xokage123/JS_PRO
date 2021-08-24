import { loadModule } from './modules.js'

// Хранилише элементов
let props = {};

export const checkValue = (objeactElements) => {
    const { input, list, listTitle, container, main } = objeactElements;
    Object.assign(props, objeactElements);
    list.innerHTML = '';
    if (input.value.endsWith('.js')) {
        loadModule(input.value).then(module => {
            listTitle.innerHTML = `Список найденных прототипов в модуле: ./components/${input.value}`;
            createListOnfo(module.default.prototype.constructor);
        });
    } else {
        const nameProp = window[input.value];
        let checkValue = false;
        if (nameProp) {
            checkValue = true;
            if (typeof nameProp === 'function') {
                const propConstructor = nameProp.prototype.constructor;
                listTitle.innerHTML = `Список найденных прототипов в свойстве: ${ propConstructor.name}`;
                getStyle([input, container], true);
                createListOnfo(propConstructor);
            }
        }
        if (!checkValue) {
            getStyle([input, container]);
        }
    }
}

const getStyle = (elements, value = false) => {
    props.main.append(props.container);
    props.container.innerHTML = `${value ? "Данное свойство было найдено!!!" : "Ошиба!!! Данной свойство не найдено"}`
    elements.forEach(element => {
        toggleConent(element, value);
    })
    setTimeout(_ => {
        elements.forEach(element => {
            value ? element.classList.toggle('good') : element.classList.toggle('bad');
        })
        props.container.remove();
    }, 3000)
}


const createListOnfo = proto => {
    while (proto) {
        const item = document.createElement("li");
        const titleItem = document.createElement("h5");
        const listItem = document.createElement("ol");
        item.classList.add('item');
        titleItem.classList.add('item__title');
        titleItem.innerHTML = proto.name ? proto.name : proto.constructor.name;
        listItem.classList.add('item__list');
        Object.keys(proto).forEach(element => {
            const item = document.createElement('li');
            item.innerHTML = `${element} (тип: ${typeof element})`;
            listItem.append(item);
        })
        item.append(titleItem, listItem);
        props.list.append(item);
        proto = Object.getPrototypeOf(proto);
    }
}

const toggleConent = (element, value) => {
    value ? element.classList.toggle('good') : element.classList.toggle('bad');
}