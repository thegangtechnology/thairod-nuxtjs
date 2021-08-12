<template>
  <div>
    <a-layout id="dashboard-layout">
      <sidebar :collapsed="collapsed" :default-selected-menu="'dashboard'" />
      <a-layout>
        <a-layout-header>
          <main-header :title="'ภาพรวมคลังสินค้าและการจัดส่ง'" :on-button-click="triggerSidebar" :sidebar-collapsed="collapsed" />
        </a-layout-header>
        <a-layout-content>
          <dashboard-content />
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Sidebar from '~/components/layout/Sidebar.vue'
import MainHeader from '~/components/procurement/headers/MainHeader.vue'
import DashboardContent from '~/components/dashboard/DashboardContent.vue'

export default Vue.extend({
  components: { Sidebar, MainHeader, DashboardContent },
  layout: 'empty',
  data () {
    return {
      collapsed: true
    }
  },
  methods: {
    triggerSidebar () : void {
      this.collapsed = !(this.collapsed)
    }
  }
})
</script>

<style>
#dashboard-layout .ant-layout-header {
  height: 60px;
  padding: 0;
}

#dashboard-layout .ant-layout-content {
  min-height: 100vh;
  background-color: #fafafa;
  margin: 0;
  z-index: 100;
  padding: 8px 4px;
}
</style>

<style scoped>
</style>
