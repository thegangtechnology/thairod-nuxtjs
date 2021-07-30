import { getModule, Module, MutationAction, VuexModule } from 'vuex-module-decorators'
import { store } from '@/store'
import { Product } from '@/types/product.type'

// remove duplicate module
const name: string = 'productModule'
if (store.state[name]) {
  store.unregisterModule(name)
}

@Module({
  dynamic: true,
  name,
  store
})
class ProductModule extends VuexModule {
  productList: Product[] = []

  @MutationAction({ mutate: ['productList'] })
  public async getProductList () {
    const path: string = '/product-list'
    await Promise.resolve(path)

    // delete this later
    const productList: Product[] =
      [
        {
          id: 1,
          name: 'Favipiravir',
          image: require('@/assets/images/default/set-p.svg'),
          description: '1 ชุด มี 12 เม็ด',
          detail: '',
          amount: 8
        },
        {
          id: 2,
          name: 'กล่องสีเขียว',
          image: require('@/assets/images/default/set-g.svg'),
          description: 'มีอุปกรณ์ 3 รายการ',
          detail: '',
          amount: 100
        },
        {
          id: 3,
          name: 'กล่องสีเหลือง',
          image: require('@/assets/images/default/set-y.svg'),
          description: 'มีอุปกรณ์ 3 รายการ',
          detail: '',
          amount: 100
        },
        {
          id: 4,
          name: 'ฟ้าทะลายโจร',
          image: require('@/assets/images/default/set-f.svg'),
          description: 'มีอุปกรณ์ 3 รายการ',
          detail: '',
          amount: 100
        }
      ]

    return {
      productList
    }
  }
}

export default getModule(ProductModule)
