import { ItemOverviewInfo } from './procurement.type'

export interface ProductVariationsParam {
  page: number,
  pageSize: number,
  search: string
}

export interface ProductVariationsReturn {
  itemOverviewInfo: ItemOverviewInfo[],
  totalItems: number
}

export interface UpdateProcurementBody {
  quantity: number,
  unitPrice: number,
  warehouse: number,
  productVariation: number
}
