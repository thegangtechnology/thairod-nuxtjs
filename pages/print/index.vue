<template>
  <div class="page__container">
    <div class="page-card__container">
      <div class="page-card__header">
        <div class="page-header__title">
          {{ title }}
        </div>
        <div v-if="tabKey !== 'all' && tabKey !== ''">
          <div
            v-if="updateOption === 'default'"
            class="print-tab__buttons"
          >
            <div
              v-if="!isUpdate"
              slot="tabBarExtraContent"
              class="print-tab__buttons"
            >
              <a-button
                v-if="tabKey !== 'unprinted'"
                class="assign-button__cta"
                @click="isUpdate = true"
              >
                แก้ไขการพิมพ์ใบจัดส่ง
              </a-button>
              <a-button
                v-if="tabKey !== 'printed'"
                class="assign-button__cta primary"
                @click="toCreatePrint"
              >
                พิมพ์ใบจัดส่งสินค้า
              </a-button>
            </div>
            <div v-else class="overview-button__container top">
              <a-button class="overview-button__cta no-border-btn cancel" @click="isUpdate = false">
                <span> ยกเลิก </span>
              </a-button>
              <a-button
                class="overview-button__cta no-border-btn submit"
                @click="onSave"
              >
                <span> แก้ไข ({{ selectedRowKeys.length }}) </span>
              </a-button>
            </div>
          </div>
        </div>
      </div>
      <PrintOverview
        :search="search"
        :option="isUpdate"
        :save="isSave"
        @sendTabKey="onTabChange"
        @sendTabUpdate="onTabUpdate"
        @sendCancelTabUpdate="onCancelTabUpdate"
        @selectedKeys="handleSelectedKeys"
        @saveSelection="handleConvertSave"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'

@Component
export default class Main extends Vue {
  search: string = ''
  tabKey: string = ''
  updateOption: string = 'default'
  isUpdate:boolean= false
  selectedRowKeys: number[] = []
  isSave: boolean = false

  // @Watch('isTabUpdate', { isUpdate: false })
  @Watch('isUpdate', { immediate: true, deep: true })
  onOptionChange (newValue: boolean, oldValue: boolean) {
    if (oldValue !== newValue) {
      this.selectedRowKeys = []
    }
    this.onTabUpdate(this.isUpdate)
  }

  get title () {
    if (this.isUpdate) { return 'แก้ไขการพิมพ์ใบจัดส่งสินค้า' }
    return 'พิมพ์ใบจัดส่งสินค้า'
  }

  mounted () {
    this.updateOption = 'default'
  }

  handleConvertSave (payload: {savable: boolean, isSave: boolean}) {
    this.isSave = payload.savable
    if (payload.isSave) {
      this.selectedRowKeys = []
      this.isUpdate = false
    }
  }

  onTabChange (key: string) {
    this.tabKey = key
    this.isUpdate = false
  }

  onTabUpdate (isUpdate:boolean) {
    this.isUpdate = isUpdate
  }

  onCancelTabUpdate (isUpdate:boolean) {
    this.isUpdate = isUpdate
  }

  toCreatePrint () {
    this.$router.push('/print/create-print')
  }

  handleSelectedKeys (selectedRowKeys: number[]) {
    this.selectedRowKeys = selectedRowKeys
  }

  onSave () {
    this.isSave = true
  }
}
</script>
