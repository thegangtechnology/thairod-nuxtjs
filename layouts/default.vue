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
          <img :src="require('~/assets/images/sidebar/thairod-logo.svg')" alt="thairod-logo" height="28">
          <img
            :class="{'hide-content': collapsed}"
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
          <p>
            Admin
          </p>
        </a-col>
      </a-row>

      <a-menu :default-selected-keys="['1']" mode="inline">
        <a-menu-item key="1">
          <a-icon type="user" />
          <span>จัดการคลังสินค้า</span>
        </a-menu-item>
        <a-menu-item key="2">
          <a-icon type="user" />
          <span>ภาพรวมรายการจัดส่ง</span>
        </a-menu-item>
        <a-menu-item key="3">
          <a-icon type="video-camera" />
          <span>จัดการล็อตรายการจัดส่ง</span>
        </a-menu-item>
        <a-menu-item key="4">
          <a-icon type="upload" />
          <span>พิมพ์ใบจัดส่งสินค้า</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>

    <a-layout-content>
      <nuxt />
    </a-layout-content>
  </a-layout>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data () {
    return {
      collapsed: false
    }
  }
})
</script>

<style lang="less">
.hide-content {
  display: none !important;
}

.sidebar-logo {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-bottom: 1px solid #EDEFFA;
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
</style>
