import {
  Action,
  getModule,
  Module,
  Mutation,
  VuexModule
} from 'vuex-module-decorators'
import { store } from '@/store'
import { $axios } from '@/utils/api'
import { OrderItem, PatientInfo, IProduct } from '~/types/order.type'
import { ICheckoutProduct } from '~/types/product.type'
import apiPath from '~/data/api_path'

// remove duplicate module
const name: string = 'checkoutModule'
if (store.state[name]) {
  store.unregisterModule(name)
}

@Module({
  dynamic: true,
  name,
  store
})
class CheckoutModule extends VuexModule {
  patient: PatientInfo = {} as PatientInfo
  orderItems: OrderItem[] = []

  @Mutation
  SET_CHECKOUT_DETAIL ({
    patient,
    orderItems
  }: {
    patient: PatientInfo;
    orderItems: OrderItem[];
  }) {
    if (Object.keys(this.patient).length !== 0) {
      return
    }
    this.patient = patient
    this.orderItems = orderItems
  }

  @Mutation
  SET_ADDRESS (patient: PatientInfo) {
    this.patient = patient
  }

  @Action({ commit: 'SET_CHECKOUT_DETAIL' })
  public async getPatientOrder ({ patientHash }: { patientHash: string }) {
    const res = await $axios.get(
      `${apiPath.orderFlow.hash}/?patient=${patientHash}/`
    )
    const data = res.data
    const patientRes = data.doctorInfo.patient
    const address = data.doctorInfo.shippingAddress

    const patient: PatientInfo = {
      name: patientRes.name,
      phoneNumber: address.phoneNumber,
      street: address.street,
      province: address.province,
      district: address.district,
      subDistrict: address.subDistrict,
      zipcode: address.zipcode,
      note: address.note
    }

    // convert item id to name
    const productVariationRes = await $axios.get(
      `${apiPath.productVariation}/`
    )
    const mappedDoctorOrder = data.doctorOrder.map(
      (orderProduct: ICheckoutProduct) => {
        const foundProduct = productVariationRes.data.results.find(
          (product: IProduct) => product.id === orderProduct.itemId
        )
        return {
          id: foundProduct.id,
          name: foundProduct.name,
          price: foundProduct.price,
          unit: foundProduct.unit.toLowerCase(),
          description: foundProduct.productDescription,
          quantity: orderProduct.quantity
        }
      }
    )
    return {
      patient,
      orderItems: mappedDoctorOrder
    }
  }

  @Action({ commit: 'SET_ADDRESS' })
  public changePatientAddress ({ address }: { address: Partial<PatientInfo> }) {
    return address
  }

  @Action({ rawError: true })
  public async patientCheckout ({ patientHash }: { patientHash: string }) {
    const patientAddress: Partial<PatientInfo> = { ...this.patient }
    delete patientAddress.name
    const data = {
      patientLinkHash: patientHash,
      address: patientAddress
    }
    await $axios.post(`${apiPath.orderFlow.patientCheckout}/`, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}

export default getModule(CheckoutModule)
