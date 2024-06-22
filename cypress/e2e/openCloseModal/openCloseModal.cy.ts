describe('Ingredient Modal', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4000/');
  });

  it('should open and close ingredient modal', () => {

    // Нажимаем на первый ингредиент
    cy.get('.burger-ingredient-module__container__szzp3').first().click();

    // Проверяем, что модальное окно открылось
    cy.get('.modal-module__modal__xqsNT').should('be.visible');

    // Закрываем модальное окно
    cy.get('.modal-module__button__Z7mUF').click();

    // Проверяем, что модальное окно закрылось
    cy.get('.modal-module__modal__xqsNT').should('not.exist');
  });
});
