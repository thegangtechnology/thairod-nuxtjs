import { getModule, Module, VuexModule } from 'vuex-module-decorators'
import { store } from '@/store'

// remove duplicate module
const name: string = 'authModule'
if (store.state[name]) {
  store.unregisterModule(name)
}

@Module({
  dynamic: true,
  name,
  store
})
class AuthModule extends VuexModule {

}

export default getModule(AuthModule)
