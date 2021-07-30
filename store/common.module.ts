import { Action, getModule, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import { store } from '@/store'

// remove duplicate module
const name: string = 'commonModule'
if (store.state[name]) {
  store.unregisterModule(name)
}

@Module({
  dynamic: true,
  name,
  store
})
class CommonModule extends VuexModule {
  headerTitle: string = ''

  @Mutation
  setHeaderName ({ title }: { title: string }) {
    this.headerTitle = title
  }

  @Action({ commit: 'setHeaderName' })
  public setHeaderTitle ({ header }: { header: string }) {
    return { title: header }
  }
}

export default getModule(CommonModule)
