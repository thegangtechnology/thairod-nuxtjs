import { Context } from '@nuxt/types'
import camelcaseKeys from 'camelcase-keys'

export default function ({ $axios }: Context) {
  $axios.defaults.transformResponse = [
    (data, headers) => {
      if (data && headers['content-type'].includes('application/json')) {
        return camelcaseKeys(JSON.parse(data), { deep: true })
      }
    },
  ]
}
