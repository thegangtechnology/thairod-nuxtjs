/* eslint-disable camelcase */
/**
 * FRONTEND Interface
 */
type Status = 'wait' | 'print' | 'out' | 'received'

export interface Main {
  [key: string]: string | boolean
}

export interface DoctorInfo {
  name: string
  license: string
}

export interface IProduct {
  id: number;
  createdDate: string;
  description: string;
  name: string;
  price: string;
  product: number;
  unit: string;
  updatedDate: string;
  productDescription: string;
}

export interface PatientInfo {
  name: string;
  phoneNumber: string;
  street: string;
  province: string;
  district: string;
  subDistrict: string;
  zipcode: string;
  note: string;
}

export interface OrderItem {
  id: number
  name: string
  price: string
  unit: string
  quantity: number
  description: string
  productDescription: string
}

export interface IOrder extends Main {
  orderId: string
  cid: string
  patientName: string
  phoneNumber: string
  orderedItem: string
  orderedDate: string
  exportBatch: string
  trackingNo: string
  warehouse: string
  orderedBy: string
  updatedBy: string
  updatedDate: string
  address: string
  province: string
  district: string
  subDistrict: string
  zipCode: string
  remark: string
  deliveryStatus: boolean
  printStatus: boolean
  status: Status
}
