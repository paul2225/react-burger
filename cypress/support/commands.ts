/// <reference types="cypress" />
Cypress.Commands.add('login', () => {
    cy.visit("/login");

    cy.get("[type=email]").type("qwe@qwe.qwe");
    cy.get("[type=password]").type("qwe");
    cy.get("[type=submit]").click();

    cy.wait("@loginSuccess");
})