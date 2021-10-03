import CardInfo from "card-info";
import {
	addInputsInForm
} from "../../src";
import DOM from "../../src/components";
import {
	Moon
} from "../../src/utils/index"

const arrayNumberBankCard = [
	"5536914018360861",
	"5336690045564087",
];

const arratDateCVC = [
	"153",
];

describe.each(arrayNumberBankCard)('Тесты ввода номера карты %s', (numberCard) => {
	test('Проверка длины номера карты (ровно 16)', () => {
		expect(numberCard).toHaveLength(16);
	});
	test('Проверка длины номера карты (меньше или равно 16)', () => {
		expect(numberCard.length).toBeLessThanOrEqual(16);
	});
	test('Проверка на коррекность каждого конкретно символа', () => {
		expect(Number.isFinite(Number(numberCard))).toBeTruthy();
	});
	test('Проверка длины номера карты (не больше 16)', () => {
		expect(numberCard.length).not.toBeGreaterThan(16);
	});
	test('Проверка на алгоритм сопостовление с картой', () => {
		expect(Moon(numberCard)).toBeTruthy();
	})
	test('Проверка на получение информации о карте', () => {
		expect(new CardInfo(numberCard).brandAlias).toBeTruthy();
	})
})

describe.each(arratDateCVC)('Тесты ввода номера карты %d', (numberCVC) => {
	test('Проверка длины CVC (ровно 3)', () => {
		expect(numberCVC).toHaveLength(3);
	});
	test('Проверка длины CVC (Не менее 3)', () => {
		expect(numberCVC.length).not.toBeLessThan(3);
	});
	test('Проверка длины CVC (Не более 3)', () => {
		expect(numberCVC.length).not.toBeGreaterThan(3);
	});
	test('Проверка символов CVC', () => {
		expect(Number(numberCVC)).not.toBeNaN();
	});
});

describe('Тесты', () => {
	test('Проверка колличества возвращаемых инпутов', () => {
		expect(addInputsInForm(DOM.form.element, [
			DOM.form.inputs.number.element,
			DOM.form.inputs.date.element,
			DOM.form.inputs.CVC.element,
			DOM.form.inputs.mail.element,
		])).toBe(4);
	});
})
