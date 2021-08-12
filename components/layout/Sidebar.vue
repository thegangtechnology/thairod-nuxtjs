<template>
  <a-layout-sider
    v-model="sidebarCollapsed"
    theme="light"
    :trigger="null"
    collapsible
    collapsed-width="0"
    width="300px"
  >
    <sidebar-content :default-selected-menu="defaultSelectedMenu" />
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
      default: true
    },
    defaultSelectedMenu: {
      type: String,
      default: 'dashboard'
    }
  },
  data () {
    return {
      sidebarCollapsed: true
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
