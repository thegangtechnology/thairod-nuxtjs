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

// remove duplicate module
const name: string = 'productModule'
if (store.state[name]) {
  store.unregisterModule(name)
}

const imageDefault = [
  {
    name: 'กล่องเขียว',
    image: require('@/assets/images/default/set-g.svg')
  },
  {
    name: 'กล่องสีเหลือง',
    image: require('@/assets/images/default/set-y.svg')
  },
  {
    name: 'Favipiravir',
    image: require('@/assets/images/default/set-p.svg')
  },
  {
    name: 'ฟ้าทะลายโจร',
    image: require('@/assets/images/default/set-p.svg')
  }
]

@Module({
  dynamic: true,
  name,
  store
})
class ProductModule extends VuexModule {
  productList: Product[] = []
  product: Product = {} as Product
  cartItems: any[] = []

  @Mutation
  SET_PRODUCT_LIST ({
    productList
  }: {
    productList: Product[]
  }) {
    this.productList = productList
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
  UPDATE_AMOUNT ({
    product
  }: {
    product: Product
  }) {
    const duplicateItemIndex = this.cartItems.findIndex(item => item.id === product.id)
    console.log(this.cartItems[duplicateItemIndex], 'check dup item')

    if (duplicateItemIndex !== -1) {
      this.cartItems[duplicateItemIndex].amount = product.amount
    } else {
      this.cartItems.push(product)
    }

    console.log(this.cartItems, 'cartItems')
  }

  @Action({ commit: 'SET_PRODUCT_LIST' })
  public async getProductList ({
    page,
    perPage,
    search
  }: {
    page: number
    perPage: number
    search: string
  }) {
    const path: string = `${apiPath.productVariation}?search=page=${page}&page_size=${perPage}&search=${search}`
    const res = await $axios.get(path)
    const mappedProduct = res.data.results.map(
      (item: Product) => {
        const foundProduct = imageDefault.find(
          (itemProduct: { name: string; image: string }) => itemProduct.name === item.name
        )
        return {
          id: item.id,
          product: item.product,
          price: item.price,
          name: item.name,
          description: item.description,
          productDescription: item.productDescription,
          unit: item.unit,
          updatedDate: item.updatedDate,
          image: foundProduct ? foundProduct.image : require('@/assets/images/default/product-default.svg')
        }
      }
    )
    return {
      productList: mappedProduct
    }
  }

  @Action({ commit: 'SET_PRODUCT_DETAIL' })
  public async getProduct ({ id }: { id: string }) {
    const path: string = `/${apiPath.productVariation}/${id}`
    const res = await $axios.get(path)

    const data = res.data
    const foundProduct = imageDefault.find(
      (itemProduct: { name: string; image: string }) => itemProduct.name === data.name
    )

    console.log('foundProduct', foundProduct)

    const product: Product = {
      id: data.id,
      product: data.product,
      price: data.price,
      name: data.name,
      description: data.description,
      productDescription: data.productDescription,
      unit: data.unit,
      updatedDate: data.updatedDate,
      image: foundProduct ? foundProduct.image : require('@/assets/images/default/product-default.svg'),
      amount: data.amount
    }
    return {
      product
    }
  }

  @Action({ rawError: true })
  public async updateProduct (product: Product) {
    this.UPDATE_AMOUNT({ product })
    console.log('product', product)
  }
}

export default getModule(ProductModule)
