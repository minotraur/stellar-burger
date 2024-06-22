describe('Burger Builder', () => {
  before(() => {
    // Запуск тестовой среды и переход на нужную страницу
    cy.visit('http://localhost:4000'); // Измените URL на нужный вам
  });

  it('should load ingredients and add an ingredient to the constructor', () => {
    // Дождаться загрузки ингредиентов
    cy.get('[data-cy=ingredient]').should('have.length.greaterThan', 0);

    cy.get('.burger-ingredient-module__container__szzp3')
      .first()
      .within(() => {
        cy.get('.burger-ingredient-module__addButton__HR_H4').first().click();
      });

    cy.get('[data-cy=constructor] [data-cy=constructor-item]').should(
      'have.length',
      1
    );
  });
});
