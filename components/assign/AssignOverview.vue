<template>
  <div class="assign-tab__container">
    <div>
      <a-tabs
        :default-active-key="tabKey"
        :animated="false"
        @change="onTabChange"
      >
        <a-tab-pane key="all">
          <span slot="tab"> ทั้งหมด ({{ allData.length }})</span>
          <AssignTable
            :original-data="allData"
            :search="search"
            :tab-key="tabKey"
          />
        </a-tab-pane>
        <a-tab-pane key="unassign">
          <span slot="tab"> ที่ต้องจัดการ ({{ getUnassignLength }})</span>
          <AssignTable
            :original-data="getUnassign"
            :search="search"
            :tab-key="tabKey"
          />
        </a-tab-pane>
        <a-tab-pane key="assign">
          <span slot="tab"> จัดการแล้ว ({{ getAssignLength }}) </span>
          <AssignTable
            :original-data="getAssign"
            :search="search"
            :tab-key="tabKey"
          />
        </a-tab-pane>
        <div slot="tabBarExtraContent" class="assign-tab__buttons">
          <a-button class="assign-button__cta">แก้ไขล็อตการจัดส่ง</a-button>
          <a-button class="assign-button__cta primary" @click="toCreateBatch">
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
import { ShipmentLine } from '~/types/shipment.type'

@Component
export default class AssignOverview extends Vue {
  @Prop({ required: true }) search!: string

  tabKey: string = 'all'
  originalData: ShipmentLine[] = []

  get allData() {
    return ShipmentModule.getShipmentList
  }

  get getUnassign() {
    return this.allData.filter((item) => {
      return item.batch === null
    })
  }

  get getAssign() {
    return this.allData.filter((item) => {
      return item.batch !== null
    })
  }

  get getUnassignLength() {
    return this.allData.filter((item) => {
      return item.batch === null
    }).length
  }

  get getAssignLength() {
    return this.allData.filter((item) => {
      return item.batch !== null
    }).length
  }

  toCreateBatch() {
    this.$router.push(`/assign/create-batch`)
  }

  onTabChange(key: string) {
    this.tabKey = key
  }
}
</script>
