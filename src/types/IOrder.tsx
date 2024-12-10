export type TOrderInfo = {
    readonly number: number
};

export interface IOrder {
    readonly name: string,
    readonly order: TOrderInfo,
    readonly success: boolean
}