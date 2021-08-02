export type Status = 'wait' | 'print' | 'out' | 'received'
export interface ShipmentResponse {
  count: number
  next: null
  previous: null
  results: ShipmentResult[]
}
export interface ShipmentResult {
  id: number
  order: ShipmentOrder[]
  batch: ShipmentBatch | null
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
export interface ShipmentOrder {
  id: number
  product_variation: ShipmentProductVariation
  created_date: Date
  updated_date: Date
  quantity: number
  total_price: string
  shipment: number
}
export interface ShipmentProductVariation {
  id: number
  created_date: Date
  updated_date: Date
  price: string
  name: string
  description: string
  unit: string
  product: number
  quantity?: number
}
export interface ShipmentBatch {
  id: number
  created_date: Date
  updated_date: Date
  name: string
}
export interface ShipmentLine {
  id: number // Result id
  shipmentItem: ShipmentProductVariation[]
  created_date: Date // created_date
  batch: ShipmentBatch | null // batch
  tracking_code: string // tracking_code
  deliver: boolean
  label_printed: boolean
  status: Status
  // Not Yet
  cid: string // Patient CID ?
  patientName: string
}
export interface ShipmentDetail extends ShipmentLine {
  telno: string
  warehouse: string
  orderer_name: string
  orderer_license: string
  updated_name: string
  updated_date: string
  house_number: string
  province: string
  district: string
  subdistrict: string
  postal_code: string
  note: string
}

export interface ShipmentAddress extends ShipmentDetail {
  name: string
}
