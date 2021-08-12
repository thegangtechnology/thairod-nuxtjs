/* eslint-disable camelcase */
import {
  getModule,
  VuexModule,
  Module,
  Action,
  Mutation
} from 'vuex-module-decorators'
import { store } from '@/store'
import {
  ShipmentDetail,
  ShipmentLine
} from '~/types/shipment.type'
import { getShipmentDetail, getShipments, setDeliverStatus, setPrintStatus, updateBatchNumber } from '~/services/shipment.service'

const name: string = 'shipmentModule'
if (store.state[name]) {
  store.unregisterModule(name)
}

type CheckBoolean = boolean | null

interface IChangeRow {
  id: number
  status: boolean
}

@Module({
  name,
  store,
  dynamic: true,
  stateFactory: true,
  namespaced: true
})
class ShipmentModule extends VuexModule {
  shipmentList: ShipmentLine[] = []

  selectedKeys: number[] = []

  changedRows: IChangeRow[] = []

  // Amount of shipments => show in tabs
  totalShipment: number = 0
  waitShipment: number = 0
  printShipment: number = 0
  outShipment: number = 0
  receivedShipment: number = 0
  batchShipment: number = 0
  nonbatchShipment: number = 0

  loading: boolean = false

  public get getShipmentList (): ShipmentLine[] {
    return this.shipmentList
  }

  public get isLoading () {
    return this.loading
  }

  public get getShipmentLength (): number {
    return this.shipmentList.length
  }

  public get getSelectedKeys (): number[] {
    return this.selectedKeys
  }

  public get getChangedRows (): IChangeRow[] {
    return this.changedRows
  }

  @Mutation
  SET_SHIPMENT_LIST (payload: ShipmentLine[]) {
    this.shipmentList = payload
  }

  @Mutation
  UPDATE_SHIPMENT (payload: ShipmentDetail) {
    this.shipmentList = this.shipmentList.map(order =>
      order.id === payload.id ? payload : order
    )
  }

  @Mutation
  SET_LOADING (value: boolean) {
    this.loading = value
  }

  @Mutation
  SET_TOTAL_AMOUNT (value: number) {
    this.totalShipment = value
  }

  @Mutation
  SET_WAIT_AMOUNT (value: number) {
    this.waitShipment = value
  }

  @Mutation
  SET_PRINT_AMOUNT (value: number) {
    this.printShipment = value
  }

  @Mutation
  SET_OUT_AMOUNT (value: number) {
    this.outShipment = value
  }

  @Mutation
  SET_RECEIVE_AMOUNT (value: number) {
    this.receivedShipment = value
  }

  @Mutation
  SET_BATCH_AMOUNT (value: number) {
    this.batchShipment = value
  }

  @Mutation
  SET_NONBATCH_AMOUNT (value: number) {
    this.nonbatchShipment = value
  }

  @Mutation
  SET_SELECTED_KEYS (payload: number[]) {
    this.selectedKeys = payload
  }

  @Mutation
  SET_CHANGED_ROWS (payload: IChangeRow[]) {
    this.changedRows = payload
  }

  @Action({ rawError: true })
  public setSelectedKeys (payload: number[]) {
    this.SET_SELECTED_KEYS(payload)
  }

  @Action({ rawError: true })
  public setChangedRows (payload: IChangeRow[]) {
    this.SET_CHANGED_ROWS(payload)
  }

  @Action({ rawError: true })
  public async initialiseShipment (
    payload: {
    label_printed?: CheckBoolean,
    deliver?: CheckBoolean,
    batch_isnull?: CheckBoolean,
    page?: number,
    page_size?: number,
  }
  ) {
    this.SET_LOADING(true)
    try {
      const res = await Promise.all([
        getShipments(),
        getShipments(false, false),
        getShipments(true, false),
        getShipments(true, true),
        getShipments(),
        getShipments(null, null, false),
        getShipments(null, null, true),
        getShipments(payload.label_printed, payload.deliver, payload.batch_isnull, payload.page, payload.page_size)
      ])
      this.SET_TOTAL_AMOUNT(res[0].count)
      this.SET_WAIT_AMOUNT(res[1].count)
      this.SET_PRINT_AMOUNT(res[2].count)
      this.SET_OUT_AMOUNT(res[3].count)
      this.SET_RECEIVE_AMOUNT(0)
      this.SET_BATCH_AMOUNT(res[5].count)
      this.SET_NONBATCH_AMOUNT(res[6].count)
      this.SET_SHIPMENT_LIST((res[7].result))
      this.SET_LOADING(false)
    } catch (error) {
      Promise.reject(new Error(error.message))
    }
  }

  @Action({ rawError: true })
  public getShipmentDetail (shipmentId: number): Promise<ShipmentDetail> {
    return Promise.resolve(getShipmentDetail(shipmentId))
  }

  @Action({ rawError: true })
  public updateShipment (payload: ShipmentDetail) {
    this.UPDATE_SHIPMENT(payload)
  }

  @Action({ rawError: true })
  public async updateBatch (payload: {
    batchNo: string
    selectedRowKeys: number[]
  }) {
    await updateBatchNumber(payload.batchNo, payload.selectedRowKeys)
    this.initialiseShipment({})
  }

  @Action({ rawError: true })
  public async setPrintStatus (payload: {
    selectedRowKeys: number[]
    printStatus: boolean
  }) {
    await setPrintStatus(payload.selectedRowKeys, payload.printStatus)
  }

  @Action({ rawError: true })
  public async setDeliverStatus (payload: {
    selectedRowKeys: number[]
    deliverStatus: boolean
  }) {
    await setDeliverStatus(payload.selectedRowKeys, payload.deliverStatus)
  }

  @Action({ rawError: true })
  public printLabel (selectedRowKeys: number[]) {
    const printURL = new URL(`${process.env.server_url}api/printlabel/`)
    selectedRowKeys.forEach((rowKey) => {
      printURL.searchParams.append('shipments', `${rowKey}`)
    })
    window.open(printURL.href, 'Print')?.focus()
    this.setPrintStatus({ selectedRowKeys, printStatus: true })
  }
}

export default getModule(ShipmentModule)
