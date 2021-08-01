import {
  getModule,
  VuexModule,
  Module,
  Action,
  Mutation,
} from 'vuex-module-decorators'
import { store } from '@/store'
import moment from 'moment'
import {
  ShipmentDetail,
  ShipmentLine,
  ShipmentResponse,
  Status,
} from '~/types/shipment.type'
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

const name: string = 'shipmentModule'
if (store.state[name]) {
  store.unregisterModule(name)
}

@Module({
  dynamic: true,
  name,
  store,
})
class ShipmentModule extends VuexModule {
  shipmentList: ShipmentLine[] = []

  public get getShipmentList(): ShipmentLine[] {
    return this.shipmentList
  }

  public get getShipmentLength(): number {
    return this.shipmentList.length
  }

  public get getNextBatchName() {
    return Promise.resolve(
      $axios.get('/api/batch-shipments/next_generated_name/')
    )
  }

  @Mutation
  SET_SHIPMENT_LIST(payload: ShipmentLine[]) {
    this.shipmentList = payload
  }

  @Mutation
  UPDATE_SHIPMENT(payload: ShipmentLine) {
    this.shipmentList = this.shipmentList.map((order) =>
      order.id === payload.id ? payload : order
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
      if (payload.selectedRows.includes(item.id)) item.status = payload.status
    })
  }

  @Action({ rawError: true })
  public async initialiseShipment() {
    const shipmentResponse = await $axios.get('/api/shipments/')
    const shipment: ShipmentResponse = shipmentResponse.data
    const temp: ShipmentLine[] = []
    shipment.results.forEach((result) => {
      temp.push({
        id: result.id,
        shipmentItem: result.order.map((order) => {
          return { ...order.product_variation, quantity: order.quantity }
        }),
        created_date: result.created_date,
        batch: result.batch,
        tracking_code: result.tracking_code,
        deliver: result.deliver,
        label_printed: result.label_printed,
        status: getStatus(result.deliver, result.label_printed),
        cid: formatPhoneNumber(),
        patientName: `First ${result.id} Last ${result.id}`,
      })
    })
    this.SET_SHIPMENT_LIST(temp)
  }

  @Action({ rawError: true })
  public getShipmentDetail(shipmentId: number): Promise<ShipmentDetail> {
    const exist = this.shipmentList.find((order) => order.id === shipmentId)
    if (exist) {
      const shipment: ShipmentDetail = {
        ...exist,
        phoneNumber: '081-111-1111',
        warehouse: 'EDP',
        orderedBy: 'Dr. Some Body',
        updatedBy: 'Update User',
        updatedDate: moment(randomDate()).format(),
        address: '130/8 Moo 11 Suksawad Road Kru Nai, 10130 Phra Pradaeng',
        province: 'กรุงเทพมหานคร',
        district: 'บางรัก',
        subDistrict: 'สี่พระยา',
        zipCode: '10130',
        remark: 'Blue House',
      }
      return Promise.resolve(shipment)
    } else {
      return Promise.reject()
    }
  }

  @Action({ rawError: true })
  public updateShipment(payload: ShipmentLine) {
    this.UPDATE_SHIPMENT(payload)
  }

  @Action({ rawError: true })
  public async updateBatch(payload: {
    batchNo: string
    selectedRowKeys: number[]
  }) {
    try {
      await $axios.post('/api/batch-shipments/assign/', {
        batch_name: payload.batchNo,
        shipments: payload.selectedRowKeys,
      })
    } catch (error) {
      console.log('Error update Batch: ', error)
    } finally {
      await this.initialiseShipment()
    }
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

  @Action({ rawError: true })
  public printLabel(selectedRowKeys: number[]) {
    const printURL = new URL($axios.defaults.baseURL! + '/api/printlabel/')
    selectedRowKeys.forEach((rowKey) => {
      printURL.searchParams.append('shipments', `${rowKey}`)
    })
    console.log('printURL :>> ', printURL)
  }
}

export default getModule(ShipmentModule)
