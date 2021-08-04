export type Status = 'wait' | 'print' | 'out' | 'received'
export interface ReceiverAddress {
    id: number;
    createdDate: Date;
    updatedDate: Date;
    name: string;
    lat: null;
    lon: null;
    houseNumber: string;
    subdistrict: string;
    district: string;
    province: string;
    postalCode: string;
    country: string;
    telno: string;
    note: string;
}
export interface Order {
    id: number;
    receiverAddress: ReceiverAddress;
    createdDate: Date;
    updatedDate: Date;
    status: string;
    cid: string;
    ordererName: string;
    ordererLicense: string;
    orderTime: Date;
}
export interface ProductVariation {
    id: number;
    productDescription: string;
    createdDate: Date;
    updatedDate: Date;
    price: string;
    name: string;
    description: string;
    unit: string;
    product: number;
}

export interface OrderItem {
    id: number;
    productVariation: ProductVariation;
    createdDate: Date;
    updatedDate: Date;
    quantity: number;
    totalPrice: string;
    shipment: number;
}

export interface Batch {
    id: number;
    createdDate: Date;
    updatedDate: Date;
    name: string;
}
export interface ShipmentResponse {
    id: number;
    orderItems: OrderItem[];
    batch: Batch;
    order: Order;
    createdDate: Date;
    updatedDate: Date;
    title: string;
    shippingMethod: string;
    labelPrinted: boolean;
    deliver: boolean;
    weight: null;
    note: null;
    shippopPurchaseId: number;
    trackingCode: string;
    courierTrackingCode: null;
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
