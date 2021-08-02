import { getModule, Module, MutationAction, VuexModule } from 'vuex-module-decorators'
import { store } from '@/store'
import { ItemOverviewInfo } from '~/types/procurement.type'
import { getProductVariations } from '~/services/procurement'

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

  @MutationAction({ mutate: ['itemOverviewInfo'] })
  public async getItemOverviewInfo () {
    const itemOverviewInfo: ItemOverviewInfo[] = await getProductVariations()
    return {
      itemOverviewInfo
    }
  }
}

export default getModule(ProcurementModule)
