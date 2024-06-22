import { TEST_URL } from 'cypress/testVariables';

describe('Ingredient Modal', () => {
  beforeEach(() => {
    cy.visit(TEST_URL);
  });

  it('should open and close ingredient modal', () => {
    // Нажимаем на первый ингредиент
    cy.get('[data-cy=ingredient]').first().click();

    // Проверяем, что модальное окно открылось
    cy.get('[data-cy=modal]').should('be.visible');

    // Закрываем модальное окно
    cy.get('[data-cy=close-modal]').click();

    // Проверяем, что модальное окно закрылось
    cy.get('[data-cy=modal]').should('not.exist');
  });
});
