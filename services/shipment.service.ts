import apiPath from '~/data/api_path'
import { ShipmentDetail, ShipmentForm, ShipmentLine, ShipmentResponse, Status } from '~/types/shipment.type'
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
  page: number = 1,
  page_size: number = 100
): Promise<ShipmentsResult> => {
  try {
    const response = await $axios.get(
      `${apiPath.shipment}/`, {
        params: {
          page,
          batch_isnull,
          label_printed,
          deliver,
          search: null,
          page_size
        }
      })
    const responseResult: ShipmentResponse[] = response.data.results
    const resultList: ShipmentLine[] = []
    responseResult.forEach((result) => {
      resultList.push({
        id: result.id,
        shipmentItem: result.orderItems.map((order) => {
          return { ...order.productVariation, quantity: order.quantity }
        }),
        created_date: result.createdDate,
        batch: result.batch,
        tracking_code: result.trackingCode,
        deliver: result.deliver,
        label_printed: result.labelPrinted,
        status: getStatus(result.deliver, result.labelPrinted),
        cid: result.order.cid,
        patientName: result.order.receiverAddress.name
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
      shipmentItem: responseResult.orderItems.map((order) => {
        return { ...order.productVariation, quantity: order.quantity }
      }),
      created_date: responseResult.createdDate,
      batch: responseResult.batch,
      tracking_code: responseResult.trackingCode,
      deliver: responseResult.deliver,
      label_printed: responseResult.labelPrinted,
      status: getStatus(responseResult.deliver, responseResult.labelPrinted),
      cid: responseResult.order.cid,
      patientName: responseResult.order.receiverAddress.name,
      telno: responseResult.order.receiverAddress.telno,
      warehouse: responseResult.warehouse,
      orderer_name: responseResult.order.ordererName,
      orderer_license: responseResult.order.ordererLicense,
      receiver_id: responseResult.order.receiverAddress.id,
      updated_name: '',
      updated_date: responseResult.updatedDate,
      house_number: responseResult.order.receiverAddress.houseNumber,
      province: responseResult.order.receiverAddress.province,
      district: responseResult.order.receiverAddress.district,
      subdistrict: responseResult.order.receiverAddress.subdistrict,
      postal_code: responseResult.order.receiverAddress.postalCode,
      note: responseResult.order.receiverAddress.note
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
    },
    {
      headers: {
        'Content-Type': 'application/json'
      }
    })
  } catch (error) {
    return Promise.reject(new Error(error.message))
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
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
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
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
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
    const res = await $axios.get('/api/batch-shipments/next-generated-name/')
    return Promise.resolve(res.data.name)
  } catch (error) {
    return Promise.reject(new Error(error))
  }
}

export const updateAddress = async (addressId: number, updateForm: ShipmentForm) => {
  try {
    await $axios.patch(`/api/address/${addressId}/`, updateForm,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      })
  } catch (error) {
    return Promise.reject(new Error(error))
  }
}
