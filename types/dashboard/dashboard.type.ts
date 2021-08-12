import { Stock } from '../procurement/procurement.type'

export interface ProductSummary {
  pvId: number,
  pvName: string,
  stock: Stock,
  unit: string
}

export interface ShipmentOverview {
  begin: string,
  end: string,
  totalShipmentCreated: number,
  totalShipmentConfirmed: number,
  productSummaries: ProductSummary[]
}
