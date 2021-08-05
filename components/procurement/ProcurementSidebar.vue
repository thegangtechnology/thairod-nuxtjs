<template>
  <a-layout-sider
    v-model="sidebarCollapsed"
    theme="light"
    :trigger="null"
    collapsible
    collapsed-width="0"
    width="300px"
  >
    <sidebar-content />
  </a-layout-sider>
</template>

<script lang="ts">
import Vue from 'vue'
import SidebarContent from '~/components/layout/SidebarContent.vue'

export default Vue.extend({
  components: { SidebarContent },
  layout: 'empty',
  props: {
    collapsed: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      sidebarCollapsed: false,
      userInfo: [{ firstName: 'เติมศิริ', lastName: 'ธัยยามาตย์', role: 'Admin' }]
    }
  },
  watch: {
    collapsed (newVal) {
      if (this.sidebarCollapsed !== newVal) {
        this.sidebarCollapsed = newVal
      }
    }
  }
})
</script>
