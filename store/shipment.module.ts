import { VuexModule, Module, Action, Mutation } from 'vuex-module-decorators'
import moment from 'moment'
import { ShipmentLine, ShipmentResponse, Status } from '~/types/shipment.type'
import { $axios } from '@/utils/api'

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

@Module({ name: 'shipmentModule', stateFactory: true, namespaced: true })
export default class Shipment extends VuexModule {
  shipmentList: ShipmentLine[] = []

  public get getShipmentList(): ShipmentLine[] {
    return this.shipmentList
  }

  public get getShipmentLength(): number {
    return this.shipmentList.length
  }

  @Mutation
  SET_SHIPMENT_LIST(payload: ShipmentLine[]) {
    this.shipmentList = payload
  }

  @Mutation
  UPDATE_SHIPMENT(payload: ShipmentLine) {
    this.shipmentList = this.shipmentList.map((order) =>
      order.orderId === payload.orderId ? payload : order
    )
  }

  // @Mutation
  // SET_BATCH_NUM(payload: { batchNo: string; selectedRows: string[] }) {
  //   this.shipmentList.forEach((item) => {
  //     if (payload.selectedRows.includes(item.orderId)) {
  //       item.exportBatch = payload.batchNo
  //     }
  //   })
  // }

  @Mutation
  SET_STATUS(payload: { status: Status; selectedRows: number[] }) {
    this.shipmentList.forEach((item) => {
      if (payload.selectedRows.includes(item.orderId))
        item.status = payload.status
    })
  }

  @Action({ rawError: true })
  public async initialiseOrder() {
    const shipmentResponse = await $axios.get('/api/shipments/')
    const shipment: ShipmentResponse = shipmentResponse.data
    const temp: ShipmentLine[] = []
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
    if (this.shipmentList.length < 1) this.SET_SHIPMENT_LIST(temp)
  }

  @Action({ rawError: true })
  public getOrderDetail(orderId: number) {
    return Promise.resolve(
      this.shipmentList.find((order) => order.orderId === orderId)
    )
  }

  @Action({ rawError: true })
  public updateOrder(payload: ShipmentLine) {
    this.UPDATE_SHIPMENT(payload)
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
