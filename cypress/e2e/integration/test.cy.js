export const INGREDIENTS_URL = 'https://norma.nomoreparties.space/api/ingredients';
export const LOGIN_URL = 'https://norma.nomoreparties.space/api/auth/login';
export const ORDER_URL = 'https://norma.nomoreparties.space/api/orders';

describe("Testing service availability...", () => {
    beforeEach(() => cy.visit("http://localhost:3000/"));

    it(
        "Service should be available",
        () => cy.get("[class^=burger-ingredients]").should("exist")
    );

    it(
        "Service should have ingredients",
        () => cy.get("[data-testid=ingredient]").should("have.length.at.least", 2)
    );
});

describe("Testing drag and drop functionality", () => {
    beforeEach(() => cy.visit("http://localhost:3000/"));

    it("Ingredient should move from ingredients container to constructor", () => {
        cy.get("[data-testid=constructor-ingredient").should("not.exist");

        const dataTransfer = new DataTransfer()

        cy.get("[data-testid=ingredient]").eq(0).trigger("dragstart", {dataTransfer})
        cy.get("[class^=burger-constructor_ingredients]").trigger("drop", {dataTransfer})
        cy.get("[data-testid=constructor-ingredient]").should("exist");
    });
});

describe("Testing modal window", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/");
        cy.get("[data-testid=ingredient]").eq(0).click();
    });

    it("Modal should be visible", () => {
        cy.get("[data-testid=modal]").should("be.visible");
    });

    it("Modal should have ingredient name and info", () => {
        cy.get("[class^=ingredient-details_ingredientName]").should('exist');
        cy.get("[class^=ingredient-details_ingredientInfo]").should("exist");
    });

    it("Modal should close properly", () => {
        cy.get("[class^=modal_closeIcon]").should("exist").click();
        cy.get("[data-testid=modal]").should("not.exist");
    });
});

describe("Testing making order", () => {
    beforeEach(() => {
        cy.intercept("GET", INGREDIENTS_URL, {fixture: "ingredients.json"});
        cy.intercept("POST", LOGIN_URL, {fixture: "login.json"}).as("loginSuccess");
        cy.intercept('POST', ORDER_URL, {fixture: "order.json"});

        cy.visit("http://localhost:3000/login");

        cy.get("[type=email]").type("qwe@qwe.qwe");
        cy.get("[type=password]").type("qwe");
        cy.get("[type=submit]").click();

        cy.wait("@loginSuccess");

        const dataTransfer = new DataTransfer();
        cy.get("[data-testid=ingredient]").eq(0).trigger("dragstart", {dataTransfer});
        cy.get("[class^=burger-constructor_ingredients]").trigger("drop", {dataTransfer});

        cy.get("[data-testid=ingredient]").eq(1).trigger("dragstart", {dataTransfer});
        cy.get("[class^=burger-constructor_ingredients]").trigger("drop", {dataTransfer});

        cy.get("[data-testid=makeOrderButton]").click();
    })

    it("Order modal should be visible", () => {
        cy.get("[data-testid=modal]").should("be.visible");
    });

    it("Order should have correct number", () => {
        cy.get("[class^=order-details_orderNumber").should("have.text", "123456789");
    })

    it("Modal should close", () => {
        cy.get("[class^=modal_close]").should("exist").click();
        cy.get("[data-testid=modal]").should("not.exist");
    })
})