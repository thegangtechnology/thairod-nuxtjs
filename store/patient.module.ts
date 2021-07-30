import {
  getModule,
  Module,
  MutationAction,
  VuexModule
} from 'vuex-module-decorators'
import { store } from '@/store'
import { Patient } from '~/types/patient.type'
import PatientClass from '~/models/PatientClass'

@Module({
  dynamic: true,
  name: 'patientModule',
  store
})
class PatientModule extends VuexModule {
  public patient: Patient = {}

  @MutationAction({ mutate: ['patient'] })
  public async getPatient ({ id }: { id: number }) {
    const path: string = `patient/${id}`
    await Promise.resolve(path)
    // mockup data
    const data = {
      id: 1,
      first_name: 'นายข้อมูล',
      last_name: 'สมมติ',
      phone: '0812345678',
      card_number: '1-12345-67890-12-3'
    }
    const newData: Patient = new PatientClass(data)
    return { patient: newData }
  }
}

export default getModule(PatientModule)
