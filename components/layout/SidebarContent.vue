<template>
  <div class="sidebar-container">
    <img
      alt="logo"
      src="~/assets/images/logo/sidebar-logo.svg"
      class="logo-image"
    >
    <a-list :data-source="userInfo" class="list-items">
      <a-list-item slot="renderItem" slot-scope="{firstName, lastName, username}">
        <a-list-item-meta
          :description="username"
        >
          <span slot="title" class="list-title">{{ firstName }} {{ lastName }} </span>
        </a-list-item-meta>
      </a-list-item>
    </a-list>
    <a-menu mode="inline" :default-selected-keys="['1']">
      <a-menu-item key="1" @click="$router.push('/procurement')">
        <img class="icon" alt="box-icon" src="~/assets/images/procurement/icon/box-icon.png">
        <span>จัดการคลังสินค้า</span>
      </a-menu-item>
      <a-menu-item key="2" @click="$router.push('/order-overview')">
        <a-icon type="profile" />
        <span>ภาพรวมรายการจัดสั่ง</span>
      </a-menu-item>
      <a-menu-item key="3" @click="$router.push('/assign')">
        <a-icon type="build" />
        <span>จัดการล็อตรายการจัดส่ง</span>
      </a-menu-item>
      <a-menu-item key="4" @click="$router.push('/print')">
        <a-icon type="printer" />
        <span>พิมพ์ใบจัดส่งสินค้า</span>
      </a-menu-item>
    </a-menu>
    <a-button class="logout-button" @click="onLogout">
      <img alt="logout" class="icon" src="~/assets/images/procurement/icon/logout-icon.svg">
      ออกจากระบบ
    </a-button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { UserInfo } from '~/types/procurement.type'

export default Vue.extend({
  components: {},
  layout: 'empty',
  props: {
  },
  data () {
    return {
    }
  },
  computed: {
    userInfo () : (UserInfo | null)[] {
      return [this.$auth.user] as (UserInfo | null)[]
    }
  },
  methods: {
    logout () : void {
      this.$auth.logout()
    },
    onLogout () : void {
      this.logout()
    }
  }
})
</script>

<style scoped>

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
  background-color: #fcecec !important;
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

.logout-button:active, .logout-button:hover {
  color: #F9B7B7;
}

.list-items {
  padding-left: 24px;
  color: black;
}

.sidebar-container {
  min-width: 300px;
}

</style>
