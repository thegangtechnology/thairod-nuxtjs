<template>
  <div class="overview-body">
    <div class="shipment-body__container">
      <div class="detail-header__container">
        <div class="detail-header__left">
          เลขที่รายการสั่งซื้อ: {{ detail.id }}
          <span v-if="detail.status === 'wait'" :class="detail.status">
            รอพิมพ์ใบจัดส่ง
          </span>
          <span v-else-if="detail.status === 'print'" :class="detail.status">
            รอจัดส่ง
          </span>
          <span
            v-else-if="detail.status === 'out'"
            :class="detail.status"
          >
            รอรับสินค้า
          </span>
          <span v-else :class="detail.status"> ได้รับเรียบร้อย </span>
        </div>
      </div>
      <div class="detail-body__container">
        <div class="detail-left__container">
          <div class="detail-info__container">
            <div class="overview-filter__header">
              <img :src="UserIcon" alt="UserIcon">
              <span> ข้อมูลการรักษา </span>
            </div>
            <a-form layout="vertical">
              <div class="detail-body__container">
                <div class="detail-left__container">
                  <a-form-item
                    class="detail-form__item"
                    label="ชื่อผู้รับการรักษา"
                  >
                    <a-input v-model="detail.patientName" disabled />
                  </a-form-item>
                </div>
                <div class="detail-right__container">
                  <a-form-item
                    class="detail-form__item"
                    label="รหัสบัตรประชาชน"
                  >
                    <a-input v-model="detail.cid" disabled />
                  </a-form-item>
                </div>
              </div>
            </a-form>
            <a-form layout="vertical">
              <div class="detail-body__container">
                <div class="detail-left__container">
                  <a-form-item class="detail-form__item" label="เบอร์โทร">
                    <a-input v-model="form.telno" />
                  </a-form-item>
                </div>
              </div>
            </a-form>
          </div>
          <div class="detail-info__container">
            <div class="overview-filter__header">
              <img :src="BoxIcon" alt="BoxIcon">
              <span> รายการสินค้า </span>
            </div>
            <a-form layout="vertical">
              <div class="overview-item__form">
                <div
                  v-for="item in detail.shipmentItem"
                  :key="item.id"
                  class="detail-item"
                >
                  <a-form-item class="detail-form__item" :label="item.name">
                    <span class="detail-form__info">
                      {{ item.quantity }} {{ item.unit }}
                    </span>
                  </a-form-item>
                </div>
              </div>
            </a-form>
          </div>
          <div class="detail-info__container">
            <div class="overview-filter__header">
              <img :src="BoxIcon" alt="BoxIcon">
              <span> ข้อมูลการจัดส่งสินค้า </span>
            </div>
            <a-form layout="vertical">
              <div class="detail-body__container">
                <div class="detail-left__container">
                  <a-form-item
                    class="detail-form__item"
                    label="หมายเลขพัสดุ"
                  >
                    <a-input v-model="detail.tracking_code" disabled />
                  </a-form-item>
                </div>
                <div class="detail-right__container">
                  <a-form-item
                    class="detail-form__item"
                    label="ล็อตการจัดส่ง"
                  >
                    <a-input v-if="detail.batch" v-model="detail.batch.name" disabled />
                    <a-input v-else value="N/A" disabled />
                  </a-form-item>
                </div>
              </div>
            </a-form>
            <a-form layout="vertical">
              <div class="detail-body__container">
                <div class="detail-left__container">
                  <a-form-item
                    class="detail-form__item"
                    label="คลังสินค้า"
                  >
                    <a-input v-model="detail.warehouse" disabled />
                  </a-form-item>
                </div>
              </div>
            </a-form>
          </div>
        </div>
        <div class="detail-right__container">
          <div class="detail-info__container">
            <div class="overview-filter__header">
              <img :src="PinIcon" alt="PinIcon">
              <span> ข้อมูลที่อยู่จัดส่ง </span>
            </div>
            <a-form layout="vertical">
              <div class="detail-body__container">
                <div class="detail-full__container">
                  <a-form-item
                    class="detail-form__item"
                    label="ที่อยู่"
                  >
                    <a-textarea
                      v-model="form.house_number"
                      :auto-size="{ minRows: 3, maxRows: 5 }"
                    />
                  </a-form-item>
                </div>
              </div>
            </a-form>
            <a-form layout="vertical">
              <div class="detail-body__container">
                <div class="detail-left__container">
                  <a-form-item
                    class="detail-form__item"
                    label="จังหวัด"
                  >
                    <a-select
                      v-model="form.province"
                      @change="handleProvinceChange"
                    >
                      <a-select-option
                        v-for="province in getProvince"
                        :key="province"
                        :value="province"
                      >
                        {{ province }}
                      </a-select-option>
                    </a-select>
                  </a-form-item>
                </div>
                <div class="detail-right__container">
                  <a-form-item
                    class="detail-form__item"
                    label="เขต"
                  >
                    <a-select
                      v-model="form.district"
                      @change="handleDistrictChange"
                    >
                      <a-select-option
                        v-for="district in getDistrict"
                        :key="district"
                        :value="district"
                      >
                        {{ district }}
                      </a-select-option>
                    </a-select>
                  </a-form-item>
                </div>
              </div>
            </a-form>
            <a-form layout="vertical">
              <div class="detail-body__container">
                <div class="detail-left__container">
                  <a-form-item
                    class="detail-form__item"
                    label="แขวง"
                  >
                    <a-select v-model="form.subdistrict">
                      <a-select-option
                        v-for="subdistrict in getSubDistrict"
                        :key="subdistrict"
                        :value="subdistrict"
                      >
                        {{ subdistrict }}
                      </a-select-option>
                    </a-select>
                  </a-form-item>
                </div>
                <div class="detail-right__container">
                  <a-form-item
                    class="detail-form__item"
                    label="รหัสไปรษณีย์"
                  >
                    <a-input v-model="form.postal_code" />
                  </a-form-item>
                </div>
              </div>
            </a-form>
            <a-form layout="vertical">
              <div class="detail-body__container">
                <div class="detail-full__container">
                  <a-form-item
                    class="detail-form__item"
                    label="จุดสังเกต"
                  >
                    <a-textarea
                      v-model="form.note"
                      :auto-size="{ minRows: 3, maxRows: 5 }"
                    />
                  </a-form-item>
                </div>
              </div>
            </a-form>
            <!--            <a-form layout="vertical">-->
            <!--              <div class="detail-body__container">-->
            <!--                <div class="detail-full__container">-->
            <!--                  <a-form-item-->
            <!--                    class="detail-form__item"-->
            <!--                    label="แผนที่"-->
            <!--                  >-->
            <!--                    <div class="detail-map">-->
            <!--                      <img :src="MapImg" alt="MapImg">-->
            <!--                    </div>-->
            <!--                  </a-form-item>-->
            <!--                </div>-->
            <!--              </div>-->
            <!--            </a-form>-->
          </div>
        </div>
      </div>
    </div>
    <div class="overview-button__container">
      <a-button class="overview-button__cta cancel" @click="onEditChange">
        กลับ
      </a-button>
      <a-button
        :disabled="!canSave"
        class="overview-button__cta submit"
        @click="visibleSaveModal = true"
      >
        บันทึก
      </a-button>
    </div>

    <!-- Save Modal -->
    <a-modal
      v-model="visibleSaveModal"
      class="overview-modal__container"
      centered
      :closable="false"
      :width="480"
    >
      <div class="overview-modal__img">
        <img :src="BoxImg" alt="BoxImg">
      </div>
      <div class="overview-modal__title">
        ยืนยันการอัปเดตข้อมูล
      </div>
      <div class="overview-modal__subtitle">
        รายการกำลังจะถูกอัปเดตข้อมูล
      </div>
      <template slot="footer">
        <div class="overview-modal__footer">
          <a-button
            key="back"
            class="overview-button__cta cancel"
            @click="visibleSaveModal = false"
          >
            ยกเลิก
          </a-button>
          <a-button
            key="submit"
            class="overview-button__cta submit"
            type="primary"
            @click="onSave"
          >
            ยืนยัน
          </a-button>
        </div>
      </template>
    </a-modal>
  </div>
  <!-- <div class="detail-container">
    <a-form layout="vertical">
      <a-row :gutter="[16, 16]">
        <a-col :span="12">
          <div class="detail-form">
            <a-row :gutter="[16, 16]">
              <a-col class="detail__info" :span="24">
                ข้อมูลที่อยู้จัดส่ง
              </a-col>
            </a-row>
            <a-row :gutter="[16, 16]">
              <a-col :span="24">
                <a-form-item label="Address">
                  <a-textarea
                    v-model="form.address"
                    :auto-size="{ minRows: 3, maxRows: 5 }"
                  />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row :gutter="[16, 16]">
              <a-col :span="6">
                <a-form-item label="Province">
                  <a-select
                    v-model="form.province"
                    @change="handleProvinceChange"
                  >
                    <a-select-option
                      v-for="province in getProvince"
                      :key="province"
                      :value="province"
                    >
                      {{ province }}
                    </a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="6">
                <a-form-item label="District">
                  <a-select
                    v-model="form.district"
                    @change="handleDistrictChange"
                  >
                    <a-select-option
                      v-for="district in getDistrict"
                      :key="district"
                      :value="district"
                    >
                      {{ district }}
                    </a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="6">
                <a-form-item label="Sub-District">
                  <a-select v-model="form.subdistrict">
                    <a-select-option
                      v-for="subdistrict in getSubDistrict"
                      :key="subdistrict"
                      :value="subdistrict"
                    >
                      {{ subdistrict }}
                    </a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="6">
                <a-form-item label="Zipcode">
                  <a-input v-model="form.postal_code" />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row :gutter="[16, 16]">
              <a-col :span="24">
                <a-form-item label="จุดสังเกต">
                  <a-textarea
                    v-model="form.remark"
                    :auto-size="{ minRows: 3, maxRows: 5 }"
                  />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row :gutter="[16, 16]">
              <a-col :span="24">
                This is a map.
              </a-col>
            </a-row>
          </div>
        </a-col>
      </a-row>
    </a-form>
    <div class="button-container">
      <div class="button-right">
        <a-button @click="onEditChange">
          Cancel
        </a-button>
      </div>
    </div>
  </div> -->
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator'
// import ShipmentModule from '~/store/shipment.module'
import UserSvg from '~/assets/icons/user.svg'
import BoxSvg from '~/assets/icons/box.svg'
import PinSvg from '~/assets/icons/pin.svg'
import MapSvg from '~/assets/images/shipment/map.svg'
import BoxImg from '~/assets/images/print/box.svg'
import { ShipmentDetail, ShipmentForm } from '~/types/shipment.type'
import location from '~/static/location.json'
import { updateAddress } from '~/services/shipment.service'

