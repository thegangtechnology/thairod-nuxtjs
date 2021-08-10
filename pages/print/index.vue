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
                อัปเดตการพิมพ์ใบจัดส่ง
              </a-button>
              <a-button
                v-if="tabKey !== 'printed'"
                class="assign-button__cta primary"
                @click="toCreatePrint"
              >
                พิมพ์ใบจัดส่งสินค้า
              </a-button>
            </div>
          </div>
        </div>
      </div>
      <PrintOverview
        :search="search"
        :option="isUpdate"
        @sendTabKey="onTabChange"
        @sendTabUpdate="onTabUpdate"
        @sendCancelTabUpdate="onCancelTabUpdate"
        @selectedKeys="handleSelectedKeys"
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
  title: string = 'พิมพ์ใบจัดส่งสินค้า'
  isUpdate:boolean= false
  selectedRowKeys: number[] = []

  // @Watch('isTabUpdate', { isUpdate: false })
  @Watch('isUpdate', { immediate: true, deep: true })
  onOptionChange () {
    this.onTabUpdate(this.isUpdate)
  }

  mounted () {
    this.updateOption = 'default'
  }

  onTabChange (key: string) {
    this.tabKey = key
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
}
</script>
