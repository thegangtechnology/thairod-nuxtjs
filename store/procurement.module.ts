import { getModule, Module, MutationAction, VuexModule } from 'vuex-module-decorators'
import { store } from '@/store'
import {
  ItemDetail,
  ItemOverviewInfo,
  Warehouse,
  StockInfo, Stock
} from '~/types/procurement/procurement.type'
import { getItemOverviewInfo, getItemDetail, getWarehouseList, getStockInfo } from '~/services/procurement.service'
import { ProductVariationsParam } from '~/types/procurement/procurement-service.type'
import { defaultItemDetail, defaultStock } from '~/types/procurement/procurement.default'

// remove duplicate module
const name: string = 'procurementModule'
if (store.state[name]) {
  store.unregisterModule(name)
}

@Module({
  dynamic: true,
  name,
  store
})
class ProcurementModule extends VuexModule {
  itemOverviewInfo: ItemOverviewInfo[] = [] as ItemOverviewInfo[]
  totalItems: number = 0
  currentItemDetail: ItemDetail = defaultItemDetail
  currentItemStock: Stock = defaultStock
  warehouseList: Warehouse[] = [] as Warehouse[]
  stockInfo: StockInfo = {} as StockInfo

  @MutationAction({ mutate: ['itemOverviewInfo', 'totalItems', 'stockInfo'] })
  public async getItemOverview (params: ProductVariationsParam) {
    const productVariationsReturn = await getItemOverviewInfo(params)
    const stockInfo: StockInfo = await getStockInfo(productVariationsReturn.itemOverviewInfo.map((product: ItemOverviewInfo) => product.id))
    const itemOverviewInfo: ItemOverviewInfo[] = productVariationsReturn.itemOverviewInfo
    const totalItems: number = productVariationsReturn.totalItems
    return {
      itemOverviewInfo,
      totalItems,
      stockInfo
    }
  }

  @MutationAction({ mutate: ['currentItemDetail', 'currentItemStock'] })
  public async getItemDetailPageInfo (id: string) {
    const currentItemDetail : ItemDetail = await getItemDetail(id)
    const stocks = await getStockInfo([id])
    const currentItemStock: Stock = stocks[id]
    return {
      currentItemDetail,
      currentItemStock
    }
  }

  @MutationAction({ mutate: ['warehouseList'] })
  public async getWarehouseList () {
    const warehouseList : Warehouse[] = await getWarehouseList()
    return {
      warehouseList
    }
  }
}

export default getModule(ProcurementModule)
