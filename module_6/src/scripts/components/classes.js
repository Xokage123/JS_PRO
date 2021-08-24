class Human {
    constructor(name, surname) {
        this._name = name;
        this._surname = surname;
    }
    get fullName() {
        return `${this._name} ${this._surname}`
    }
}

export default class Student extends Human {
    test = "test"
    constructor(name, surname) {
        super(name, surname);
        this.test = "test";
    }

    yarn() {
        console.log("Тестовая функция");
    }

    get startTraining() {
        return new Date.now();
    }
}