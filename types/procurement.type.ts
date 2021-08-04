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
  stock: number,
  unit: string,
  updatedDate: string,
}

export interface InventoryRecord {
  currentAmount: number,
  accumulativeAmount: number,
  usedAmount: number,
  accumulativeUsed: number,
  unit: string
}

export interface ItemDetail {
  id: number,
  productDescription: string,
  description: string,
  name: string,
  unit: string
}

export interface ItemDetailPageInfo {
  itemDetail: ItemDetail,
  inventoryRecord: InventoryRecord
}
