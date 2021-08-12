import { AxiosResponse } from 'axios'
import { $axios } from '~/utils/api'
import apiPath from '~/data/api_path'
import { DashboardResponse } from '~/types/dashboard/dashboard-service.type'

export function getDashboardInfo () : Promise<DashboardResponse> {
  return $axios
    .get(`${apiPath.dashboard}/`)
    .then((res) => {
      return res.data
    })
    .catch(() => {
      return Promise.resolve({} as DashboardResponse)
    })
}

export function printShipment (dateStr: string) : Promise<AxiosResponse> {
  const dateObj = new Date(dateStr)
  const year = dateObj.getFullYear()
  const month = dateObj.getMonth() + 1 < 10 ? '0' + dateObj.getMonth() : dateObj.getMonth()
  const date = dateObj.getDate() < 10 ? '0' + dateObj.getDate() : dateObj.getDate()
  console.log(`${apiPath.printOfTheDay}/?date=${year}-${month}-${date}`)
  return $axios.get(`${apiPath.printOfTheDay}/?date=${year}-${month}-${date}`)
}
