import { $axios } from '~/utils/api'

export function openPrintResponse (url: string) : Promise<void> {
  return $axios
    .get(url)
    .then((res) => {
      const tab = window.open('')
      if (tab !== null) {
        tab.document.write(res.request.response)
      }
    })
    .catch((err) => {
      window.$nuxt.error({ statusCode: err.statusCode })
    })
}
