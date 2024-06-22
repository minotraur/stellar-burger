describe('Ingredient Modal', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4000/');
  });

  it('should open and close ingredient modal', () => {
    // Найдем элемент ингредиента по какому-то уникальному селектору
    cy.get('.burger-ingredient-module__container__szzp3')
      .first()
      .as('firstIngredient');

    cy.get('@firstIngredient').then(($ingredient) => {
      const ingredientName = $ingredient
        .find('.burger-ingredient-module__text__mZUnv')
        .text();

      cy.get('@firstIngredient').click();

      // Проверяем, что модальное окно открылось
      cy.get('.modal-module__modal__xqsNT').should('be.visible');

      cy.get('[data-cy=ingredient-name]').should('have.text', ingredientName);
    });
  });
});
