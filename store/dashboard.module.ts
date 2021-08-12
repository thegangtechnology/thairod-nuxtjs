import { getModule, Module, MutationAction, VuexModule } from 'vuex-module-decorators'
import { store } from '@/store'
import { ProductSummary, ShipmentOverview } from '~/types/dashboard/dashboard.type'
import { getDashboardInfo } from '~/services/dashboard.service'

// remove duplicate module
const name: string = 'dashboardModule'
if (store.state[name]) {
  store.unregisterModule(name)
}

@Module({
  dynamic: true,
  name,
  store
})
class DashboardModule extends VuexModule {
  shipmentOverviews: ShipmentOverview[] = [] as ShipmentOverview[]
  stockOverviews: ProductSummary[] = [] as ProductSummary[]

  @MutationAction({ mutate: ['shipmentOverviews', 'stockOverviews'] })
  public getDashboardInfo () {
    return getDashboardInfo().then((res) => {
      const shipmentOverviews: ShipmentOverview[] = res.intervalSummaries
      const stockOverviews: ProductSummary[] = res.latestSummary.productSummaries
      return {
        shipmentOverviews,
        stockOverviews
      }
    })
  }
}

export default getModule(DashboardModule)
