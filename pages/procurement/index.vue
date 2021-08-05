<template>
  <div>
    <a-layout>
      <sidebar :collapsed="collapsed" />
      <a-layout>
        <a-layout-header>
          <main-header :title="'คลังสินค้า'" :on-button-click="triggerSidebar" :sidebar-collapsed="collapsed" />
        </a-layout-header>
        <a-layout-content>
          <a-row class="search-row">
            <a-input v-model="search" placeholder="ค้นหาสินค้าในคลัง" @keyup.enter="onSearch">
              <a-icon slot="prefix" type="search" />
              <a-icon v-if="search" slot="suffix" type="close-circle" @click="resetSearch" />
            </a-input>
          </a-row>
          <a-row>
            <item-overview v-for="item in items" :key="item.id" :item="item" />
          </a-row>
          <a-row class="pagination-row">
            <a-pagination
              v-model="currentPage"
              show-size-changer
              show-quick-jumper
              :total="totalItems"
              :default-page-size="pageSize"
            />
          </a-row>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import MainHeader from '~/components/procurement/headers/MainHeader.vue'
import ItemOverview from '~/components/procurement/ItemOverview.vue'
import ProcurementModule from '~/store/procurement.module'
import { ItemOverviewInfo } from '~/types/procurement.type'
import Sidebar from '~/components/procurement/ProcurementSidebar.vue'

export default Vue.extend({
  components: { MainHeader, ItemOverview, Sidebar },
  layout: 'empty',
  data () {
    return {
      currentPage: 1,
      pageSize: 4,
      search: '',
      collapsed: true
    }
  },
  computed: {
    items () : ItemOverviewInfo[] {
      return ProcurementModule.itemOverviewInfo
    },
    totalItems () : number {
      return ProcurementModule.totalItems
    }
  },
  async mounted () {
    await ProcurementModule.getItemOverview(
      { page: this.currentPage, pageSize: this.pageSize, search: '' })
  },
  methods: {
    triggerSidebar () : void {
      this.collapsed = !(this.collapsed)
    },
    async onSearch () : Promise<void> {
      await ProcurementModule.getItemOverview(
        { page: this.currentPage, pageSize: this.pageSize, search: this.search })
    },
    async resetSearch () : Promise<void> {
      this.search = ''
      await this.onSearch()
    }
  }
})
</script>

<style scoped>

.anticon {
  color: #a7a7a7;
}

.anticon-close-circle {
  font-size: 14px;
}

.ant-layout-header {
  height: 60px;
  padding: 0;
}

.ant-layout-content {
  min-height: 100vh;
  background-color: #fafafa;
  margin: 0;
  z-index: 100;
  padding: 8px 4px;
}

.ant-row {
  min-width: 150px;
}

.ant-pagination {
  margin-top: 24px;
  font-size: 18px;
}

.pagination-row {
  text-align: center;
}

.search-row {
  margin: 0 4px;
}

</style>

<style>
.ant-pagination-item {
  font-size: 14px;
}

.ant-select, .ant-icon, .ant-pagination-options, .ant-select-selection, .ant-select-dropdown-menu-item, input {
  font-size: 16px !important;
}

.ant-pagination-item-active, .ant-pagination-item-active:focus, .ant-pagination-item-active:hover  {
  border-color: #001740;
}

.ant-pagination-item-active:focus a, .ant-pagination-item-active:hover a, .ant-pagination-item-active a{
  color: #001740;
}

.ant-input-affix-wrapper .ant-input:not(:first-child) {
  padding-left: 40px;
}
</style>
