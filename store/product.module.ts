import {
  getModule,
  Module,
  MutationAction,
  VuexModule
} from 'vuex-module-decorators'
import { store } from '@/store'
import { Product } from '@/types/product.type'
import apiPath from '~/data/api_path'
import { $axios } from '@/utils/api'

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
  product: Product = {} as Product

  @MutationAction({ mutate: ['productList'] })
  public async getProductList() {
    const path: string = '/products/'
    await Promise.resolve(path)

    // delete this later
    const productList: Product[] = [
      {
        id: 1,
        name: 'Favipiravir',
        image: require('@/assets/images/default/set-p.svg'),
        description: '1 ชุด มี 12 เม็ด',
        sku: 'sku-1',
        repeatable: true
      },
      {
        id: 2,
        name: 'กล่องสีเขียว',
        image: require('@/assets/images/default/set-g.svg'),
        description: 'มีอุปกรณ์ 3 รายการ',
        sku: 'sku-1',
        repeatable: true
      },
      {
        id: 3,
        name: 'กล่องสีเหลือง',
        image: require('@/assets/images/default/set-y.svg'),
        description: 'มีอุปกรณ์ 3 รายการ',
        sku: 'sku-1',
        repeatable: true
      },
      {
        id: 4,
        name: 'ฟ้าทะลายโจร',
        image: require('@/assets/images/default/set-f.svg'),
        description: 'มีอุปกรณ์ 3 รายการ',
        sku: 'sku-1',
        repeatable: true
      }
    ]

    return {
      productList
    }
  }

  @MutationAction({ mutate: ['product'] })
  public async getProduct({ id }: { id: number }) {
    const path: string = `/products/${id}`
    await Promise.resolve(path)

    // delete this later
    const product: Product = {
      id: 1,
      name: 'Favipiravir',
      image: require('@/assets/images/default/set-p.svg'),
      description: '1 ชุด มี 12 เม็ด',
      sku: 'sku-1',
      repeatable: true
    }
    return {
      product
    }
  }
}

export default getModule(ProductModule)
