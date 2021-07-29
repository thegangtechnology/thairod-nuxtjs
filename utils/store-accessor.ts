/* eslint-disable import/no-mutable-exports */
import { Store } from "vuex";
import { getModule } from "vuex-module-decorators";

import Order from "@/store/order";

let OrderModule: Order;

function initialiseStores(store: Store<any>): void {
  OrderModule = getModule(Order, store);
}

export { initialiseStores, OrderModule };
