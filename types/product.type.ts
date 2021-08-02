/* eslint-disable camelcase */
/**
 * FRONTEND Interface
 */
export interface Product {
  id: number
  image: string
  name: string
  description: string
  detail: string
  amount: number
}

/**
 * BACKEND Interface
 */
export interface ProductJson {
  id: number
  image: string
  name: string
  description: string
  detail: string
  amount: number
}
