import { ItemDetail, ItemOverviewInfo } from '~/types/procurement.type'
import { $axios } from '~/utils/api'
import apiPath from '~/data/api_path'
import {
  ProductVariationsParam,
  ProductVariationsReturn
} from '~/types/procurementService.type'
import { defaultItemDetail } from '~/types/procurement.default'

export async function getProductVariations (params: ProductVariationsParam) : Promise<ProductVariationsReturn> {
  return await $axios
    .get(apiPath.productVariation, {
      params
    })
    .then((res) => {
      const results : ItemOverviewInfo[] = res.data.results
      results.forEach((result : ItemOverviewInfo) => { result.stock = 0 })
      return Promise.resolve({ itemOverviewInfo: results, totalItems: res.data.count })
    })
    .catch(() => {
      return Promise.resolve({ itemOverviewInfo: [] as ItemOverviewInfo[], totalItems: 0 })
    })
}

export async function getItemDetail (id: number) : Promise<ItemDetail> {
  return await $axios
    .get(`${apiPath.productVariation}/${id}`)
    .then((res) => {
      const data : ItemDetail = res.data
      return data
    })
    .catch(() => {
      return defaultItemDetail
    })
}
