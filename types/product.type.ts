/* eslint-disable camelcase */
/**
 * FRONTEND Interface
 */
export interface Product {
  id: number
  product: number
  price: number
  name: string
  description: string
  productDescription: string
  unit: string
  image: string
  updatedDate: string
  amount?: number
}
