export interface Warehouse {
  id: number,
  name: string
}

export interface UpdateInventoryFormData {
  quantity: number
  unitPrice: number
  warehouse: number
}

export interface WarehouseStock {
  warehouse: string
  amount: number
  unit: string
}

export interface InventoryDetailCard {
  backgroundColor: string,
  title: string,
  amount: number,
  unit: string
}

export interface ItemOverviewInfo {
  id: number,
  name: string,
  unit: string,
  updatedDate: string,
}

export interface ItemDetail {
  id: number,
  productDescription: string,
  description: string,
  name: string,
  unit: string
}

export interface UserInfo {
  id: number,
  firstName: string,
  lastName: string,
  username: string
}

export interface Stock {
  fulfilled: number,
  procured: number,
  adjustment: number,
  ordered: number,
  pending: number,
  currentTotal: number
  toBeShipped: number
}

export interface StockInfo {
  [id: string]: Stock
}
