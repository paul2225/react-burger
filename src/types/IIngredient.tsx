export interface IIngredient{
    readonly _id: string,
    readonly name: string,
    readonly type: IngredientType,
    readonly proteins: number,
    readonly fat: number,
    readonly carbohydrates: number,
    readonly calories: number,
    readonly price: number,
    readonly image: string,
    readonly image_mobile: string,
    readonly image_large: string,
    readonly __v: number
}

export interface IIngredientElement {
    readonly isDraggable: boolean,
    readonly type?: BunType,
    readonly isLocked: boolean,
    readonly moveIngredient: (ind1: number, ind2: number) => void,
    index: number,
    readonly ingredient: IIngredient,
}

export enum IngredientType {
    BUN = 'bun',
    MAIN = 'main',
    SAUCE = 'sauce'
}

export enum BunType {
    TOP = 'top',
    BOTTOM = 'bottom'
}