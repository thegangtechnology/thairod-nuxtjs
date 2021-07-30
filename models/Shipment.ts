import {Warehouse} from "~/models/Warehouse";
import {Order} from "~/models/Order";

export interface Shipment {
  id: number
  warehouse: Warehouse
  title: string
  shippingMethod: string
  labelPrinted: boolean
  weight: number
  note?: string
  order: Order
  shippopPurchaseId: number
  trackingCode: string
  courierTrackingCode: string
  status: string
}
