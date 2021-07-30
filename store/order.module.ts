import { getModule, Module, MutationAction, VuexModule } from 'vuex-module-decorators'
import apiPath from '~/data/api_path'
import { store } from '@/store'
import { Order } from '~/types/order.type'
import { $axios } from '@/utils/api'

// remove duplicate module
const name: string = 'orderModule'
if (store.state[name]) {
  store.unregisterModule(name)
}

@Module({
  dynamic: true,
  name,
  store
})
class OrderModule extends VuexModule {
  order: Order = {} as Order

  @MutationAction({ mutate: ['order'] })
  public async getOrder ({
    id
  }: {
    id: number
  }) {
    const path: string = `${apiPath.order}/${id}`
    const res = await $axios.get(path)
    console.log(res)

    // delete this later
    const order: Order = {
      id: 1,
      orderLines: [
        {
          id: 1,
          name: 'Item 1',
          total: 2
        },
        {
          id: 2,
          name: 'Item 2',
          total: 5
        },
        {
          id: 3,
          name: 'Item 3',
          total: 1
        },
        {
          id: 4,
          name: 'Item 4',
          total: 10
        }
      ],
      address: {
        firstName: 'First',
        lastName: 'Last',
        telephone: '0893339223',
        address: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
        province: 1,
        district: 1,
        subDistrict: 1,
        zipcode: '',
        optional: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo numquam optio voluptatum?'
      }
    }
    return {
      order
    }
  }
}

export default getModule(OrderModule)
