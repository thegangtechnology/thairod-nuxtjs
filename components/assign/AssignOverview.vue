<template>
  <div class="overview-container">
    <div>
      <client-only>
        <a-tabs
          default-active-key="All"
          :animated="false"
          @change="onTabChange"
        >
          <a-tab-pane key="All">
            <span slot="tab"> All ({{ totalAmount }})</span>
            <AssignTable :original-data="data" :tab-key="tabKey" />
          </a-tab-pane>
          <a-tab-pane key="Today">
            <span slot="tab"> Today ({{ todayAmount }})</span>
            <AssignTable :original-data="todayTabContent" :tab-key="tabKey" />
          </a-tab-pane>
          <a-tab-pane key="Yesterday">
            <span slot="tab"> Yesterday ({{ yesterdayAmount }}) </span>
            <AssignTable
              :original-data="yesterdayTabContent"
              :tab-key="tabKey"
            />
          </a-tab-pane>
        </a-tabs>
      </client-only>
    </div>
  </div>
</template>

<script lang="ts">
import moment from 'moment'
import { Vue, Component } from 'vue-property-decorator'
import { ShipmentModule } from '~/store'

import { IOrder } from '~/types/order.type'

@Component
export default class AssignOverview extends Vue {
  tabKey: string = 'All'

  data: IOrder[] = []

  mounted() {
    this.data = ShipmentModule.getOrderList.filter(
      (item) => item.exportBatch === null
    )
  }

  get todayTabContent(): IOrder[] {
    return this.data.filter((item) => {
      return moment(item.orderedDate).isSame(moment(), 'day')
    })
  }

  get yesterdayTabContent(): IOrder[] {
    return this.data.filter((item) => {
      return moment(item.orderedDate).isSame(moment().subtract(1, 'day'), 'day')
    })
  }

  get totalAmount() {
    return this.data.length
  }

  get todayAmount() {
    return this.todayTabContent.length
  }

  get yesterdayAmount() {
    return this.yesterdayTabContent.length
  }

  onTabChange(key: string) {
    this.tabKey = key
  }
}
</script>
