<template>
  <div>
    <div class="detail-container">
      <div class="detail-col">
        <a-form layout="vertical" class="detail-form__container">
          <div class="detail-form">
            <div class="detail__title">ข้อมูลคนไข้</div>
            <div class="detail__row">
              <a-form-item class="detail-form__item" label="Ordered ID">
                <span class="detail__info">{{ detail.orderId }}</span>
              </a-form-item>
              <a-form-item class="detail-form__item" label="Ordered Item">
                <span class="detail__info">{{ detail.orderedItem }}</span>
              </a-form-item>
              <a-form-item class="detail-form__item" label="Ordered Date">
                <span class="detail__info">{{ detail.orderedDate }}</span>
              </a-form-item>
            </div>
            <div class="detail__row">
              <a-form-item class="detail-form__item" label="CID">
                <span class="detail__info">{{ detail.cid }}</span>
              </a-form-item>
              <a-form-item class="detail-form__item" label="Patient Name">
                <span class="detail__info">{{ detail.patientName }}</span>
              </a-form-item>
              <a-form-item class="detail-form__item" label="Phone No.">
                <span class="detail__info">{{ detail.phoneNumber }}</span>
              </a-form-item>
            </div>
            <div class="detail__row">
              <a-form-item class="detail-form__item" label="Export Batch">
                <span class="detail__info">{{ detail.exportBatch }}</span>
              </a-form-item>
              <a-form-item class="detail-form__item" label="Warehouse">
                <span class="detail__info">{{ detail.warehouse }}</span>
              </a-form-item>
              <a-form-item class="detail-form__item" label="Ordered By">
                <span class="detail__info">{{ detail.orderedBy }}</span>
              </a-form-item>
            </div>
          </div>
          <div class="detail-form">
            <div class="detail__title">ข้อมูลการจัดส่ง</div>
            <div class="detail__row">
              <a-form-item class="detail-form__item" label="Tracking No.">
                <span class="detail__info">{{ detail.trackingNo }}</span>
              </a-form-item>
              <a-form-item class="detail-form__item" label="Updated By">
                <span class="detail__info">{{ detail.updatedBy }}</span>
              </a-form-item>
              <a-form-item class="detail-form__item" label="Update Date">
                <span class="detail__info">{{ detail.updatedDate }}</span>
              </a-form-item>
            </div>
          </div>
        </a-form>
      </div>
      <div class="detail-col">
        <a-form layout="vertical" class="detail-form__container">
          <div class="detail-form">
            <div class="detail__title">ข้อมูลที่อยู้จัดส่ง</div>
            <div class="detail__row">
              <a-form-item label="Address">
                <span class="detail__info">{{ detail.address }}</span>
              </a-form-item>
            </div>
            <div class="detail__row">
              <a-form-item label="Province">
                <span class="detail__info">{{ detail.province }}</span>
              </a-form-item>
              <a-form-item label="District">
                <span class="detail__info">{{ detail.district }}</span>
              </a-form-item>
              <a-form-item label="Sub-District">
                <span class="detail__info">{{ detail.subDistrict }}</span>
              </a-form-item>
              <a-form-item label="Zipcode">
                <span class="detail__info">{{ detail.zipCode }}</span>
              </a-form-item>
            </div>
            <div class="detail__row">
              <a-form-item label="จุดสังเกต">
                <span class="detail__info">{{ detail.remark }}</span>
              </a-form-item>
            </div>
            <div class="detail__title">พิกัด</div>
            <div class="detail__map"></div>
          </div>
        </a-form>
      </div>
    </div>
    <div class="button-container">
      <div class="button-right">
        <a-button @click="goBack">Back</a-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { ShipmentDetail } from '~/types/shipment.type'

@Component
export default class OrderDetail extends Vue {
  @Prop({ required: true }) detail!: ShipmentDetail

  goBack() {
    this.$router.go(-1)
  }
}
</script>

<style scoped>
.detail-container {
  display: flex;
  justify-content: space-between;
}
.detail-col {
  display: flex;
  width: 100%;
}
.detail-form__container {
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  margin: 0 1rem;
}
.detail-form {
  padding: 1rem;
  background: rgb(233, 233, 233);
  margin-bottom: 1rem;
  flex-grow: 1;
}
.detail__row {
  display: flex;
  justify-content: space-between;
}
.detail__title {
  font-size: 1.25rem;
  margin-bottom: 1rem;
}
.detail-form__item {
  width: 30%;
}
.detail__info {
  font-size: 1.25rem;
  font-weight: 500;
}
.detail__map {
  width: 100%;
  height: 300px;
  background: rgb(107, 107, 107);
}
.button-right {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>
