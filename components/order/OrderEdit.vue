<template>
  <div class="detail-container">
    <a-form layout="vertical">
      <a-row :gutter="[16, 16]">
        <a-col :span="12">
          <a-row :gutter="[16, 16]">
            <a-col :span="24">
              <div class="detail-form">
                <a-row :gutter="[16, 16]">
                  <a-col class="detail__info" :span="24">ข้อมูลคนไข้</a-col>
                </a-row>
                <a-row :gutter="[16, 16]">
                  <a-col :span="8">
                    <a-form-item label="Ordered ID">
                      <a-input v-model="form.orderId" disabled></a-input>
                    </a-form-item>
                  </a-col>
                  <a-col :span="8">
                    <a-form-item label="Ordered Item">
                      <a-select v-model="form.orderedItem">
                        <a-select-option value="Green Package">
                          Green Package
                        </a-select-option>
                        <a-select-option value="Yellow Package">
                          Yellow Package
                        </a-select-option>
                      </a-select>
                    </a-form-item>
                  </a-col>
                  <a-col :span="8">
                    <a-form-item label="Ordered Date">
                      <a-input v-model="form.orderedDate" disabled></a-input>
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row :gutter="[16, 16]">
                  <a-col :span="8">
                    <a-form-item label="CID">
                      <a-input v-model="form.cid" disabled></a-input>
                    </a-form-item>
                  </a-col>
                  <a-col :span="8">
                    <a-form-item label="Patient Name">
                      <a-input v-model="form.patientName" disabled></a-input>
                    </a-form-item>
                  </a-col>
                  <a-col :span="8">
                    <a-form-item label="Phone No.">
                      <a-input v-model="form.phoneNumber"></a-input>
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row :gutter="[16, 16]">
                  <a-col :span="8">
                    <a-form-item label="Export Batch">
                      <a-input v-model="form.exportBatch" disabled></a-input>
                    </a-form-item>
                  </a-col>
                  <a-col :span="8">
                    <a-form-item label="Warehouse">
                      <a-select v-model="form.warehouse">
                        <a-select-option value="EDP"> EDP </a-select-option>
                      </a-select>
                    </a-form-item>
                  </a-col>
                </a-row>
              </div>
            </a-col>
          </a-row>
          <a-row :gutter="[16, 16]">
            <a-col :span="24">
              <div class="detail-form">
                <a-row :gutter="[16, 16]">
                  <a-col class="detail__info" :span="24">ข้อมูลการจัดส่ง</a-col>
                </a-row>
                <a-row :gutter="[16, 16]">
                  <a-col :span="8">
                    <a-form-item label="Tracking No.">
                      <a-input v-model="form.trackingNo"></a-input>
                    </a-form-item>
                  </a-col>
                </a-row>
              </div>
            </a-col>
          </a-row>
        </a-col>
        <a-col :span="12">
          <div class="detail-form">
            <a-row :gutter="[16, 16]">
              <a-col class="detail__info" :span="24">ข้อมูลที่อยู้จัดส่ง</a-col>
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
                  <a-select v-model="form.subDistrict">
                    <a-select-option
                      v-for="subDistrict in getSubDistrict"
                      :key="subDistrict"
                      :value="subDistrict"
                    >
                      {{ subDistrict }}
                    </a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="6">
                <a-form-item label="Zipcode">
                  <a-input v-model="form.zipCode"></a-input>
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
              <a-col :span="24"> This is a map. </a-col>
            </a-row>
          </div>
        </a-col>
      </a-row>
    </a-form>
    <div class="button-container">
      <div class="button-right">
        <a-button @click="onEditChange">Cancel</a-button>
        <a-button
          :disabled="!canSave"
          type="primary"
          @click="visibleSaveModal = true"
        >
          Save
        </a-button>
      </div>
    </div>
    <!-- Save Modal -->

    <a-modal v-model="visibleSaveModal" centered :closable="false">
      <div class="modal__title">Confirm Save?</div>
      <div class="modal__subtitle">
        The record will be updated and this procedure cannot be undone
      </div>
      <template slot="footer">
        <div class="flex justify-center">
          <a-button key="back" @click="visibleSaveModal = false">
            Cancel
          </a-button>
          <a-button key="submit" type="primary" @click="onSave">
            Confirm
          </a-button>
        </div>
      </template>
    </a-modal>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator'
import { ShipmentModule } from '~/store'

import { IOrder, IOrderDetail } from '~/types/order.type'

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
  @Prop({ required: true }) detail!: IOrderDetail

  form: IOrderDetail = JSON.parse(JSON.stringify(this.detail))

  location: IAddress[] = []

  visibleSaveModal: boolean = false

  @Emit('onEdit')
  onEditChange() {
    return false
  }

  get getProvince() {
    return [...new Set(this.location.map((loc) => loc.province))]
  }

  get getDistrict() {
    return [
      ...new Set(
        this.location
          // .filter(loc => loc.province === this.form.province)
          .map((loc) => loc.amphoe)
      ),
    ]
  }

  get getSubDistrict() {
    return [
      ...new Set(
        this.location
          // .filter(loc => loc.amphoe === this.form.district)
          .map((loc) => loc.district)
      ),
    ]
  }

  get canSave() {
    const filterEmpty = Object.values(this.form).includes('')
    if (filterEmpty) return false
    return !Object.keys(this.detail)
      .map((key) => {
        return (
          this.form[key as keyof IOrder] === this.detail[key as keyof IOrder]
        )
      })
      .every(Boolean)
  }

  mounted() {
    fetch(
      'https://gist.githubusercontent.com/ChaiyachetU/a72a3af3c6561b97883d7af935188c6b/raw/0e9389fa1fc06b532f9081793b3e36db31a1e1c6/thailand.json'
    )
      .then((response) => response.json())
      .then((data) => (this.location = data))
  }

  handleProvinceChange() {
    this.form.district = ''
    this.form.subDistrict = ''
  }

  handleDistrictChange() {
    this.form.subDistrict = ''
  }

  onSave() {
    ShipmentModule.updateOrder(this.form)
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
