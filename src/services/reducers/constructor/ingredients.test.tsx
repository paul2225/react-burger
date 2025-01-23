import {ingredientsReducer} from "./ingredients";
import {
    CLEAR_INGREDIENTS,
    GET_INGREDIENTS_FAILED,
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS
} from "../../actions/constructor/ingredients";
import {TEST_BUN_INGREDIENT_1, TEST_MAIN_INGREDIENT_1, TEST_SAUCE_INGREDIENT_1} from "../../../utils/testUtils";

const reducer = ingredientsReducer;

describe("Ingredients reducer", () => {
    it("Test initial state", () => {
        expect(
            reducer(
                undefined,
                {type: CLEAR_INGREDIENTS}
            )
        ).toEqual({
            ingredientsByType: {
                bun: [],
                main: [],
                sauce: []
            },
            ingredientsById: {},
            ingredientsRequest: false,
            ingredientsFailed: false,
        });
    });

    it("Get ingredients request", () => {
        expect(
            reducer(
                undefined,
                {type: GET_INGREDIENTS_REQUEST}
            )
        ).toEqual({
            ingredientsByType: {
                bun: [],
                main: [],
                sauce: []
            },
            ingredientsById: {},
            ingredientsRequest: true,
            ingredientsFailed: false,
        });
    });

    it("Get ingredients success", () => {
        expect(
            reducer(
                undefined,
                {
                    type: GET_INGREDIENTS_SUCCESS,
                    ingredients: [TEST_BUN_INGREDIENT_1, TEST_MAIN_INGREDIENT_1, TEST_SAUCE_INGREDIENT_1]
                }
            )
        ).toEqual({
            ingredientsByType: {
                bun: [TEST_BUN_INGREDIENT_1],
                main: [TEST_MAIN_INGREDIENT_1],
                sauce: [TEST_SAUCE_INGREDIENT_1]
            },
            ingredientsById: {
                "id": TEST_BUN_INGREDIENT_1,
                "id3": TEST_MAIN_INGREDIENT_1,
                "id5": TEST_SAUCE_INGREDIENT_1
            },
            ingredientsRequest: false,
            ingredientsFailed: false,
        });
    });

    it("Get ingredients failed", () => {
        expect(
            reducer(
                undefined,
                {
                    type: GET_INGREDIENTS_FAILED
                }
            )
        ).toEqual({
            ingredientsByType: {
                bun: [],
                main: [],
                sauce: []
            },
            ingredientsById: {},
            ingredientsRequest: false,
            ingredientsFailed: true,
        });
    });

    it("Clear ingredients", () => {
        expect(
            reducer(
                {
                    ingredientsByType: {
                        bun: [TEST_BUN_INGREDIENT_1],
                        main: [TEST_MAIN_INGREDIENT_1],
                        sauce: [TEST_SAUCE_INGREDIENT_1]
                    },
                    ingredientsById: {
                        "id": TEST_BUN_INGREDIENT_1,
                        "id3": TEST_MAIN_INGREDIENT_1,
                        "id5": TEST_SAUCE_INGREDIENT_1
                    },
                    ingredientsRequest: false,
                    ingredientsFailed: false,
                },
                {
                    type: CLEAR_INGREDIENTS
                }
            )
        ).toEqual({
            ingredientsByType: {
                bun: [],
                main: [],
                sauce: []
            },
            ingredientsById: {},
            ingredientsRequest: false,
            ingredientsFailed: false,
        });
    });
});