export interface UpdateInventoryFormData {
  quantity: number
  cost: number
  warehouse: string
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
  id: string,
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
  unit: String
}
