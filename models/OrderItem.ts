import {Shipment} from "~/models/Shipment";
import {ProductVariation} from "~/models/ProductVariation";

export interface OrderItem {
  id: number
  shipment: Shipment
  productVariation: ProductVariation
  quantity: number
  totalPrice: number
}
