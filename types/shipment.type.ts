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
}

export interface ShipmentBatch {
  id: number
  created_date: Date
  updated_date: Date
  name: string
}
export interface ShipmentLine {
  orderId: number // Result id
  orderedItem: ShipmentProductVariation[]
  orderedDate: Date // created_date
  exportBatch: ShipmentBatch | null // batch
  trackingNo: string // tracking_code
  deliver: boolean
  label_printed: boolean
  status: Status
  // Not Yet
  cid: string // Patient CID ?
  patientName: string
}

export interface ShipmentDetail extends ShipmentLine {
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
