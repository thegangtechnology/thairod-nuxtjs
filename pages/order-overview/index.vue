<template>
  <div class="page__container">
    <div class="page-card__container">
      <div class="page-card__header">
        <div class="page-header__title">
          {{ title }}
        </div>
        <a-input
          v-model="search"
          class="page-header__search"
          placeholder="ค้นหา"
        >
          <a-icon slot="prefix" type="search" />
        </a-input>
      </div>
      <OrderOverview :search="search" @onUpdate="handleOnUpdate" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class Main extends Vue {
  search: string = ''

  title: string = 'ภาพรวมรายการจัดส่ง'

  getSelectOptionValue (value: string): string {
    if (value === 'default') { return 'ภาพรวมรายการจัดส่ง' }
    if (value === 'updatePrint') { return 'อัปเดตการพิมพ์ใบจัดส่ง' }
    if (value === 'updateDelivery') { return 'อัปเดตการจัดส่ง' }
    return ''
  }

  handleOnUpdate (value: string) {
    this.title = this.getSelectOptionValue(value)
  }
}
</script>
