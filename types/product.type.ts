/* eslint-disable camelcase */
export interface Product {
  id: number
  product: number
  price: number
  productDescription: string
  unit: string
  updatedDate: string
  amount?: number
  image: string;
  name: string;
  description: string;
  quantity?: number;
}

export interface ICheckoutProduct {
  itemId: number;
  quantity: number;
}
