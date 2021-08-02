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
  ShipmentAddress,
  ShipmentDetail,
  ShipmentLine,
  ShipmentResponse,
  ShipmentResult,
  Status,
} from '~/types/shipment.type'
import { Warehouse } from '~/models/Warehouse'
import { $axios } from '@/utils/api'

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
  name,
  store,
  dynamic: true,
  stateFactory: true,
  namespaced: true,
})
class ShipmentModule extends VuexModule {
  shipmentList: ShipmentLine[] = []
  loading: boolean = false

  public get getShipmentList(): ShipmentLine[] {
    return this.shipmentList.sort((a: ShipmentLine, b: ShipmentLine) =>
      a.id > b.id ? 1 : -1
    )
  }

  public get isLoading() {
    return this.loading
  }

  public get getShipmentLength(): number {
    return this.shipmentList.length
  }

  @Mutation
  SET_SHIPMENT_LIST(payload: ShipmentLine[]) {
    this.shipmentList = payload
  }

  @Mutation
  UPDATE_SHIPMENT(payload: ShipmentDetail) {
    this.shipmentList = this.shipmentList.map((order) =>
      order.id === payload.id ? payload : order
    )
  }

  @Mutation
  SET_STATUS(payload: { status: Status; selectedRows: number[] }) {
    this.shipmentList.forEach((item) => {
      if (payload.selectedRows.includes(item.id)) item.status = payload.status
    })
  }

  @Mutation
  SET_LOADING(value: boolean) {
    this.loading = value
  }

  @Action({ rawError: true })
  public async initialiseShipment() {
    this.SET_LOADING(true)
    try {
      const shipmentResponse = await $axios.get('/api/shipments/')
      const shipment: ShipmentResponse = shipmentResponse.data
      const temp: ShipmentLine[] = []
      shipment.results.forEach(async (result) => {
        const orderResponse: {
          data: {
            cid: string
            orderer_name: string
            receiver_address: number
            orderer_license: string
          }
        } = await $axios.get(`/api/orders/${result.id}/`)
        const addressResponse: { data: ShipmentAddress } = await $axios.get(
          `/api/address/${orderResponse.data.receiver_address}/`
        )
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
          cid: orderResponse.data.cid,
          patientName: addressResponse.data.name,
        })
      })
      this.SET_SHIPMENT_LIST(temp)
    } catch (e) {
      console.log('Error from init :>> ', e)
    } finally {
      this.SET_LOADING(false)
    }
  }

  @Action({ rawError: true })
  public async getShipmentDetail(shipmentId: number): Promise<ShipmentDetail> {
    const shipmentResponse = await $axios.get(`/api/shipments/${shipmentId}/`)
    const shipment: ShipmentResult = shipmentResponse.data
    const orderResponse: {
      data: {
        cid: string
        orderer_name: string
        receiver_address: number
        orderer_license: string
      }
    } = await $axios.get(`/api/orders/${shipment.id}/`)
    const warehouseResponse: { data: Warehouse } = await $axios.get(
      `/api/warehouses/${shipment.warehouse}/`
    )
    const addressResponse: { data: ShipmentAddress } = await $axios.get(
      `/api/address/${orderResponse.data.receiver_address}/`
    )
    const result: ShipmentDetail = {
      id: shipment.id,
      shipmentItem: shipment.order.map((order) => {
        return { ...order.product_variation, quantity: order.quantity }
      }),
      created_date: shipment.created_date,
      batch: shipment.batch,
      tracking_code: shipment.tracking_code,
      deliver: shipment.deliver,
      label_printed: shipment.label_printed,
      status: getStatus(shipment.deliver, shipment.label_printed),
      cid: orderResponse.data.cid,
      patientName: addressResponse.data.name,
      telno: addressResponse.data.telno,
      warehouse: warehouseResponse.data.name,
      orderer_name: orderResponse.data.orderer_name,
      orderer_license: orderResponse.data.orderer_license,
      updated_name: '',
      updated_date: addressResponse.data.updated_date,
      house_number: addressResponse.data.house_number,
      province: addressResponse.data.province,
      district: addressResponse.data.district,
      subdistrict: addressResponse.data.subdistrict,
      postal_code: addressResponse.data.postal_code,
      note: addressResponse.data.note,
    }
    return Promise.resolve(result)
  }

  @Action({ rawError: true })
  public updateShipment(payload: ShipmentDetail) {
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
  public async setPrintStatus(payload: {
    selectedRowKeys: number[]
    printStatus: boolean
  }) {
    const temp: any[] = []
    if (payload.selectedRowKeys.length > 0) {
      payload.selectedRowKeys.forEach((rowKey) => {
        temp.push(
          $axios.patch(`/api/shipments/${rowKey}/`, {
            label_printed: payload.printStatus,
          })
        )
      })
      try {
        await Promise.all(temp)
      } catch (e) {
        console.log('Error set print status :>> ', e)
      } finally {
        await this.initialiseShipment()
      }
    }
  }

  @Action({ rawError: true })
  public async setDeliverStatus(payload: {
    selectedRowKeys: number[]
    deliverStatus: boolean
  }) {
    const temp: any[] = []
    if (payload.selectedRowKeys.length > 0) {
      payload.selectedRowKeys.forEach((rowKey) => {
        temp.push(
          $axios.patch(`/api/shipments/${rowKey}/`, {
            deliver: payload.deliverStatus,
          })
        )
      })
      try {
        await Promise.all(temp)
      } catch (e) {
        console.log('Error set print status :>> ', e)
      } finally {
        await this.initialiseShipment()
      }
    }
  }

  @Action({ rawError: true })
  public async printLabel(selectedRowKeys: number[]) {
    const printURL = new URL($axios.defaults.baseURL! + 'api/printlabel/')
    selectedRowKeys.forEach((rowKey) => {
      printURL.searchParams.append('shipments', `${rowKey}`)
    })
    window.open(printURL.href, 'Print')?.focus()
    this.setPrintStatus({ selectedRowKeys, printStatus: true })
    // $axios.get(printURL.href).then((res) => {
    // var printWindow = window.open('', 'Print')
    // printWindow!.document.write(res.data)
    //   printWindow!.print()
    //   printWindow!.close()
    //   console.log('res :>> ', res)
    // })
    // const printWindow = window
    //   .open(printURL.href)
    //   .setTimeout(window.print(), 3000)
    // printWindow!.document.write(
    //   `<body onload="window.print()"><iframe style="position:fixed; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden; z-index:999999;" src="${printURL.href}"></body>`
    // )
    // printWindow!.document.close()
    // printWindow!.focus()
    // printWindow!.print()
    // printWindow!.document.close()
    // printWindow!.close()
  }

  @Action({ rawError: true })
  public async getNextBatchNo() {
    const res = await $axios.get('/api/batch-shipments/next_generated_name/')
    return Promise.resolve(res.data.name)
  }
}

export default getModule(ShipmentModule)
