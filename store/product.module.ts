import {
  Action,
  getModule,
  Module,
  Mutation,
  MutationAction,
  VuexModule,
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
  store,
})
class ProductModule extends VuexModule {
  productList: Product[] = []
  product: Product = {} as Product

  @Mutation
  SET_PRODUCT_LIST(productList: Product[]) {
    this.productList = productList
  }

  @Action({ commit: 'SET_PRODUCT_LIST' })
  public async getProductList({
    page,
    perPage,
  }: {
    page: number
    perPage: number
  }) {
    const path: string = `${apiPath.productVariation}/`
    const res = await $axios.get(path)
    console.log(res)

    const mappedProduct = res.data.results.map((value: Product) => {
      return {
        id: value.id,
        product: value.product,
        price: value.price,
        name: value.name,
        description: value.description,
        unit: value.unit,
      }
    })
    console.log(mappedProduct,'mappedProduct')
    return {
      productList: mappedProduct,
    }
  }

  @MutationAction({ mutate: ['product'] })
  public async getProduct({ id }: { id: number }) {
    const path: string = `/products/${id}`
    await Promise.resolve(path)

    // delete this later
    const product: Product = {
      id: 1,
      product: 2,
      price: 10.0,
      name: 'Favipiravir',
      description: 'กล่องเหลือง description',
      unit: 'BOXES',
    }

    return {
      product,
    }
  }
}

export default getModule(ProductModule)
