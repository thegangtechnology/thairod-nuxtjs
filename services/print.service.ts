import { $axios } from '~/utils/api'

export function openPrintResponse (url: string) : void {
  const tab = window.open('')
  if (tab === null) { return }
  $axios
    .get(url)
    .then((res) => {
      tab.document.write(res.request.response)
    })
    .catch(() => {
      $nuxt.error({ statusCode: 404 })
    })
}
