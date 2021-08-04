<template>
  <div class="overview-body">
    <div class="overview-body__container">
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
        <div class="detail-header__right">
          <a-button class="detail-button__cta print">
            <img :src="PrinterIcon" alt="PrinterIcon">
            พิมพ์ใบจัดส่งสินค้า
          </a-button>
          <a-button type="primary" class="detail-button__cta edit" @click="toEdit">
            <img :src="EditIcon" alt="EditIcon">
            แก้ไขข้อมูล
          </a-button>
        </div>
      </div>
      <div class="detail-body__container">
        <div class="detail-left__container">
          <div class="overview-filter__container">
            <div class="overview-filter__header">
              <img :src="UserIcon" alt="UserIcon">
              <span> ข้อมูลการรักษา </span>
            </div>
            <a-form layout="vertical">
              <div class="overview-filter__form">
                <div class="date">
                  <a-form-item
                    class="detail-form__item"
                    label="ชื่อผู้รับการรักษา"
                  >
                    <span class="detail-form__info">
                      {{
                        detail.patientName
                      }}
                    </span>
                  </a-form-item>
                </div>
                <div class="batch">
                  <a-form-item
                    class="detail-form__item"
                    label="รหัสบัตรประชาชน"
                  >
                    <span class="detail-form__info">{{ detail.cid }}</span>
                  </a-form-item>
                </div>
                <div class="package">
                  <a-form-item class="detail-form__item" label="เบอร์โทร">
                    <span class="detail-form__info">
                      {{ detail.telno }}
                    </span>
                  </a-form-item>
                </div>
              </div>
            </a-form>
            <a-form layout="vertical">
              <div class="overview-filter__form">
                <div class="date">
                  <a-form-item class="detail-form__item" label="ชื่อแพทย์">
                    <span class="detail-form__info">
                      {{ detail.orderer_name }}
                    </span>
                  </a-form-item>
                </div>
                <div class="batch">
                  <a-form-item class="detail-form__item" label="เลขที่ใบอนุญาต">
                    <span class="detail-form__info">
                      {{ detail.orderer_license }}
                    </span>
                  </a-form-item>
                </div>
              </div>
            </a-form>
          </div>
          <div class="overview-filter__container">
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
          <div class="overview-filter__container">
            <div class="overview-filter__header">
              <img :src="BoxIcon" alt="BoxIcon">
              <span> ข้อมูลการจัดส่งสินค้า </span>
            </div>

            <a-form layout="vertical">
              <div class="overview-filter__form">
                <div class="date">
                  <a-form-item class="detail-form__item" label="หมายเลขพัสดุ">
                    <span class="detail-form__info">
                      {{ detail.tracking_code }}
                    </span>
                  </a-form-item>
                </div>
                <div class="batch">
                  <a-form-item class="detail-form__item" label="ล็อตการจัดส่ง">
                    <span
                      v-if="detail.batch === null"
                      class="detail-form__info"
                    >
                      N/A
                    </span>
                    <span v-else class="detail-form__info">
                      {{ detail.batch.name }}
                    </span>
                  </a-form-item>
                </div>
                <div class="package">
                  <a-form-item class="detail-form__item" label="คลังสินค้า">
                    <span class="detail-form__info">
                      {{ detail.warehouse }}
                    </span>
                  </a-form-item>
                </div>
              </div>
            </a-form>
            <a-form layout="vertical">
              <div class="overview-filter__form">
                <div class="date">
                  <a-form-item
                    class="detail-form__item"
                    label="ผู้อัปเดตข้อมูล"
                  >
                    <span class="detail-form__info">
                      {{ detail.updated_name }}
                    </span>
                  </a-form-item>
                </div>
                <div class="batch">
                  <a-form-item class="detail-form__item" label="อัปเดตเมื่อ">
                    <span class="detail-form__info">
                      {{ detail.updated_date | date }}
                    </span>
                  </a-form-item>
                </div>
              </div>
            </a-form>
          </div>
        </div>
        <div class="detail-right__container">
          <div class="overview-filter__container">
            <div class="overview-filter__header">
              <img :src="PinIcon" alt="PinIcon">
              <span> ข้อมูลที่อยู่จัดส่ง </span>
            </div>
            <div class="detail-address__info">
              {{ detail.house_number }} แขวง {{ detail.subdistrict }} เขต
              {{ detail.district }} จังหวัด {{ detail.province }}
              {{ detail.postal_code }}
            </div>
            <div class="detail-note__header">
              จุดสังเกตุ
            </div>
            <div class="detail-note__info">
              {{ detail.note }}
            </div>
            <div class="detail-map">
              <img :src="MapImage" alt="MapImage">
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="overview-button__container">
      <a-button class="overview-button__cta cancel" @click="goBack">
        กลับ
      </a-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator'
import UserSvg from '~/assets/icons/user.svg'
import BoxSvg from '~/assets/icons/box.svg'
import PinSvg from '~/assets/icons/pin.svg'
import EditSvg from '~/assets/icons/edit.svg'
import PrinterSvg from '~/assets/icons/printer.svg'
import MapSvg from '~/assets/icons/map.svg'
import { ShipmentDetail } from '~/types/shipment.type'

@Component
export default class OrderDetail extends Vue {
  @Prop({ required: true }) detail!: ShipmentDetail

  private UserIcon = UserSvg
  private BoxIcon = BoxSvg
  private PinIcon = PinSvg
  private EditIcon = EditSvg
  private PrinterIcon = PrinterSvg
  private MapImage = MapSvg

  @Emit('onEdit')
  toEdit () {
    return true
  }

  goBack () {
    this.$router.go(-1)
  }
}
</script>
