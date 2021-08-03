<template>
  <div class="assign-tab__container">
    <div>
      <a-tabs
        :default-active-key="tabKey"
        :animated="false"
        @change="onTabChange"
      >
        <a-tab-pane key="all">
          <span slot="tab"> ทั้งหมด ({{ getTotalLength }})</span>
          <AssignTable
            :original-data="originalData"
            :search="search"
            :tab-key="tabKey"
            :loading="isLoading"
            :amount="getTotalLength"
            @pageChange="handlePageChange"
          />
        </a-tab-pane>
        <a-tab-pane key="unassign">
          <span slot="tab"> ที่ต้องจัดการ ({{ getUnassignLength }})</span>
          <AssignTable
            :original-data="originalData"
            :search="search"
            :tab-key="tabKey"
            :loading="isLoading"
            :amount="getUnassignLength"
            @pageChange="handlePageChange"
          />
        </a-tab-pane>
        <a-tab-pane key="assign">
          <span slot="tab"> จัดการแล้ว ({{ getAssignLength }}) </span>
          <AssignTable
            :original-data="originalData"
            :search="search"
            :tab-key="tabKey"
            :loading="isLoading"
            :amount="getAssignLength"
            @pageChange="handlePageChange"
          />
        </a-tab-pane>
        <div slot="tabBarExtraContent" class="assign-tab__buttons">
          <a-button
            v-if="tabKey !== 'unassign'"
            class="assign-button__cta"
            @click="toAssignBatch"
          >
            แก้ไขล็อตการจัดส่ง
          </a-button>
          <a-button
            v-if="tabKey !== 'assign'"
            class="assign-button__cta primary"
            @click="toCreateBatch"
          >
            สร้างล็อตการจัดส่งใหม่
          </a-button>
        </div>
      </a-tabs>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import ShipmentModule from '~/store/shipment.module'

@Component
export default class AssignOverview extends Vue {
  @Prop({ required: true }) search!: string

  tabKey: string = 'all'

  get isLoading () {
    return ShipmentModule.loading
  }

  get originalData () {
    return ShipmentModule.getShipmentList
  }

  get getTotalLength () {
    return ShipmentModule.totalShipment
  }

  get getUnassignLength () {
    return ShipmentModule.nonbatchShipment
  }

  get getAssignLength () {
    return ShipmentModule.batchShipment
  }

  mounted () {
    ShipmentModule.initialiseShipment({})
  }

  toCreateBatch () {
    this.$router.push('/assign/create-batch')
  }

  toAssignBatch () {
    this.$router.push({
      path: '/assign/create-batch',
      query: {
        type: 'assign'
      }
    })
  }

  handlePageChange (page: number) {
    this.onTabChange(this.tabKey, page)
  }

  onTabChange (key: string, page: number = 1) {
    if (key === 'all') {
      ShipmentModule.initialiseShipment({
        page
      })
    }
    if (key === 'unassign') {
      ShipmentModule.initialiseShipment({
        batch_isnull: true,
        page
      })
    }
    if (key === 'assign') {
      ShipmentModule.initialiseShipment({
        batch_isnull: false,
        page
      })
    }
    this.tabKey = key
  }
}
</script>
