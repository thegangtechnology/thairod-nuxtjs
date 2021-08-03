export type Status = 'wait' | 'print' | 'out' | 'received'
export interface ReceiverAddress {
    id: number;
    created_date: Date;
    updated_date: Date;
    name: string;
    lat: null;
    lon: null;
    house_number: string;
    subdistrict: string;
    district: string;
    province: string;
    postal_code: string;
    country: string;
    telno: string;
    note: string;
}
export interface Order {
    id: number;
    receiver_address: ReceiverAddress;
    created_date: Date;
    updated_date: Date;
    status: string;
    cid: string;
    orderer_name: string;
    orderer_license: string;
    order_time: Date;
}
export interface ProductVariation {
    id: number;
    product_description: string;
    created_date: Date;
    updated_date: Date;
    price: string;
    name: string;
    description: string;
    unit: string;
    product: number;
}
export interface OrderItem {
    id: number;
    product_variation: ProductVariation;
    created_date: Date;
    updated_date: Date;
    quantity: number;
    total_price: string;
    shipment: number;
}
export interface Batch {
    id: number;
    created_date: Date;
    updated_date: Date;
    name: string;
}
export interface ShipmentResponse {
    id: number;
    order_items: OrderItem[];
    batch: Batch;
    order: Order;
    created_date: Date;
    updated_date: Date;
    title: string;
    shipping_method: string;
    label_printed: boolean;
    deliver: boolean;
    weight: null;
    note: null;
    shippop_purchase_id: number;
    tracking_code: string;
    courier_tracking_code: null;
    status: string;
    warehouse: number;
}
export interface ShipmentLine {
  id: number // Result id
  shipmentItem: ProductVariation[]
  created_date: Date // created_date
  batch: Batch | null // batch
  tracking_code: string // tracking_code
  deliver: boolean
  label_printed: boolean
  status: Status
  cid: string // ShipmentResponse.Order.cid
  patientName: string // ShipmentResponse.Order.ReceiverAddress.name
}
export interface ShipmentDetail extends ShipmentLine {
  warehouse: number // ShipmentResponse.warehouse
  updated_name: string
  updated_date: Date // ShipmentResponse.updated_date
  orderer_name: string // ShipmentResponse.Order.orderer_name
  orderer_license: string // ShipmentResponse.Order.orderer_license
  house_number: string // ShipmentResponse.Order.ReceiverAddress.house_number
  subdistrict: string // ShipmentResponse.Order.ReceiverAddress.subdistrict
  district: string // ShipmentResponse.Order.ReceiverAddress.district
  province: string // ShipmentResponse.Order.ReceiverAddress.postal_code
  postal_code: string // ShipmentResponse.Order.ReceiverAddress.country
  telno: string // ShipmentResponse.Order.ReceiverAddress.telno
  note: string // ShipmentResponse.Order.ReceiverAddress.note
}
export interface ShipmentAddress extends ShipmentDetail {
  name: string
}
