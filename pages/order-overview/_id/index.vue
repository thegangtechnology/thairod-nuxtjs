<template>
  <div class="page__container">
    <div class="page-card__container">
      <div class="page-card__header">
        <div class="page-header__title has-subtitle">
          <div>รายละเอียดคำสั่งซื้อ</div>
          <div class="page-header__subtitle">
            ภาพรวมรายการจัดส่ง /
            <span v-if="detail !== null">รายการสั่งซื้อ {{ detail.id }}</span>
          </div>
        </div>
        <a-input
          class="page-header__search"
          v-model="search"
          placeholder="ค้นหา"
        >
          <a-icon slot="prefix" type="search" />
        </a-input>
      </div>
      <div v-if="detail !== null">
        <OrderDetail v-if="!isEdit" :detail="detail" />
        <OrderEdit v-else :detail="detail" @onEdit="fromEdit" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import ShipmentModule from '~/store/shipment.module'
import { ShipmentDetail } from '~/types/shipment.type'

@Component
export default class DetailPage extends Vue {
  detail: ShipmentDetail | null = null
  isEdit: boolean = false
  search: string = ''

  async created() {
    await this.importDetail()
  }

  fromEdit() {
    this.isEdit = false
    this.importDetail()
  }

  async importDetail() {
    const res = await ShipmentModule.getShipmentDetail(
      parseInt(this.$route.params.id)
    )
    if (res) this.detail = res
  }
}
</script>

<style scoped>
.order-container {
  margin: 1rem;
}
.detail-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}
</style>
