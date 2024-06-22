import { TEST_URL } from 'cypress/testVariables';

describe('Burger Builder', () => {
  before(() => {
    // Запуск тестовой среды и переход на нужную страницу
    cy.visit(TEST_URL);
  });

  it('should load ingredients and add an ingredient to the constructor', () => {
    // Дождаться загрузки ингредиентов
    cy.get('[data-cy=ingredient]').should('have.length.greaterThan', 0);

    cy.get('[data-cy=ingredient]')
      .first()
      .within(() => {
        cy.get('button').click();
      });

    cy.get('[data-cy=constructor] [data-cy=constructor-item]').should(
      'have.length',
      1
    );
  });
});
