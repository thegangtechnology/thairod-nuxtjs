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
  unit: string
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
  unit: string
}
