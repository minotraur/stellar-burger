import { TEST_URL } from 'cypress/testVariables';

describe('Ingredient Modal', () => {
  beforeEach(() => {
    cy.visit(TEST_URL);
  });

  it('should open and close ingredient modal', () => {
    // Найдем элемент ингредиента по какому-то уникальному селектору
    cy.get('[data-cy=ingredient]').first().as('firstIngredient');

    cy.get('@firstIngredient').then(($ingredient) => {
      const ingredientName = $ingredient
        .find('[data-cy=name]')
        .text();

      cy.get('@firstIngredient').click();

      // Проверяем, что модальное окно открылось
      cy.get('[data-cy=modal]').should('be.visible');

      cy.get('[data-cy=ingredient-name]').should('have.text', ingredientName);
    });
  });
});
