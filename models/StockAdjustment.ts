import {Warehouse} from "~/models/Warehouse";
import {ProductVariation} from "~/models/ProductVariation";

export interface StockAdjustment {
  id: number
  quantity: number
  warehouse: Warehouse
  productVariatoin: ProductVariation
  reason?: string
}