export interface IAddress {
  district: string
  districtEng: string
  amphoe: string
  amphoeEng: string
  province: string
  provinceEng: string
  zipcode: number
}

@Component
export default class OrderEdit extends Vue {
  @Prop({ required: true }) detail!: ShipmentDetail

  private UserIcon = UserSvg
  private BoxIcon = BoxSvg
  private PinIcon = PinSvg
  private MapImg = MapSvg
  private BoxImg = BoxImg

  form: ShipmentForm = {
    telno: '',
    house_number: '',
    province: '',
    district: '',
    subdistrict: '',
    postal_code: '',
    note: ''
  }

  formFieldKeys: string[] = [
    'telno',
    'house_number',
    'province',
    'district',
    'subdistrict',
    'postal_code',
    'note'
  ]

  location: IAddress[] = []

  visibleSaveModal: boolean = false

  @Emit('onEdit')
  onEditChange () {
    return false
  }

  get getProvince () {
    return [...new Set(this.location.map(loc => loc.province))]
  }

  get getDistrict () {
    return [
      ...new Set(
        this.location
          .filter(loc => loc.province === this.form.province)
          .map(loc => loc.amphoe)
      )
    ]
  }

  get getSubDistrict () {
    return [
      ...new Set(
        this.location
          .filter(loc => loc.amphoe === this.form.district)
          .map(loc => loc.district)
      )
    ]
  }

  get canSave () {
    const filterEmpty = Object.values(this.form).includes('')
    if (filterEmpty) { return false }
    const checkChange = this.formFieldKeys.map((key) => {
      return (
        this.form[key as keyof ShipmentForm] ===
          this.detail[key as keyof ShipmentDetail]
      )
    })
    return !checkChange.every(Boolean)
  }

  mounted () {
    this.formFieldKeys.forEach((key) => {
      this.form[key as keyof ShipmentForm] = this.detail[key as keyof ShipmentForm]
    })
    this.location = location
  }

  handleProvinceChange () {
    this.form.district = ''
    this.form.subdistrict = ''
  }

  handleDistrictChange () {
    this.form.subdistrict = ''
  }

  async onSave () {
    await updateAddress(this.detail.receiver_id, this.form)
    this.visibleSaveModal = false
    this.onEditChange()
  }
}
</script>

<style scoped>
.detail-form {
  padding: 1rem;
  background: rgb(233, 233, 233);
}
.detail__info {
  font-size: 1.25rem;
  font-weight: 500;
}
.button-right {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>
