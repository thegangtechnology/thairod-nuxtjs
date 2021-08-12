<template>
  <div class="page__container">
    <div class="page-card__container">
      <div class="page-card__header">
        <div class="page-header__title">
          จัดการล็อตรายการจัดส่ง
        </div>
        <div class="overview-tab__buttons">
          <a-button
            v-if="tabKey !== 'unassign'"
            class="overview-button__cta "
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
      </div>
      <AssignOverview
        :search="search"
        @sendTabKey="onTabChange"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class Main extends Vue {
  search: string = ''
  tabKey: string = ''

  onTabChange (key: string) {
    this.tabKey = key
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
