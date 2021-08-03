import apiPath from '~/data/api_path'
import { ShipmentDetail, ShipmentLine, ShipmentResponse, Status } from '~/types/shipment.type'
import { $axios } from '~/utils/api'

type CheckBoolean = boolean | null

interface ShipmentsResult {
  count: number
  result: ShipmentLine[]
}

const getStatus = (deliver: boolean, label_printed: boolean): Status => {
  if (deliver && label_printed) {
    return 'out'
  }
  if (!deliver && label_printed) {
    return 'print'
  }
  if (!deliver && !label_printed) {
    return 'wait'
  }
  return 'received'
}

export const getShipments = async (
  label_printed: CheckBoolean = null,
  deliver: CheckBoolean = null,
  batch_isnull: CheckBoolean = null,
  page: number = 1
): Promise<ShipmentsResult> => {
  try {
    const response = await $axios.get(
      `${apiPath.shipment}`, {
        params: {
          page,
          batch_isnull,
          label_printed,
          deliver
        }
      })
    const responseResult: ShipmentResponse[] = response.data.results
    const resultList: ShipmentLine[] = []
    responseResult.forEach((result) => {
      resultList.push({
        id: result.id,
        shipmentItem: result.order_items.map((order) => {
          return { ...order.product_variation, quantity: order.quantity }
        }),
        created_date: result.created_date,
        batch: result.batch,
        tracking_code: result.tracking_code,
        deliver: result.deliver,
        label_printed: result.label_printed,
        status: getStatus(result.deliver, result.label_printed),
        cid: result.order.cid,
        patientName: result.order.receiver_address.name
      })
    })
    return { count: response.data.count, result: resultList }
  } catch (error) {
    return Promise.reject(new Error(error))
  }
}

export const getShipmentDetail = async (id: number): Promise<ShipmentDetail> => {
  try {
    const response = await $axios.get(`/api/shipments/${id}/`)
    const responseResult: ShipmentResponse = response.data
    return Promise.resolve({
      id: responseResult.id,
      shipmentItem: responseResult.order_items.map((order) => {
        return { ...order.product_variation, quantity: order.quantity }
      }),
      created_date: responseResult.created_date,
      batch: responseResult.batch,
      tracking_code: responseResult.tracking_code,
      deliver: responseResult.deliver,
      label_printed: responseResult.label_printed,
      status: getStatus(responseResult.deliver, responseResult.label_printed),
      cid: responseResult.order.cid,
      patientName: responseResult.order.receiver_address.name,
      telno: responseResult.order.receiver_address.telno,
      warehouse: responseResult.warehouse,
      orderer_name: responseResult.order.orderer_name,
      orderer_license: responseResult.order.orderer_license,
      updated_name: '',
      updated_date: responseResult.updated_date,
      house_number: responseResult.order.receiver_address.house_number,
      province: responseResult.order.receiver_address.province,
      district: responseResult.order.receiver_address.district,
      subdistrict: responseResult.order.receiver_address.subdistrict,
      postal_code: responseResult.order.receiver_address.postal_code,
      note: responseResult.order.receiver_address.note
    })
  } catch (error) {
    return Promise.reject(new Error(error))
  }
}

export const updateBatchNumber = async (
  batchNo: string,
  selectedRowKeys: number[]
): Promise<void> => {
  try {
    await $axios.post('/api/batch-shipments/assign/', {
      batch_name: batchNo,
      shipments: selectedRowKeys
    })
  } catch (error) {
    return Promise.reject(new Error(error))
  }
}

export const setPrintStatus = async (
  selectedRowKeys: number[],
  printStatus: boolean
): Promise<void> => {
  const temp: any[] = []
  if (selectedRowKeys.length > 0) {
    selectedRowKeys.forEach((rowKey) => {
      temp.push(
        $axios.patch(`/api/shipments/${rowKey}/`, {
          label_printed: printStatus
        })
      )
    })
    try {
      await Promise.all(temp)
    } catch (error) {
      return Promise.reject(new Error(error))
    }
  }
}

export const setDeliverStatus = async (
  selectedRowKeys: number[],
  deliverStatus: boolean
): Promise<void> => {
  const temp: any[] = []
  if (selectedRowKeys.length > 0) {
    selectedRowKeys.forEach((rowKey) => {
      temp.push(
        $axios.patch(`/api/shipments/${rowKey}/`, {
          deliver: deliverStatus
        })
      )
    })
    try {
      await Promise.all(temp)
    } catch (error) {
      return Promise.reject(new Error(error))
    }
  }
}

export const getBatchNumber = async () => {
  try {
    const res = await $axios.get('/api/batch-shipments/next_generated_name/')
    return Promise.resolve(res.data.name)
  } catch (error) {
    return Promise.reject(new Error(error))
  }
}
