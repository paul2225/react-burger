export type TOrderInfo = {
    readonly number: number
};

export interface IOrder {
    readonly name: string,
    readonly order: TOrderInfo,
    readonly success: boolean
}

export interface IFeedOrders {
    readonly orders: ReadonlyArray<IFeedOrder>;
    readonly total: number,
    readonly totalToday: number
}

export interface IFeedOrder {
    readonly _id: string,
    readonly ingredients: ReadonlyArray<string>,
    readonly status: OrderStatus,
    readonly name: string,
    readonly createdAt: string,
    readonly updatedAt: string,
    readonly number: number
}

export enum OrderStatus {
    PENDING = 'pending',
    DONE = 'done',
    CREATED = 'created',
}

export const OrderStatusDescription = {'pending': 'Готовится', 'done': 'Готов', 'created': 'Создан'};