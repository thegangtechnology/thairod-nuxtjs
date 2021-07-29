import {ProductVariation} from "~/models/ProductVariation";
import {Warehouse} from "~/models/Warehouse";

export interface Procurement{
  id: number
  productVariation: ProductVariation
  quantity: number
  unitPrice: number
  warehouse: Warehouse
}

export interface ProcurementCreate{
  productVariation: number
  quantity: number
  unitPrice: number
  warehouse: number
}

