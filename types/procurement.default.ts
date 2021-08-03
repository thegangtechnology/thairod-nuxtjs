import { InventoryRecord, ItemDetail, ItemOverviewInfo } from './procurement.type'

export const defaultItemDetail: ItemDetail = {
  id: '',
  productDescription: '',
  description: '',
  name: '',
  unit: ''
}

export const defaultInventoryRecord: InventoryRecord = {
  currentAmount: 0,
  accumulativeAmount: 0,
  usedAmount: 0,
  accumulativeUsed: 0,
  unit: ''
}

export const defaultItemOverviewInfo : ItemOverviewInfo = {
  id: '',
  name: '',
  stock: 0,
  unit: '',
  updatedDate: ''
}
