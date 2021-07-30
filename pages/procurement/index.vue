<template>
  <div>
    <a-layout>
      <a-layout-sider
        v-model="collapsed"
        theme="light"
        :trigger="null"
        collapsible
        collapsed-width="0"
        width="300px"
      >
        <img
          alt="logo"
          src="~/assets/images/logo/sidebar-logo.svg"
          class="logo-image"
        >
        <a-list :data-source="userInfo" class="list-items">
          <a-list-item slot="renderItem" slot-scope="{firstName, lastName, role}">
            <a-list-item-meta
              :description="role"
            >
              <span slot="title" class="list-title">{{ firstName }} {{ lastName }}</span>
              <a-avatar
                slot="avatar"
                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
              />
            </a-list-item-meta>
          </a-list-item>
        </a-list>
        <a-menu mode="inline" :default-selected-keys="['1']">
          <a-menu-item key="1">
            <img class="icon" alt="box-icon" src="~/assets/images/procurement/icon/box-icon.png">
            <span>จัดการคลังสินค้า</span>
          </a-menu-item>
          <a-menu-item key="2">
            <a-icon type="profile" />
            <span>ภาพรวมรายการจัดสั่ง</span>
          </a-menu-item>
          <a-menu-item key="3">
            <a-icon type="build" />
            <span>จัดการล็อตรายการจัดส่ง</span>
          </a-menu-item>
          <a-menu-item key="4">
            <a-icon type="printer" />
            <span>พิมพ์ใบจัดส่งสินค้า</span>
          </a-menu-item>
        </a-menu>
        <a-button class="logout-button" @click="onLogout">
          <img class="icon" src="~/assets/images/procurement/icon/logout-icon.svg" />
          ออกจากระบบ
        </a-button>
      </a-layout-sider>
      <a-layout>
        <a-layout-header>
          <main-header :title="'คลังสินค้า'" :on-button-click="triggerSidebar" :sidebar-collapsed="collapsed" />
        </a-layout-header>
        <a-layout-content>
          <a-input-search v-model="search" placeholder="ค้นหาสินค้าในคลัง" style="width: 97vw" />
          <a-row>
            <item-overview v-for="item in filteredItems" :key="item.id" :item="item" />
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
import { ItemOverViewInfo } from '~/types/procurement.type'

export default Vue.extend({
  components: { MainHeader, ItemOverview },
  layout: 'empty',
  data () {
    return {
      search: '',
      collapsed: true,
      userInfo: [{ firstName: 'เติมศิริ', lastName: 'ธัยยามาตย์', role: 'Admin' }],
      items: [
        { id: '0', name: 'กล่องสีเขียว', stock: 100, unit: 'กล่อง', lastUpdate: '12 AUG 2021 | 12:46 P.M.' },
        { id: '1', name: 'กล่องสีเหลือง', stock: 100, unit: 'กล่อง', lastUpdate: '12 AUG 2021 | 12:46 P.M.' },
        { id: '2', name: 'ยาฟาวิพิราเวียร์', stock: 100, unit: 'กล่อง', lastUpdate: '12 AUG 2021 | 12:46 P.M.' },
        { id: '3', name: 'ฟ้าทะลายโจร', stock: 100, unit: 'กล่อง', lastUpdate: '12 AUG 2021 | 12:46 P.M.' }
      ]
    }
  },
  computed: {
    filteredItems () : Array<ItemOverViewInfo> {
      return this.items.filter(item =>
        item.name.toLowerCase().includes(this.search.toLowerCase())
      )
    }
  },
  methods: {
    triggerSidebar () : void {
      this.collapsed = !(this.collapsed)
    },
    onLogout () : void {
      this.$router.push('/')
    }
  }
})
</script>

<style scoped>

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

.logo-image {
  padding: 36px 0 36px 16px;
}

.ant-avatar {
  border-radius: 6px;
  height: 44px;
  width: 44px;
  margin-left: 16px;
}

.ant-list-item-meta-description {
  line-height: 10px;
  font-size: 18px;
}

.list-title {
  font-size: 22px;
  font-weight: bold;
}

.ant-row {
  min-width: 150px;
}

.ant-menu-item {
  color: black;
  font-weight: bold;
  font-size: 19px
}

.ant-menu-item.ant-menu-item-selected::after {
  border: 0;
}

.ant-menu-item.ant-menu-item-selected {
  border: 0;
  border-left: 3px solid #F9B7B7;
}

.ant-menu-inline, .ant-menu-vertical, .ant-menu-vertical-left {
  border: 0;
}

.icon {
  padding-right: 7px;
}

.logout-button {
  position: fixed;
  bottom: 10px;
  width: 160px;
  text-align: left;
  border: 0;
  padding-left: 24px
}

</style>