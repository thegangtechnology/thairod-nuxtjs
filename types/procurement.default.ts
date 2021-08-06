import { InventoryDetailCard, ItemDetail, ItemOverviewInfo, Stock } from './procurement.type'

export const defaultItemDetail: ItemDetail = {
  id: 0,
  productDescription: '',
  description: '',
  name: '',
  unit: ''
}

export const defaultItemOverviewInfo : ItemOverviewInfo = {
  id: 0,
  name: '',
  unit: '',
  updatedDate: ''
}

export const defaultInventoryDetailCard : InventoryDetailCard = {
  backgroundColor: '#ffffff',
  title: '',
  amount: 0,
  unit: ''
}

export const defaultStock: Stock = {
  fulfilled: 0,
  procured: 0,
  adjustment: 0,
  pending: 0,
  currentTotal: 0
}
