import {
  Action,
  getModule,
  Module,
  Mutation,
  VuexModule,
} from 'vuex-module-decorators'
import { store } from '@/store'

// remove duplicate module
const name: string = 'locationModule'
if (store.state[name]) {
  store.unregisterModule(name)
}

interface IAddress {
  district: string
  districtEng: string
  amphoe: string
  amphoeEng: string
  province: string
  provinceEng: string
  zipcode: number
}

@Module({
  dynamic: true,
  name,
  store,
})
class LocationModule extends VuexModule {
  locations: IAddress[] = []

  @Mutation
  SET_LOCATION(locations: IAddress[]) {
    this.locations = locations
  }

  @Action({ commit: 'SET_LOCATION' })
  public async getLocation() {
    const res = await fetch(
      'https://gist.githubusercontent.com/ChaiyachetU/a72a3af3c6561b97883d7af935188c6b/raw/0e9389fa1fc06b532f9081793b3e36db31a1e1c6/thailand.json'
    )
    const locations = await res.json()
    return {
      locations,
    }
  }
}

export default getModule(LocationModule)
