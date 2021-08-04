import {
  Action,
  getModule,
  Module,
  Mutation,
  VuexModule
} from 'vuex-module-decorators'
import { store } from '@/store'
import { $axios } from '@/utils/api'
import snakecaseKeys from 'snakecase-keys'
import { Patient } from '@/types/patient.type'
import apiPath from '~/data/api_path'
import {
  OrderItem,
  PatientInfo,
  IProduct,
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

  @Mutation
  SET_DOCTOR_DETAIL ({
    doctor,
    patient
  }: {
    doctor: DoctorInfo;
    patient: Patient;
  }) {
    this.doctor = doctor
    this.patient = patient
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
    return {
      doctor: data.doctorInfo.doctor,
      patient: data.doctorInfo.patient
    }
  }

  @Action({ commit: 'SET_PATIENT_HASH' })
  public async doctorCheckout ({
    hash,
    products
  }: {
    hash: string;
    products: ICheckoutProduct;
  }) {
    const data = {
      doctorLinkHash: hash,
      doctorOrder: {
        items: products
      }
    }
    const snakecaseData: { [key: string]: any } = snakecaseKeys(data, {
      deep: true
    })
    const res = await $axios.post(`${apiPath.orderFlow.doctorCheckout}/`, snakecaseData)
    return {
      patientHash: res.data.patientLinkHash
    }
  }
}

export default getModule(DoctorModule)
