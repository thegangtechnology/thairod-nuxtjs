/* eslint-disable camelcase */
import { PatientJson } from '~/types/patient.type'

export default class PatientClass {
  id?: number
  fullName?: string
  phone?: string
  cardNumber?: string

  constructor ({ id, first_name, last_name, phone, card_number }: Partial<PatientJson>) {
    this.id = id
    this.fullName = `${first_name} ${last_name}`
    this.phone = phone
    this.cardNumber = card_number
  }
}
