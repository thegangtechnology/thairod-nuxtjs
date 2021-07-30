<template>
  <div class="order-container">
    <div class="detail-header">
      <h1>Order Detail</h1>
      <a-button v-if="!isEdit" icon="edit" @click="isEdit = true">
        Edit Record
      </a-button>
    </div>
    <div v-if="detail !== null" class="detail-body">
      <OrderDetail v-if="!isEdit" :detail="detail" />
      <OrderEdit v-else :detail="detail" @onEdit="fromEdit" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { OrderModule } from '~/store'
import { IOrder } from '~/types/order.type'

@Component
export default class DetailPage extends Vue {
  detail: IOrder | null = null

  isEdit: boolean = false

  created() {
    this.importDetail()
  }

  fromEdit() {
    this.isEdit = false
    this.importDetail()
  }

  async importDetail() {
    const res = await OrderModule.getOrderDetail(
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
