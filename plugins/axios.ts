import { Context } from '@nuxt/types'
import camelcaseKeys from 'camelcase-keys'
import snakecaseKeys from 'snakecase-keys'

export default function ({ $axios }: Context) {
  $axios.defaults.transformResponse = [
    (data, headers) => {
      if (data && headers['content-type'].includes('application/json')) {
        return camelcaseKeys(JSON.parse(data), { deep: true })
      }
    }
  ]
  $axios.defaults.transformRequest = [
    (data) => {
      if (data) {
        return JSON.stringify(snakecaseKeys(data, { deep: true }))
      }
    }]
  $axios.interceptors.request.use((config) => {
    const newConfig = { ...config }
    if (config.params) {
      newConfig.params = snakecaseKeys(config.params)
    }
    return newConfig
  })
}
