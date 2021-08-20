import {$axios} from '~/utils/api'
import apiPath from '~/data/api_path'
import {DashboardResponse} from '~/types/dashboard/dashboard-service.type'
import { openPrintResponse } from '~/services/print.service'

export function getDashboardInfo(): Promise<DashboardResponse> {
  return $axios
    .get(`${apiPath.dashboard}/`)
    .then((res) => {
      return res.data
    })
    .catch(() => {
      return Promise.resolve({} as DashboardResponse)
    })
}

export function printShipment(dateStr: string, baseURL: string) {
  const dateObj = new Date(dateStr)
  const year = dateObj.getFullYear()
  const month_no = dateObj.getMonth() + 1
  const month = month_no < 10 ? '0' + month_no : month_no
  const date = dateObj.getDate() < 10 ? '0' + dateObj.getDate() : dateObj.getDate()
  const url = `${baseURL}${apiPath.printOfTheDay}/?date=${year}-${month}-${date}`
  openPrintResponse(url)
}
