/* eslint-disable camelcase */
/**
 * FRONTEND Interface
 */
export interface Product {
  id: number
  sku:string
  image:string
  name:string
  description:string
  repeatable:boolean
}

/**
 * BACKEND Interface
 */
export interface ProductJson {
  id: number
  sku:string
  image:string
  name:string
  description:string
  repeatable:boolean
}
