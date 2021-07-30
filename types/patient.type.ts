/**
 * Frontend Interface
 */

export interface Patient {
  id?: number
  fullName?: string
  phone?: string
  cardNumber?:string
}

/**
 * Backend Interface
 */

export interface PatientJson {
  id: number
  first_name:string
  last_name: string
  phone: string
  card_number:string
}
