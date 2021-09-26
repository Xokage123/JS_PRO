import CardInfo from "card-info"
import {
	Moon
} from "../../src/utils/index"

const arrayNumberBankCard = [
	"5536914018360861",
	"5336690045564087",
]

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
