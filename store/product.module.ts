import {
  Action,
  getModule,
  Module,
  Mutation,
  VuexModule
} from 'vuex-module-decorators'
import { store } from '@/store'
import { Product } from '@/types/product.type'
import { $axios } from '@/utils/api'
import apiPath from '~/data/api_path'
import { productImageMap } from '~/data/image-map'

// remove duplicate module
const name: string = 'productModule'
if (store.state[name]) {
  store.unregisterModule(name)
}

const imageDefault: { [key: number]: string } = productImageMap

@Module({
  dynamic: true,
  name,
  store
})
class ProductModule extends VuexModule {
  productList: Product[] = []
  totalProduct: number = 0
  product: Product = {} as Product
  total: number = 0

  @Mutation
  SET_PRODUCT_LIST ({
    productList, totalProduct
  }: {
    productList: Product[],
    totalProduct: number
  }) {
    this.productList = productList
    this.totalProduct = totalProduct
  }

  @Mutation
  SET_PRODUCT_DETAIL ({
    product
  }: {
    product: Product
  }) {
    this.product = product
  }

  @Mutation
  SET_TOTAL_CART ({
    totalItem
  }: { totalItem: number }) {
    this.total = totalItem
  }

  @Action({ commit: 'SET_PRODUCT_LIST' })
  public async getProductList ({
    page,
    pageSize,
    search
  }: {
    page: number
    pageSize: number
    search: string
  }) {
    const path: string = `${apiPath.productVariation}/?page=${page}&page_size=${pageSize}&search=${search}/`
    const res = await $axios.get(path)
    const mappedProduct = res.data.results.map(
      (item: Product) => {
        return {
          id: item.id,
          product: item.product,
          price: item.price,
          name: item.name,
          description: item.description,
          productDescription: item.productDescription,
          unit: item.unit,
          updatedDate: item.updatedDate,
          image: imageDefault[item.id] ? imageDefault[item.id] : imageDefault[5]
        }
      }
    )
    return {
      productList: mappedProduct,
      totalProduct: res.data.count
    }
  }

  @Action({ commit: 'SET_PRODUCT_DETAIL' })
  public async getProduct ({ id }: { id: number }) {
    const path: string = `/${apiPath.productVariation}/${id}/`
    const res = await $axios.get(path)

    const data = res.data
    const product: Product = {
      id: data.id,
      product: data.product,
      price: data.price,
      name: data.name,
      description: data.description,
      productDescription: data.productDescription,
      unit: data.unit,
      updatedDate: data.updatedDate,
      image: imageDefault[id] ? imageDefault[id] : imageDefault[5],
      amount: data.amount
    }
    return {
      product
    }
  }

  @Action({ commit: 'SET_TOTAL_CART' })
  setTotalCart ({ totalItem }: { totalItem: number }) {
    return {
      totalItem
    }
  }
}

export default getModule(ProductModule)
