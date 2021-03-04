import { TEXTS } from '../../imports/infra/constants';

describe('Home', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  context('Check integrity', () => {
    it('h1 is correct', () => {
      cy.queryByText(TEXTS.HOME_TITLE).should('exist');
    });

    it('should have an event selector (select) displaying Select an event', () => {
      cy.get('select')
        .select(TEXTS.EVENT_DEFAULT)
        .should('exist');
    });

    it('should have an event selector (select) displaying the name and the data of each event', () => {
      /*
       * Since I could not change initial-data.js,
       * I typed the name of each event here.
       *
       * A better solution (for all tests bellow) would be,
       * export and assert all data from initial-data.js.
       */
      const communities = [
        { name: 'Challenge' },
        { name: 'Great Code' },
        { name: 'I love code' },
      ];

      communities.forEach(community => {
        cy.get('select')
          .select(community.name)
          .should('exist');

        // should have a list of people registered (table) in the selected event
        cy.get('[aria-label="Registered people table"]').should('be.visible');

        /*
         * should show the first and last name together (full name),
         * company name, title, Check-in date and Check-out date
         *
         * The check-in and check-out date format are covered by unit tests
         *
         * The actions of the check-in and check-out buttons,
         * are also covered by unit tests (peopleMethods.test.js)
         */
        cy.contains('Full name', { matchCase: false }).should('be.visible');
        cy.contains('Company name', { matchCase: false }).should('be.visible');
        cy.contains('Title', { matchCase: false }).should('be.visible');
        cy.contains('Check-in date', { matchCase: false }).should('be.visible');
        cy.contains('Check-out date', { matchCase: false }).should(
          'be.visible'
        );

        // should have a summary
        cy.contains('People in the event right now:', {
          matchCase: false,
        }).should('be.visible');
        cy.contains('People by company in the event right now:', {
          matchCase: false,
        }).should('be.visible');
        cy.contains('People not checked-in:', { matchCase: false }).should(
          'be.visible'
        );
      });
    });
  });
});
