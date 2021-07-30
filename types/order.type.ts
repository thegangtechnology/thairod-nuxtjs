/* eslint-disable camelcase */
/**
 * FRONTEND Interface
 */
export type Status = 'wait' | 'print' | 'out' | 'received'
export interface Main {
  [key: string]: string | boolean
}

export interface Address {
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

export interface IShipmentResponse {
  count: number
  next: null
  previous: null
  results: Result[]
}

export interface Result {
  id: number
  order: OrderResponse[]
  batch: Batch | null
  created_date: Date
  updated_date: Date
  title: string
  shipping_method: string
  label_printed: boolean
  deliver: boolean
  weight: null
  note: null
  shippop_purchase_id: number
  tracking_code: string
  courier_tracking_code: null
  status: string
  warehouse: number
}

export interface OrderResponse {
  id: number
  product_variation: ProductVariation
  created_date: Date
  updated_date: Date
  quantity: number
  total_price: string
  shipment: number
}

export interface ProductVariation {
  id: number
  created_date: Date
  updated_date: Date
  price: string
  name: string
  description: string
  unit: string
  product: number
}

export interface Batch {
  id: number
  created_date: Date
  updated_date: Date
  name: string
}
export interface IOrder {
  orderId: number // Result id
  orderedItem: ProductVariation[]
  orderedDate: Date // created_date
  exportBatch: Batch | null // batch
  trackingNo: string // tracking_code
  deliver: boolean
  label_printed: boolean
  status: Status
  // Not Yet
  cid: string // Patient CID ?
  patientName: string
}

export interface IOrderDetail extends IOrder {
  phoneNumber: string
  warehouse: string
  orderedBy: string
  updatedBy: string
  updatedDate: string
  address: string
  province: string
  district: string
  subDistrict: string
  zipCode: string
  remark: string
}
