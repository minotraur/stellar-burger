import { TEST_URL } from 'cypress/testVariables';

describe('Burger Builder', () => {
  before(() => {
    // Запуск тестовой среды и переход на нужную страницу
    cy.visit(TEST_URL); // Измените URL на нужный вам
  });

  beforeEach(() => {
    // Добавляем фейковый токен в localStorage и cookies перед каждым тестом
    cy.window().then((win) => {
      win.localStorage.setItem(
        'refreshToken',
        'a7c3720531ae2f30a59484ea6e3955a6f4c1d2160c0c25c232a64dab3cdb6ebc199a2f57e90fc60b'
      );
    });
    cy.setCookie(
      'accessToken',
      'Bearer%20eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MTE3ZDM0OTdlZGUwMDAxZDA2NDk1YyIsImlhdCI6MTcxOTA3Mzg5NiwiZXhwIjoxNzE5MDc1MDk2fQ.X8mht-mwZp5k3sadUhDGLiEeP4F4GQkwnEPnuRwyAtg'
    );
  });

  afterEach(() => {
    // Очищаем localStorage и cookies после каждого теста
    cy.window().then((win) => {
      win.localStorage.removeItem('refreshToken');
    });
    cy.clearCookie('accessToken');
  });

  it('should load ingredients and add an ingredient to the constructor', () => {
    // Дождаться загрузки ингредиентов
    cy.get('[data-cy=ingredient]').should('have.length.greaterThan', 0);

    cy.get('[data-cy=ingredient]')
      .first()
      .within(() => {
        cy.get('button').first().click();
      });

    cy.get('[data-cy=make-order]')
      .click()
      .then(() => {
        cy.intercept('POST', '/orders', { fixture: 'order' });
      });

    cy.get('[data-cy=modal]').should('be.visible');

    cy.wait(17000);

    // Закрываем модальное окно
    cy.get('[data-cy=close-modal]').click();

    // Проверяем, что модальное окно закрылось
    cy.get('[data-cy=modal]').should('not.exist');
  });
});
