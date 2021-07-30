<template>
  <div>
    <a-layout id="components-layout-demo-custom-trigger" class="product-layout">
      <a-layout-sider
        v-model="collapsed"
        theme="light"
        :trigger="null"
        collapsible
      >
        <div class="menu-back">
          <div>
            <img
              alt="Logo Thairod Mall"
              :src="require('@/assets/images/logo.svg')"
              class="img-responsive"
            >
          </div>
          <a-icon
            type="left"
            @click="() => (collapsed = !collapsed)"
          />
        </div>
        <div v-if="!collapsed" class="pa-4">
          <div class="mb-3">
            <DoctorDetail />
          </div>
        </div>
        <a-menu theme="light" mode="inline">
          <a-menu-item key="1" @click="goToPage('/product')">
            <a-icon type="home" />
            <span>หน้ารวมสินค้า</span>
          </a-menu-item>
        </a-menu>
      </a-layout-sider>
      <a-layout>
        <a-layout-header style="background: #fff; padding: 0">
          <a-icon
            class="trigger"
            type="menu"
            @click="() => (collapsed = !collapsed)"
          />
          <span class="page-name">
            ไทยรอดMALL
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
import DoctorDetail from '~/components/DoctorDetail.vue'

export default Vue.extend({
  components: {
    DoctorDetail
  },
  data () {
    return {
      collapsed: true
    }
  },
  methods: {
    hiddenMenu () {
      this.collapsed = false
    },
    goToPage (path:string):void {
      console.log('path', path)
      this.hiddenMenu()
      this.$router.push(`${path}`)
    }
  }
})
</script>

<style scoped lang="less">
.ant-page-header {
  background-color: @primary-color;
  text-align: center;
  padding: 16px 24px 12px 24px;
}
.ant-layout-header{
  background-color: @primary-color!important;
  text-align: center!important;
  padding: 16px 24px 12px 24px!important;

}
.ant-layout-header .page-name{
  font-family: 'FC Minimal', sans-serif;
  font-size: 30px;
  font-weight: bold;
  color: #001740;
}
.product-layout .ant-layout-has-sider{
  height:100vh;
  overflow:hidden;
}
.ant-layout-content {
  background-color: #ffffff;
  min-height:auto;
}
.product-layout .ant-layout-sider {
  position: absolute;
  height: 100vh;
  z-index: 7;
  left: 0;
  min-width: 300px!important;
  width:300px!important;
  -webkit-box-shadow: 2px 0px 5px 0px rgba(161,161,161,1);
-moz-box-shadow: 2px 0px 5px 0px rgba(161,161,161,1);
box-shadow: 2px 0px 5px 0px rgba(161,161,161,1);
}
.product-layout .ant-layout-sider-collapsed {
  left: -80px;
  min-width: 0 !important;
  width: 0 !important;
}
.product-layout ul{
  border-right:none;

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
  line-height: 10px;
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
