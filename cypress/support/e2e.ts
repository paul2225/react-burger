import './commands'

beforeEach(() => {
    cy.visit("/")
    cy.get("[class^=burger-ingredients]").as("burgerIngredients")
    cy.get("[data-testid=ingredient]").as("ingredient")
    cy.get("[data-testid=constructor-ingredient").as("constructorIngredient")
    cy.get("[class^=burger-constructor_ingredients]").as("constructorIngredients")
    cy.get("[data-testid=makeOrderButton]").as("makeOrderButton")
});