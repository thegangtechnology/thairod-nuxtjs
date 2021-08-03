/* eslint-disable camelcase */
export interface Product {
  id: number;
  sku: string;
  image: string;
  name: string;
  description: string;
  repeatable: boolean;
}

export interface ICheckoutProduct {
  itemId: number;
  quantity: number;
}
