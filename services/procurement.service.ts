import { AxiosResponse } from 'axios'
import { ItemDetail, ItemOverviewInfo } from '~/types/procurement.type'
import { $axios } from '~/utils/api'
import apiPath from '~/data/api_path'
import { ProductVariationsParam, ProductVariationsReturn, UpdateProcurementBody } from '~/types/procurementService.type'
import { defaultItemDetail } from '~/types/procurement.default'
import { Warehouse } from '~/models/Warehouse'

export function getProductVariations (params: ProductVariationsParam) : Promise<ProductVariationsReturn> {
  return $axios
    .get(`${apiPath.productVariation}/`, {
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

export function getItemDetail (id: string | (string | null)[]) : Promise<ItemDetail> {
  return $axios
    .get(`${apiPath.productVariation}/${id}/`)
    .then((res) => {
      return res.data
    })
    .catch(() => {
      return defaultItemDetail
    })
}

export function getWarehouseList () : Promise<Warehouse[]> {
  return $axios
    .get(`${apiPath.warehouse}/`)
    .then((res) => {
      return res.data.results
    })
    .catch(() => {
      return Promise.resolve([] as Warehouse[])
    })
}

export function updateProcurement (body: UpdateProcurementBody) : Promise<void | AxiosResponse> {
  return $axios.post(`${apiPath.procurement}/`, body, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .catch(() => {
      // empty
    })
}
