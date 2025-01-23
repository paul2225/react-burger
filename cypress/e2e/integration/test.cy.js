export const INGREDIENTS_URL = 'https://norma.nomoreparties.space/api/ingredients';
export const LOGIN_URL = 'https://norma.nomoreparties.space/api/auth/login';
export const ORDER_URL = 'https://norma.nomoreparties.space/api/orders';

const modal = "[data-testid=modal]"
const modalClose = "[class^=modal_close]"
const orderNumber = "[class^=order-details_orderNumber"
const ingredientName = "[class^=ingredient-details_ingredientName]";
const ingredientInfo = "[class^=ingredient-details_ingredientInfo]";

describe("Testing service availability...", () => {
    beforeEach(() => cy.visit("/"));

    it(
        "Service should be available",
        () => {
            cy.get("@burgerIngredients").should("exist")
        }
    );

    it(
        "Service should have ingredients",
        () => cy.get("@ingredient").should("have.length.at.least", 2)
    );
});

describe("Testing drag and drop functionality", () => {
    beforeEach(() => cy.visit("/"));

    it("Ingredient should move from ingredients container to constructor", () => {
        cy.get("@constructorIngredient").should("not.exist");

        const dataTransfer = new DataTransfer()

        cy.get("@ingredient").eq(0).trigger("dragstart", {dataTransfer})
        cy.get("@constructorIngredients").trigger("drop", {dataTransfer})
        cy.get("@constructorIngredient").should("exist");
    });
});

describe("Testing modal window", () => {
    beforeEach(() => {
        cy.visit("/");
        cy.get("@ingredient").eq(0).click();
    });

    it("Modal should be visible", () => {
        cy.get(modal).should("be.visible");
    });

    it("Modal should have ingredient name and info", () => {
        cy.get(ingredientName).should('exist');
        cy.get(ingredientInfo).should("exist");
    });

    it("Modal should close properly", () => {
        cy.get(modalClose).should("exist").click();
        cy.get(modal).should("not.exist");
    });
});

describe("Testing making order", () => {
    beforeEach(() => {
        cy.intercept("GET", INGREDIENTS_URL, {fixture: "ingredients.json"});
        cy.intercept("POST", LOGIN_URL, {fixture: "login.json"}).as("loginSuccess");
        cy.intercept('POST', ORDER_URL, {fixture: "order.json"});

        cy.login()

        const dataTransfer = new DataTransfer();
        cy.get("@ingredient").eq(0).trigger("dragstart", {dataTransfer});
        cy.get("@constructorIngredients").trigger("drop", {dataTransfer});

        cy.get("@ingredient").eq(1).trigger("dragstart", {dataTransfer});
        cy.get("@constructorIngredients").trigger("drop", {dataTransfer});

        cy.get("@makeOrderButton").click();
    })

    it("Order modal should be visible", () => {
        cy.get(modal).should("be.visible");
    });

    it("Order should have correct number", () => {
        cy.get(orderNumber).should("have.text", "123456789");
    })

    it("Modal should close", () => {
        cy.get(modalClose).should("exist").click();
        cy.get(modal).should("not.exist");
    })
})