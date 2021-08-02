import { InventoryRecord, ItemDetail, ItemOverviewInfo } from '~/types/procurement.type'

export interface ProductVariationsParam {
  page: number,
  pageSize: number,
  search: number
}

export interface ProductVariationsReturn {
  itemOverviewInfo: ItemOverviewInfo[],
  totalItems: number
}

export interface SelectedItemDetailReturn {
  inventoryRecord: InventoryRecord,
  itemDetail: ItemDetail
}
