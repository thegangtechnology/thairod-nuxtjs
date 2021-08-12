import { defaultStock } from '../procurement/procurement.default'
import { ProductSummary, ShipmentOverview } from './dashboard.type'

export const defaultShipmentOverview: ShipmentOverview = {
  begin: '',
  end: '',
  totalShipmentCreated: 0,
  totalShipmentConfirmed: 0,
  productSummaries: []
}

export const defaultProductSummary: ProductSummary = {
  pvId: 0,
  pvName: '',
  stock: defaultStock,
  unit: ''
}
