export const generateClass = component => {
    const keys = Object.keys(component);
    keys.forEach(element => {
        switch (element) {
            case 'class':
                if (typeof component[element] === 'object') {
                    component[element].forEach(classElement => {
                        component.element.classList.add(classElement);
                    })
                } else {
                    component.element.classList.add(component[element]);
                }
                break;
            case 'type':
                component.element.type = component[element];
                break;
            case 'placeholder':
                component.element.placeholder = component[element];
                break;
            case 'disabled':
                component.element.disabled = component[element];
                break;
            case 'inner':
                component.element.innerHTML = component[element];
                break;
            case 'data':
                component[element].forEach(element => {
                    component.element.dataset[element.name] = element.value
                })
                break;
            case 'name':
                component.element.name = component[element];
                break;
            default:
                generateClass(component[element]);
        }
    })
}

export const Moon = card_number => {
    const arr = [];
    for (let i = 0; i < card_number.length; i++) {
        if (i % 2 === 0) {
            const m = parseInt(card_number[i]) * 2;
            if (m > 9) {
                arr.push(m - 9);
            } else {
                arr.push(m);
            }
        } else {
            const n = parseInt(card_number[i]);
            arr.push(n)
        }
    }
    const summ = arr.reduce((a, b) => {
        return a + b;
    });
    return Boolean(!(summ % 10));

}