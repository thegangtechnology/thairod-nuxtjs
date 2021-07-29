/* eslint-disable camelcase */
import { PatientJson } from '~/types/patient.type'

export default class PatientClass {
  id?: number
  fullName?: string
  phone?: string

  constructor ({ id, first_name, last_name, phone }: Partial<PatientJson>) {
    this.id = id
    this.fullName = `${first_name} ${last_name}`
    this.phone = phone
  }
}
