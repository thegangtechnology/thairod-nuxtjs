export interface IColumns {
  title?: string
  key?: string
  dataIndex?: string
  scopedSlots?: { customRender: string }
  align?: string
}

export const columns: IColumns[] = [
  {
    title: 'เลขที่รายการสั่งซื้อ',
    scopedSlots: { customRender: 'id' },
  },
  {
    title: 'รายการสินค้า',
    scopedSlots: { customRender: 'shipmentItem' },
  },
  {
    title: 'จำนวน',
    scopedSlots: { customRender: 'quantity' },
  },
  {
    title: 'ผู้รับการรักษา',
    dataIndex: 'patientName',
    scopedSlots: { customRender: 'patientName' },
  },
  {
    title: 'หมายเลขติดตาม',
    dataIndex: 'tracking_code',
  },
  {
    title: 'สถานะการจัดส่ง',
    dataIndex: 'status',
    scopedSlots: { customRender: 'status' },
    align: 'center',
  },
  {
    title: 'ล็อตการจัดส่ง',
    dataIndex: 'batch',
    scopedSlots: { customRender: 'batch' },
  },
]

export const columnsWithOperation: IColumns[] = [
  ...columns,
  {
    key: 'operation',
    scopedSlots: { customRender: 'operation' },
  },
]
