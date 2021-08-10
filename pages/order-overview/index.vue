<template>
  <div class="page__container">
    <div class="page-card__container">
      <div class="page-card__header">
        <div class="page-header__title">
          {{ title }}
        </div>
        <div
          v-if="tabKey !== 'all'"
        >
          <div
            v-if="updateOption === 'default'"
            class="overview-tab__buttons"
          >
            <a-button
              v-if="tabKey === 'wait'"
              class="assign-button__cta primary"
              @click="printConfirm = true"
            >
              พิมพ์ใบจัดส่งสินค้า
            </a-button>
            <a-select
              v-else
              v-model="updateOption"
              class="overview-select__cta"
            >
              <a-select-option style="display: none;" class="default-option" value="default">
                อัปเดตข้อมูลรายการจัดส่ง
              </a-select-option>
              <a-select-option
                v-if="canUpdateOutForDelivery"
                value="updateDelivery"
              >
                บันทึกการจัดส่ง
              </a-select-option>
              <a-select-option v-if="canUpdatePrint" value="updatePrint">
                แก้ไขสถานะการพิมพ์ใบจัดส่ง
              </a-select-option>
              <!-- <a-select-option v-if="canUpdateReceived" value="updateReceived">
            อัปเดตการส่งมอบ
          </a-select-option> -->
            </a-select>
          </div>
          <div v-else class="overview-button__container top">
            <a-button class="overview-button__cta no-border-btn cancel" @click="cancelUpdate">
              <span> ยกเลิก </span>
            </a-button>
            <a-button
              class="overview-button__cta no-border-btn submit"
              @click="onSave"
            >
              <span> {{ getButtonTitle }} ({{ amount }}) </span>
            </a-button>
          </div>
        </div>
      </div>
      <OrderOverview
        :search="search"
        :option="updateOption"
        :save="isSave"
        @onUpdate="handleOnUpdate"
        @sendTabKey="onTabChange"
        @selectedKeys="handleSelectedKeys"
        @saveSelection="handleConvertSave"
      />
    </div>
    <!-- printConfirm -->
    <a-modal
      v-model="printConfirm"
      class="overview-modal__container"
      centered
      :closable="false"
      :width="480"
    >
      <div class="overview-modal__img">
        <img :src="require('@/assets/images/print/box.svg')" alt="BoxImg">
      </div>
      <div class="overview-modal__title">
        พิมพ์ใบจัดส่งสินค้า
      </div>
      <div class="overview-modal__subtitle">
        ท่านกำลังจะถูกนำไปที่หน้า “พิมพ์ใบจัดส่งสินค้า” เพื่อจัดการพิมพ์
      </div>
      <template slot="footer">
        <div class="overview-modal__footer">
          <a-button
            key="back"
            class="overview-button__cta no-border-btn cancel"
            @click="printConfirm = false"
          >
            ยกเลิก
          </a-button>
          <a-button
            key="submit"
            class="overview-button__cta no-border-btn submit"
            type="primary"
            @click="isConfirm"
          >
            ยืนยัน
          </a-button>
        </div>
      </template>
    </a-modal>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import BoxSvg from '~/assets/images/print/box.svg'

@Component
export default class Main extends Vue {
  private BoxImg = BoxSvg

  search: string = ''
  tabKey: string = ''
  printConfirm: boolean = false
  updateOption: string = 'default'
  title: string = 'ภาพรวมรายการจัดส่ง'
  visibleSubmitDialog: boolean = false
  isSave: boolean = false
  selectedRowKeys: number[] = []

  get canUpdatePrint () {
    return this.tabKey !== 'received' && this.tabKey !== 'out'
  }

  get canUpdateOutForDelivery () {
    return this.tabKey !== 'wait' && this.tabKey !== 'received'
  }

  get canUpdateReceived () {
    return this.tabKey !== 'wait' && this.tabKey !== 'print'
  }

  get getModalDescription () {
    if (this.updateOption === 'updatePrint') {
      if (this.tabKey === 'wait') {
        return { from: 'รอพิมพ์ใบจัดส่ง', to: 'รอจัดส่ง' }
      } else {
        return { from: 'รอจัดส่ง', to: 'รอพิมพ์ใบจัดส่ง' }
      }
    }
    if (this.updateOption === 'updateDelivery') {
      if (this.tabKey === 'print') {
        return { from: 'รอจัดส่ง', to: 'รอรับสินค้า' }
      } else {
        return { from: 'รอรับสินค้า', to: 'รอจัดส่ง' }
      }
    }
    if (this.updateOption === 'updateReceived') {
      if (this.tabKey === 'out') {
        return { from: 'รอรับสินค้า', to: 'ได้รับเรียบร้อย' }
      } else {
        return { from: 'ได้รับเรียบร้อย', to: 'รอรับสินค้า' }
      }
    }
    return { from: '', to: '' }
  }

  get amount () {
    return this.selectedRowKeys.length
  }

  get getButtonTitle () {
    if (this.updateOption === 'updateDelivery') { return 'บันทึก' }
    return 'แก้ไข'
  }

  @Watch('updateOption', { immediate: true, deep: true })
  onOptionChange () {
    this.handleOnUpdate(this.updateOption)
  }

  mounted () {
    this.updateOption = 'default'
  }

  getSelectOptionValue (value: string): string {
    if (value === 'default') { return 'ภาพรวมรายการจัดส่ง' }
    if (value === 'updatePrint') { return 'แก้ไขสถานะการพิมพ์ใบจัดส่ง' }
    if (value === 'updateDelivery') { return 'บันทึกการจัดส่ง' }
    return ''
  }

  onTabChange (key: string) {
    this.tabKey = key
  }

  handleSelectedKeys (selectedRowKeys: number[]) {
    this.selectedRowKeys = selectedRowKeys
  }

  handleOnUpdate (value: string) {
    this.title = this.getSelectOptionValue(value)
  }

  handleConvertSave (value: boolean) {
    this.isSave = value
    this.selectedRowKeys = []
    this.cancelUpdate()
  }

  cancelUpdate () {
    this.updateOption = 'default'
  }

  isConfirm () {
    this.$router.push('/print')
  }

  onSave () {
    this.isSave = true
  }
}
</script>
