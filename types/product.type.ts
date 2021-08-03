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
}

/**
 * BACKEND Interface
 */
export interface ProductJson {
  id: number
  product: number
  price: number
  name: string
  description: string
  productDescription: string
  unit: string
  image: string
}
