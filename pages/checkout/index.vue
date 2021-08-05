<template>
  <div
    class="order-content-wrapper"
  >
    <a-form
      :form="patientInfoForm"
      :hide-required-mark="true"
      @submit="goToOrderConfirmation"
    >
      <a-row justify="center" type="flex">
        <a-col :md="12" :span="24">
          <a-form-item label="ชื่อ - นามสกุล">
            <a-input v-decorator="['name',]" disabled />
          </a-form-item>
        </a-col>

        <a-col :md="12" :span="24">
          <a-form-item label="เบอร์โทร">
            <a-input
              v-decorator="[
                'phoneNumber',
                { rules: [{ required: true, message: 'กรุณาระบุเบอร์โทร' }] },
              ]"
            />
          </a-form-item>
        </a-col>

        <a-col :span="24">
          <a-form-item label="ที่อยู่">
            <a-textarea
              v-decorator="[
                'street'
              ]"
              :rows="3"
            />
          </a-form-item>
        </a-col>

        <a-col :md="12" :span="24">
          <a-form-item label="จังหวัด">
            <a-select
              v-decorator="[
                'province',
                { rules: [{ required: true, message: 'กรุณาระบุจังหวัด' }] },
              ]"
              @change="handleProvinceChange"
            >
              <a-select-option
                v-for="province in provinces"
                :key="province"
                :value="province"
              >
                {{ province }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>

        <a-col :md="12" :span="24">
          <a-form-item label="เขต/อำเภอ">
            <a-select
              v-decorator="[
                'district',
                { rules: [{ required: true, message: 'กรุณาระบุเขต/อำเภอ' }] },
              ]"
              @change="handleDistrictChange"
            >
              <a-select-option
                v-for="district in districts"
                :key="district"
                :value="district"
              >
                {{ district }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>

        <a-col :md="12" :span="24">
          <a-form-item label="แขวง/ตำบล">
            <a-select
              v-decorator="[
                'subDistrict',
                { rules: [{ required: true, message: 'กรุณาระบุแขวง/ตำบล' }] },
              ]"
              @change="handleSubDistrictChange"
            >
              <a-select-option
                v-for="subDistrict in subDistricts"
                :key="subDistrict"
                :value="subDistrict"
              >
                {{ subDistrict }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>

        <a-col :md="12" :span="24">
          <a-form-item label="รหัสไปรษณีย์">
            <a-input
              v-decorator="[
                'zipcode',
                { rules: [{ required: true, message: 'กรุณาระบุรหัสไปรษณีย์' }] },
              ]"
              style="width: 100%"
            />
          </a-form-item>
        </a-col>

        <!--        TODO: Add map later-->
        <!--        <a-col :span="24">-->
        <!--          <p>แผนที่</p>-->
        <!--          MAP-->
        <!--        </a-col>-->

        <a-col :span="24">
          <a-form-item label="จุดสังเกต">
            <a-textarea
              v-decorator="['note']"
              :rows="3"
            />
          </a-form-item>
        </a-col>
      </a-row>

      <a-row class="button-group" type="flex">
        <a-col span="24">
          <primary-button :on-click="goToOrderConfirmation" :text="'ต่อไป'" block />
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue'
import CheckoutModule from '~/store/checkout.module'
import { PatientInfo } from '~/types/order.type'
import CommonModule from '~/store/common.module'
import PrimaryButton from '~/components/procurement/buttons/PrimaryButton.vue'
import locations from '~/data/location.json'

interface IAddress {
  district: string;
  districtEng: string;
  amphoe: string;
  amphoeEng: string;
  province: string;
  provinceEng: string;
  zipcode: number;
}

export default Vue.extend({
  components: {
    PrimaryButton
  },
  layout: 'mobile-empty',
  data () {
    return {
      form: {},
      patientInfoForm: this.$form.createForm(this),
      locations: [] as IAddress[],
      districts: [] as string[],
      subDistricts: [] as string[]
    }
  },
  computed: {
    patientInfo (): PatientInfo {
      return CheckoutModule.patient
    },
    patientName (): string {
      return this.patientInfo.name
    },
    patientHash (): string {
      return this.$route.query.patient as string
    },
    provinces (): string[] {
      return [...new Set(this.locations.map((loc: IAddress) => loc.province))]
    }
  },
  async mounted () {
    this.locations = locations
    CommonModule.setHeaderTitle({ header: 'กรุณาตรวจสอบข้อมูล' })
    await CheckoutModule.getPatientOrder({ patientHash: this.patientHash })
    this.patientInfoForm.setFieldsValue({
      name: this.patientInfo.name,
      phoneNumber: this.patientInfo.phoneNumber,
      street: this.patientInfo.street,
      province: this.patientInfo.province,
      district: this.patientInfo.district,
      subDistrict: this.patientInfo.subDistrict,
      zipcode: this.patientInfo.zipcode,
      note: this.patientInfo.note
    })
  },
  methods: {
    handleProvinceChange (value: string): void {
      this.patientInfoForm.setFieldsValue({ province: value })
      this.patientInfoForm.setFieldsValue({ district: '' })
      this.patientInfoForm.setFieldsValue({ subDistrict: '' })
      this.patientInfoForm.setFieldsValue({ zipcode: '' })
      this.districts = [
        ...new Set(
          this.locations
            .filter((loc: IAddress) => loc.province === this.patientInfoForm.getFieldValue('province'))
            .map((loc: IAddress) => loc.amphoe)
        )
      ]
    },
    handleDistrictChange (value: string): void {
      this.patientInfoForm.setFieldsValue({ district: value })
      this.patientInfoForm.setFieldsValue({ subDistrict: '' })
      this.patientInfoForm.setFieldsValue({ zipcode: '' })
      this.subDistricts = [
        ...new Set(
          this.locations
            .filter((loc: IAddress) => loc.amphoe === this.patientInfoForm.getFieldValue('district'))
            .map((loc: IAddress) => loc.district)
        )
      ]
    },
    handleSubDistrictChange (value: string): void {
      this.patientInfoForm.setFieldsValue({ subDistrict: value })
      this.patientInfoForm.setFieldsValue({ zipcode: '' })
      const foundLocation = this.locations
        .find((loc: IAddress) => loc.district === this.patientInfoForm.getFieldValue('subDistrict'))
      if (foundLocation) {
        this.patientInfoForm.setFieldsValue({ zipcode: (foundLocation as IAddress).zipcode })
      }
    },
    goToOrderConfirmation (): void {
      this.patientInfoForm.validateFields((err) => {
        if (!err) {
          CheckoutModule.changePatientAddress({ address: this.patientInfoForm.getFieldsValue() })
          this.$router.push(`/checkout/checkout-confirmation/?patient=${this.patientHash}`)
        }
      })
    }
  }
})
</script>

<style scoped>
.order-content-wrapper .ant-col {
  padding: 0 6px;
}
</style>
