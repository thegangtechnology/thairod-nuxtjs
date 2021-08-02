import camelcaseKeys from 'camelcase-keys'
import { InventoryRecord, ItemOverviewInfo } from '~/types/procurement.type'
import { $axios } from '~/utils/api'
import apiPath from '~/data/api_path'

export async function getProductVariations () : Promise<Array<ItemOverviewInfo>> {
  return await $axios
    .get(apiPath.productVariation, {
      transformResponse: [
        (data) => {
          return camelcaseKeys(JSON.parse(data), { deep: true })
        }
      ]
    })
    .then((res) => {
      const results = res.data.results
      results.forEach((result : ItemOverviewInfo) => { result.stock = 0 })
      return Promise.resolve(results)
    })
    .catch(() => {
      return Promise.resolve([])
    })
}

export async function getItemDescription () : Promise<String> {
  return await Promise.resolve('-')
}

export async function getInventoryRecord () : Promise<InventoryRecord> {
  return await Promise.resolve({ currentAmount: 0, accumulativeAmount: 0, usedAmount: 0, accumulativeUsed: 0, unit: '' })
}
