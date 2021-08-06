import {
  Action,
  getModule,
  Module,
  Mutation,
  VuexModule
} from 'vuex-module-decorators'
import { store } from '@/store'
import { $axios } from '@/utils/api'
import { Patient } from '@/types/patient.type'
import apiPath from '~/data/api_path'
import {
  OrderItem,
  DoctorInfo
} from '~/types/order.type'
import { ICheckoutProduct } from '~/types/product.type'

// remove duplicate module
const name: string = 'doctorModule'
if (store.state[name]) {
  store.unregisterModule(name)
}

@Module({
  dynamic: true,
  name,
  store
})
class DoctorModule extends VuexModule {
  patient: Patient = {} as Patient
  orderItems: OrderItem[] = []
  doctor: DoctorInfo = {} as DoctorInfo
  patientHash: string = ''
  doctorOrder: OrderItem[] = []
  patientLinkHash : string = ''

  @Mutation
  SET_DOCTOR_DETAIL ({
    doctor,
    patient,
    doctorOrder,
    patientLinkHash
  }: {
    doctor: DoctorInfo;
    patient: Patient;
    doctorOrder:OrderItem[];
    patientLinkHash:string
  }) {
    this.doctor = doctor
    this.patient = patient
    this.doctorOrder = doctorOrder
    this.patientLinkHash = patientLinkHash
  }

  @Mutation
  SET_PATIENT_HASH ({
    patientHash
  }: { patientHash: string }) {
    this.patientHash = patientHash
  }

  @Action({ commit: 'SET_DOCTOR_DETAIL' })
  public async getDoctorOrder ({ hash }: { hash: string }) {
    const res = await $axios.get(`${apiPath.orderFlow.hash}/?doctor=${hash}`)
    const data = res.data
    console.log('data', data)
    return {
      doctor: data.doctorInfo.doctor,
      patient: data.doctorInfo.patient,
      doctorOrder: data.doctorOrder.items,
      patientLinkHash: data.patientLinkHash
    }
  }

  @Action({ commit: 'SET_PATIENT_HASH' })
  public async doctorCheckout ({
    hash,
    products
  }: {
    hash: string;
    products: ICheckoutProduct[];
  }) {
    const data = {
      doctorLinkHash: hash,
      doctorOrder: {
        items: products
      }
    }
    const res = await $axios.post(`${apiPath.orderFlow.doctorCheckout}/`, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return {
      patientHash: res.data.patientLinkHash
    }
  }
}

export default getModule(DoctorModule)
