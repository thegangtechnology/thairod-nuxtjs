import { InventoryDetailCard, InventoryRecord, ItemDetail, ItemOverviewInfo } from './procurement.type'

export const defaultItemDetail: ItemDetail = {
  id: 0,
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
  id: 0,
  name: '',
  stock: 0,
  unit: '',
  updatedDate: ''
}

export const defaultInventoryDetailCard : InventoryDetailCard = {
  backgroundColor: '#ffffff',
  title: '',
  amount: 0,
  unit: ''
}
