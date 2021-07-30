import Vue from "vue";
import Vuex from "vuex";
import { Store } from "vuex";
import { initialiseStores } from "~/utils/store-accessor";

Vue.use(Vuex);
export const store = new Vuex.Store<any>({});

const initializer = (store: Store<any>) => initialiseStores(store);
export const plugins = [initializer];
export * from "~/utils/store-accessor";
