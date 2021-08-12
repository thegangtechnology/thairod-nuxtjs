import { ProductSummary, ShipmentOverview } from './dashboard.type'

export interface LatestSummary {
  totalShipmentCreated: number,
  totalShipmentConfirmed: number,
  productSummaries: ProductSummary[]
}

export interface DashboardResponse {
  latestSummary: LatestSummary,
  intervalSummaries: ShipmentOverview[]
}
