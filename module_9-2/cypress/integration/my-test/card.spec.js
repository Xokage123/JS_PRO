describe("Тесты", () => {
	beforeEach(() => {
		cy.visit('http://127.0.0.1:5500');
				cy.contains('Начать игру').click();
	});

	it("В начальном состоянии игра должна иметь поле четыре на четыре клетки, в каждой клетке цифра должна быть невидима", () => {
		cy.get('.game-field_row').should('have.length', 4);
		cy.get(".game-field_card").should('have.length', 16);
		cy.get(".game-field_card").should('not.have.text');
	});

	it("Нажать на одну произвольную карточку. Убедиться, что она осталась открытой", () => {
		const randomCardNumber = Math.floor(Math.random() * 16);
		cy.get(`.game-field_card`).each(($el, index) => {
			if (index === randomCardNumber) {
				// Нажимаем на случайную карту
				cy.wrap($el).click();
				// Ждем 3 секунды
				cy.wait(3000);
				cy.wrap($el).not('not.have.text');
			}
		})
	});

	it("Нажать на левую верхнюю карточку, затем на следующую. Если это не пара, то повторять со следующей карточкой, пока не будет найдена пара. Проверить, что найденная пара карточек осталась видимой.", () => {
		let numberOneCard;
		cy.get(`.game-field_card`).first().click();
		cy.get(`.game-field_card`).first().then($el => {
			numberOneCard = $el[0].outerText;
		});
		cy.get(`.game-field_card`).each(async ($el, index) => {
			if (index > 0) {
				cy.wrap($el).click();
				await cy.wait(1000).then(() => {
					if ($el[0].outerText !== numberOneCard) {
						cy.get(`.game-field_card`).first().click();
					} else {
						cy.wrap($el).should('have.text', String(numberOneCard));
					}
				});
			}
		})
	})

	it("Нажать на левую верхнюю карточку, затем на следующую. Если это пара, то повторять со следующими двумя карточками, пока не найдутся непарные карточки. Проверить, что после нажатия на вторую карточку обе становятся невидимыми", () => {
		let numberOneCard;
		cy.get(`.game-field_card`).first().click();
		cy.get(`.game-field_card`).first().then($el => {
			numberOneCard = $el[0].outerText;
		});
		cy.get(`.game-field_card`).each(async ($el, index) => {
			if (index > 0) {
				cy.wrap($el).click();
				await cy.wait(1000).then(() => {
					if ($el[0].outerText !== numberOneCard) {
						cy.get(`.game-field_card`).first().click();
					} else {
						cy.wrap($el).should('have.text', String(numberOneCard));
					}
				});
			}
		})
	})
});
