import {Product} from "~/models/Product";

export interface ProductVariation {
  id: number
  product: Product
  price: number
  name: string
  description: string
  productDescription: string
  unit: string
}
