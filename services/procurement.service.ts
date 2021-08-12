import { AxiosResponse } from 'axios'
import { ItemDetail, ItemOverviewInfo, StockInfo } from '~/types/procurement/procurement.type'
import { $axios } from '~/utils/api'
import apiPath from '~/data/api_path'
import {
  ProductVariationsParam,
  ProductVariationsResponse,
  UpdateProcurementBody
} from '~/types/procurement/procurement-service.type'
import { defaultItemDetail } from '~/types/procurement/procurement.default'
import { Warehouse } from '~/models/Warehouse'

export function getStockInfo (idList: number[] | string[]) : Promise<StockInfo> {
  const paramStr = idList.map((id: number | string) => (`&pv_id=${id}`)).join('')
  return $axios
    .get(`${apiPath.stock}/?${paramStr}`)
    .then((res) => {
      return res.data.stocks
    })
    .catch(() => {
      return Promise.resolve({} as StockInfo)
    })
}

export function getItemOverviewInfo (params: ProductVariationsParam) : Promise<ProductVariationsResponse> {
  return $axios
    .get(`${apiPath.productVariation}/`, {
      params
    })
    .then((res) => {
      const results : ItemOverviewInfo[] = res.data.results
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
