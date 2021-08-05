import { getModule, Module, MutationAction, VuexModule } from 'vuex-module-decorators'
import { store } from '@/store'
import { InventoryRecord, ItemDetail, ItemDetailPageInfo, ItemOverviewInfo, Warehouse } from '~/types/procurement.type'
import { getProductVariations, getItemDetail, getWarehouseList } from '~/services/procurement.service'
import { ProductVariationsParam } from '~/types/procurementService.type'
import { defaultInventoryRecord, defaultItemDetail } from '~/types/procurement.default'

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
  itemDetailPageInfo: ItemDetailPageInfo = { itemDetail: defaultItemDetail, inventoryRecord: defaultInventoryRecord }
  warehouseList: Warehouse[] = [] as Warehouse[]

  @MutationAction({ mutate: ['itemOverviewInfo', 'totalItems'] })
  public async getItemOverview (params: ProductVariationsParam) {
    const productVariationsReturn = await getProductVariations(params)
    const itemOverviewInfo: ItemOverviewInfo[] = productVariationsReturn.itemOverviewInfo
    const totalItems: number = productVariationsReturn.totalItems
    return {
      itemOverviewInfo,
      totalItems
    }
  }

  @MutationAction({ mutate: ['itemDetailPageInfo'] })
  public async getItemDetailPageInfo (id: string | (string | null)[]) {
    const itemDetail : ItemDetail = await getItemDetail(id)
    const inventoryRecord: InventoryRecord = defaultInventoryRecord
    const itemDetailPageInfo: ItemDetailPageInfo = { itemDetail, inventoryRecord }
    return {
      itemDetailPageInfo
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
