<template>
  <div class="page__container">
    <div class="page-card__container">
      <div class="page-card__header">
        <div class="page-header__title">สร้างล็อตการจัดส่งใหม่</div>
        <a-input
          class="page-header__search"
          v-model="search"
          placeholder="ค้นหา"
        >
          <a-icon slot="prefix" type="search" />
        </a-input>
      </div>
      <AssignForm :original-data="data" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import ShipmentModule from '~/store/shipment.module'
import { ShipmentLine } from '~/types/shipment.type'

@Component
export default class Main extends Vue {
  data: ShipmentLine[] = []
  search: string = ''

  async created() {
    if (ShipmentModule.getShipmentLength < 1) {
      ShipmentModule.initialiseShipment()
    }
  }

  mounted() {
    const type = this.$route.query.type
    if (type && type === 'assign') {
      this.data = ShipmentModule.getShipmentList
    } else {
      this.data = ShipmentModule.getShipmentList.filter(
        (item) => item.batch === null
      )
    }
  }
}
</script>

<style scoped>
.order-container {
  margin: 1rem;
}
.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
