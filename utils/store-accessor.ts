/* eslint-disable import/no-mutable-exports */
import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'

import Shipment from '@/store/shipment.module'

let ShipmentModule: Shipment

function initialiseStores(store: Store<any>): void {
  ShipmentModule = getModule(Shipment, store)
}

export { initialiseStores, ShipmentModule }
