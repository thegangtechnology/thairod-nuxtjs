/* eslint-disable camelcase */
/**
 * FRONTEND Interface
 */
export interface Address {
  id: number
  firstName: string
  lastName: string
  telephone: string
  address: string
  province: number | string
  district: number | string
  subDistrict: number | string
  zipcode: string
  optional: string
}

export interface OrderLine {
  id: number
  name: string
  total: number
}

export interface Order {
  id: number
  orderLines: OrderLine[]
  address: Address
}

/**
 * BACKEND Interface
 */
export interface OrderLineJson {
  id: number
  created_date: string
  quantity: string
  price: string
  total_price: string
}

export interface OrderJson {
  id: number
  order_number: string
  status: string
  order_lines: OrderLineJson[]
  grand_total_price: string
}
