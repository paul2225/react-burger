import {constructorIngredientsReducer} from "./constructorIngredients";
import {
    ADD_CONSTRUCTOR_INGREDIENT,
    CLEAR_CONSTRUCTOR_INGREDIENT,
    REMOVE_CONSTRUCTOR_INGREDIENT,
    UPDATE_CONSTRUCTOR_INGREDIENTS
} from "../../actions/constructor/constructorIngredients";
import {
    TEST_BUN_INGREDIENT_1,
    TEST_BUN_INGREDIENT_2,
    TEST_MAIN_INGREDIENT_1,
    TEST_MAIN_INGREDIENT_2
} from "../../../utils/testUtils";

const reducer = constructorIngredientsReducer;

describe("Constructor ingredients reducer", () => {
    it("Test initial state", () => {
        expect(
            reducer(
                undefined,
                {type: REMOVE_CONSTRUCTOR_INGREDIENT, index: 0}
            )
        ).toEqual({
            ingredients: [],
        });
    });

    it("Add BUN constructor ingredient", () => {
        expect(
            reducer(
                undefined,
                {type: ADD_CONSTRUCTOR_INGREDIENT, ingredient: TEST_BUN_INGREDIENT_1}
            )
        ).toEqual({
            ingredients: [TEST_BUN_INGREDIENT_1, TEST_BUN_INGREDIENT_1],
        });
    });

    it("Add other BUN constructor ingredient", () => {
        expect(
            reducer(
                {ingredients: [TEST_BUN_INGREDIENT_1, TEST_BUN_INGREDIENT_1]},
                {type: ADD_CONSTRUCTOR_INGREDIENT, ingredient: TEST_BUN_INGREDIENT_2}
            )
        ).toEqual({
            ingredients: [TEST_BUN_INGREDIENT_2, TEST_BUN_INGREDIENT_2],
        });
    });

    it("Add MAIN constructor ingredient", () => {
        expect(
            reducer(
                {ingredients: [TEST_BUN_INGREDIENT_1, TEST_BUN_INGREDIENT_1]},
                {type: ADD_CONSTRUCTOR_INGREDIENT, ingredient: TEST_MAIN_INGREDIENT_1}
            )
        ).toEqual({
            ingredients: [TEST_BUN_INGREDIENT_1, TEST_MAIN_INGREDIENT_1, TEST_BUN_INGREDIENT_1],
        });
    });

    it("Remove MAIN constructor ingredient", () => {
        expect(
            reducer(
                {ingredients: [TEST_BUN_INGREDIENT_1, TEST_MAIN_INGREDIENT_1, TEST_BUN_INGREDIENT_1]},
                {type: REMOVE_CONSTRUCTOR_INGREDIENT, index: 1}
            )
        ).toEqual({
            ingredients: [TEST_BUN_INGREDIENT_1, TEST_BUN_INGREDIENT_1],
        });
    });

    it("Update MAIN constructor ingredient", () => {
        expect(
            reducer(
                {ingredients:  [TEST_BUN_INGREDIENT_1, TEST_MAIN_INGREDIENT_1, TEST_BUN_INGREDIENT_2, TEST_BUN_INGREDIENT_1]},
                {type: UPDATE_CONSTRUCTOR_INGREDIENTS, ingredients: [TEST_BUN_INGREDIENT_1, TEST_MAIN_INGREDIENT_2, TEST_BUN_INGREDIENT_1, TEST_BUN_INGREDIENT_1]}
            )
        ).toEqual({
            ingredients:  [TEST_BUN_INGREDIENT_1, TEST_MAIN_INGREDIENT_2, TEST_BUN_INGREDIENT_1, TEST_BUN_INGREDIENT_1],
        });
    });

    it("Clear constructor ingredients", () => {
        expect(
            reducer(
                {ingredients: [TEST_BUN_INGREDIENT_1, TEST_MAIN_INGREDIENT_1, TEST_BUN_INGREDIENT_1]},
                {type: CLEAR_CONSTRUCTOR_INGREDIENT}
            )
        ).toEqual({
            ingredients: [],
        });
    });
});
