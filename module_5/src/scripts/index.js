import { BaseComponent } from './classes.js'

const testObject = {
    selector: '.main'
}

const test = new BaseComponent(testObject);

test.fetch().then(value => {
    console.log(test._fetchData);
});

test.addComponent('.test')