import { $axios } from '~/utils/api'

export function openPrintResponse (url: string) : void {
  const tab = window.open('')
  $axios
    .get(url)
    .then((res) => {
      tab.document.write(res.request.response)
    })
}
