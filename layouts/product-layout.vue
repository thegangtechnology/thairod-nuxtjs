<template>
  <div>
    <!--    <AppHeader />-->
    <a-layout id="components-layout-demo-custom-trigger">
      <a-layout-sider
        v-model="collapsed"
        theme="light"
        :trigger="null"
        collapsible
      >
        <!--        <div class="logo" />-->
        <div class="menu-back">
          <div>
            เมนู
          </div>
          <a-icon
            type="left"
            @click="() => (collapsed = !collapsed)"
          />
        </div>
        <a-menu theme="light" mode="inline">
          <a-menu-item key="1">
            <a-icon type="home" />
            <span>หน้าแรก</span>
          </a-menu-item>
          <a-menu-item key="2">
            <a-icon type="info-circle" />
            <span>ข้อมูลการรักษา</span>
          </a-menu-item>
        </a-menu>
        <div v-if="!collapsed" class="pa-4">
          <div class="mb-3">
            <DoctorDetail />
          </div>
          <div class="mb-3">
            <PatientDetail />
          </div>
        </div>
      </a-layout-sider>
      <a-layout>
        <a-layout-header style="background: #fff; padding: 0">
          <a-icon
            class="trigger"
            type="menu"
            @click="() => (collapsed = !collapsed)"
          />
          <span>
            ไทยรอด Mall
          </span>
          <a href="/carts" class="carts__button">
            <a-badge dot>
              <a-icon
                class="trigger float-right shopping-cart__button"
                type="shopping-cart"
              />
            </a-badge>
          </a>
        </a-layout-header>
        <a-layout-content>
          <nuxt />
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import PatientDetail from '~/components/PatientDetail.vue'
import DoctorDetail from '~/components/DoctorDetail.vue'

export default Vue.extend({
  components: {
    PatientDetail,
    DoctorDetail
  },
  data () {
    return {
      collapsed: true
    }
  }
})
</script>

<style>
.ant-layout-header{
  padding:16px!important;
}
.ant-layout-has-sider{
  height:100vh;
  overflow:hidden;
}.ant-layout-header
.ant-layout-content {
  background-color: #ffffff;
}
.ant-layout-sider {
  position: absolute;
  height: 100vh;
  z-index: 7;
  //top: 64px;
  left: 0;
  //display:flex;
}
.ant-layout-sider-collapsed {
  left: -80px;
  //display:none;
}
.ant-layout-header {
  align-items: center;
  display: flex;
  justify-content: space-between;
}
.carts__button .anticon-shopping-cart {
  display: flex;
}
a.carts__button {
  color: #000000;
}
.carts__button .ant-badge-dot {
  position: absolute;
  left: 55%;
}
.menu-back{
  display: flex;
  justify-content:space-between;
  padding:12px 24px;
  align-items: center;
}
</style>
