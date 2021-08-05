<template>
  <a-layout>
    <a-layout-sider
      v-model="collapsed"
      :trigger="null"
      breakpoint="md"
      collapsible
      theme="light"
      width="280"
    >
      <div class="sidebar-logo">
        <div>
          <img
            :src="require('~/assets/images/sidebar/thairod-logo.svg')"
            alt="thairod-logo"
            height="28"
          >
          <img
            :class="{ 'hide-content': collapsed }"
            :src="require('~/assets/images/sidebar/thairod-word-logo.svg')"
            alt="thairod-wording-logo"
            height="26"
          >
        </div>

        <a-icon
          :type="collapsed ? 'right' : 'left'"
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
      </div>

      <a-row align="middle" class="profile-wrapper" justify="space-around" type="flex">
        <a-col>
          <img :src="require('~/assets/images/sidebar/doctor-profile.svg')" alt="doctor-profile" height="48">
        </a-col>
        <a-col :class="{'hide-content': collapsed}" class="profile-detail" span="18">
          firstname lastname
          <p>Admin</p>
        </a-col>
      </a-row>

      <a-menu mode="inline">
        <a-menu-item :class="{'sidebar-item-active': selectedMenu === ''}" @click="goToPage('/procurement')">
          <a-icon type="shop" />
          <span>จัดการคลังสินค้า</span>
        </a-menu-item>
        <a-menu-item
          :class="{'sidebar-item-active': selectedMenu === 'order-overview'}"
          @click="goToPage('/order-overview')"
        >
          <a-icon type="profile" />
          <span>ภาพรวมรายการจัดส่ง</span>
        </a-menu-item>
        <a-menu-item
          :class="{'sidebar-item-active': selectedMenu === 'assign'}"
          @click="goToPage('/assign')"
        >
          <a-icon type="file-search" />
          <span>จัดการล็อตรายการจัดส่ง</span>
        </a-menu-item>
        <a-menu-item :class="{'sidebar-item-active': selectedMenu === 'print'}" @click="goToPage('/print')">
          <a-icon type="printer" />
          <span>พิมพ์ใบจัดส่งสินค้า</span>
        </a-menu-item>
      </a-menu>
      <a-button class="logout-button" @click="onLogout">
        <img alt="logout" class="icon" src="~/assets/images/procurement/icon/logout-icon.svg">
        ออกจากระบบ
      </a-button>
    </a-layout-sider>

    <a-layout-content>
      <nuxt />
    </a-layout-content>
  </a-layout>
</template>

<script lang='ts'>
import Vue from 'vue'

export default Vue.extend({
  data () {
    return {
      collapsed: false,
      menuPaths: ['procurement', 'order-overview', 'assign', 'print']
    }
  },
  computed: {
    selectedMenu (): string {
      const selected = this.menuPaths.find(path => path === this.$route.name)
      if (selected) {
        return selected
      } else {
        return 'order-overview'
      }
    }
  },
  methods: {
    goToPage (path: string): void {
      this.$router.push(`${path}`)
    },
    checkCurrentSidebar (): void {
      const selected = this.menuPaths.find(path => path === this.$route.name)
      if (selected) {
        this.selectedMenu = selected
      }
    },
    logout () : void {
      this.$auth.logout()
    },
    onLogout () : void {
      this.logout()
    }
  }
})
</script>

<style lang='less'>
.hide-content {
  display: none !important;
}

.sidebar-logo {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-bottom: 1px solid #edeffa;
}

.profile-wrapper {
  padding: 8px 24px;

  p {
    margin: 0;
  }

  .profile-detail {
    line-height: 1em;
    padding-left: 10px;
  }
}

.ant-menu-item {
  color: #001740;
  margin: 0 !important;
  height: 50px !important;
  display: flex !important;
  align-items: center !important;
  font-weight: bold !important;
}

.ant-menu-item-selected {
  color: #001740 !important;
}

.ant-menu-item-selected {
  background: white !important;

  &::after {
    border-right: 0 !important;
    content: '';
  }
}

.ant-menu-item.sidebar-item-active {
  background: #FFECEC !important;
  border: 0;
  border-left: 3px solid #F9B7B7;
}

.ant-layout-content {
  min-height: 100vh !important;
  z-index: 100;
}
</style>
