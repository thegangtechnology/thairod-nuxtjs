/* eslint-disable camelcase */
/**
 * FRONTEND Interface
 */
export interface IProduct {
  id: number
  createdDate: string
  description: string
  name: string
  price: string
  product: number
  unit: string
  updatedDate: string
}

export interface PatientInfo {
  name: string
  phoneNumber: string
  street: string
  province: string
  district: string
  subDistrict: string
  zipcode: string
  note: string
}

export interface OrderItem {
  id: number
  name: string
  price: string
  unit: string
  quantity: number
  description: string
}
