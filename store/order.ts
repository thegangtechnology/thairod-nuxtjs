import { VuexModule, Module, Action, Mutation } from 'vuex-module-decorators'
import moment from 'moment'
import { IOrder, IShipmentResponse } from '~/types/order.type'
import { $axios } from '@/utils/api'

type Status = 'wait' | 'print' | 'out' | 'received'

const randomCID = (): string => {
  return String(
    Math.floor(Math.random() * (9999999999999 - 1111111111111 + 1)) +
      1111111111111
  )
}

const randomDate = (): number => {
  return (
    Math.floor(Math.random() * (1627572799000 - 1627171200000 + 1)) +
    1627171200000
  )
}

const formatPhoneNumber = () => {
  const cleaned = ('' + randomCID()).replace(/\D/g, '')
  const match = cleaned.match(/^(\d{1})(\d{4})(\d{5})(\d{2})(\d{1})$/)
  if (match) {
    return `${match[1]}-${match[2]}-${match[3]}-${match[4]}-${match[5]}`
  }
  return ''
}

const getStatus = (deliver: boolean, label_printed: boolean): Status => {
  if (deliver && label_printed) return 'out'
  if (!deliver && label_printed) return 'print'
  if (!deliver && !label_printed) return 'wait'
  return 'received'
}

@Module({ name: 'order', stateFactory: true, namespaced: true })
export default class Order extends VuexModule {
  orderList: IOrder[] = []

  public get getOrderList(): IOrder[] {
    return this.orderList
  }

  public get getOrderListLength(): number {
    return this.orderList.length
  }

  @Mutation
  SET_ORDER_LIST(payload: IOrder[]) {
    this.orderList = payload
  }

  @Mutation
  UPDATE_ORDER(payload: IOrder) {
    this.orderList = this.orderList.map((order) =>
      order.orderId === payload.orderId ? payload : order
    )
  }

  // @Mutation
  // SET_BATCH_NUM(payload: { batchNo: string; selectedRows: string[] }) {
  //   this.orderList.forEach((item) => {
  //     if (payload.selectedRows.includes(item.orderId)) {
  //       item.exportBatch = payload.batchNo
  //     }
  //   })
  // }

  @Mutation
  SET_STATUS(payload: { status: Status; selectedRows: number[] }) {
    this.orderList.forEach((item) => {
      if (payload.selectedRows.includes(item.orderId))
        item.status = payload.status
    })
  }

  @Action({ rawError: true })
  public async initialiseOrder() {
    const tokenRes: { data: { access: string } } = await $axios.post(
      '/api/token/',
      {
        username: process.env.username,
        password: process.env.password,
      }
    )
    $axios.setToken(tokenRes.data.access, 'Bearer')
    const shipmentResponse = await $axios.get('/api/shipments/')
    const shipment: IShipmentResponse = shipmentResponse.data
    console.log('shipmentResponse :>> ', shipmentResponse)
    // const currentTime = moment().format('YYYY-MM-DD')
    // const randomItem: string[] = ['Green Package', 'Yellow Package']
    // const randomStatus: Status[] = ['wait', 'print', 'out', 'received']
    // const randomBatch: string[] = [
    //   'ยังไม่ได้มอบหมาย',
    //   `${currentTime}-01`,
    //   `${currentTime}-02`,
    // ]
    // const randomBoolean: boolean[] = [true, false]
    const temp: IOrder[] = []
    shipment.results.forEach((result) => {
      temp.push({
        orderId: result.id,
        orderedItem: result.order.map((order) => order.product_variation),
        orderedDate: result.created_date,
        exportBatch: result.batch,
        trackingNo: result.tracking_code,
        deliver: result.deliver,
        label_printed: result.label_printed,
        status: getStatus(result.deliver, result.label_printed),
        cid: formatPhoneNumber(),
        patientName: `First ${result.id} Last ${result.id}`,
      })
    })
    // for (let i = 0; i < 100; i++) {
    //   temp.push({
    //     orderId: `${i + 1}`,
    //     cid: formatPhoneNumber(),
    //     patientName: `First ${i} Last ${i}`,
    //     phoneNumber: '081-111-1111',
    //     orderedItem: randomItem[Math.floor(Math.random() * randomItem.length)],
    //     orderedDate: moment(randomDate()).format(),
    //     exportBatch:
    //       randomBatch[Math.floor(Math.random() * randomBatch.length)],
    //     trackingNo: `KT${i}${moment(randomDate()).format('x')}`,
    //     warehouse: 'EDP',
    //     orderedBy: 'Dr. Some Body',
    //     updatedBy: 'Update User',
    //     updatedDate: moment(randomDate()).format(),
    //     address: '130/8 Moo 11 Suksawad Road Kru Nai, 10130 Phra Pradaeng',
    //     province: 'กรุงเทพมหานคร',
    //     district: 'บางรัก',
    //     subDistrict: 'สี่พระยา',
    //     zipCode: '10130',
    //     remark: 'Blue House',
    //     deliver:
    //       randomBoolean[Math.floor(Math.random() * randomBoolean.length)],
    //     label_printed:
    //       randomBoolean[Math.floor(Math.random() * randomBoolean.length)],
    //     status: randomStatus[Math.floor(Math.random() * randomStatus.length)],
    //   })
    // }
    if (this.orderList.length < 1) this.SET_ORDER_LIST(temp)
  }

  @Action({ rawError: true })
  public getOrderDetail(orderId: number) {
    return Promise.resolve(
      this.orderList.find((order) => order.orderId === orderId)
    )
  }

  @Action({ rawError: true })
  public updateOrder(payload: IOrder) {
    this.UPDATE_ORDER(payload)
  }

  @Action({ rawError: true })
  public updateExportBatch(payload: {
    batchNo: string
    selectedRows: string[]
  }) {
    // this.SET_BATCH_NUM(payload)
  }

  // @Action({ rawError: true })
  // public setPrintStatus(selectedRows: string[]) {
  //   this.SET_OTHER_STATUS({ dataIndex: 'printStatus', selectedRows })
  // }

  // @Action({ rawError: true })
  // public updateDeliveryStatus(selectedRows: string[]) {
  //   this.SET_OTHER_STATUS({
  //     dataIndex: 'deliveryStatus',
  //     selectedRows,
  //   })
  // }

  @Action({ rawError: true })
  public updateStatus(payload: { status: Status; selectedRows: number[] }) {
    this.SET_STATUS({
      status: payload.status,
      selectedRows: payload.selectedRows,
    })
  }
}
