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
          <a-icon type="left" @click="() => (collapsed = !collapsed)" />
        </div>
        <div v-if="!collapsed" class="pa-4">
          <div class="mb-3">
            <DoctorDetail :doctor-detail="doctor" />
          </div>
        </div>
        <a-menu theme="light" mode="inline">
          <a-menu-item key="1" @click="goToPage(`/product/?doctor=${$route.query.doctor}`)">
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
          <a-badge :count="totalCart">
            <a class="carts__button" @click="goToCart">
              <a-icon
                class="trigger float-right shopping-cart__button"
                type="shopping-cart"
              />
            </a>
          </a-badge>
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
import DoctorModule from '~/store/doctor.module'
import { DoctorInfo } from '~/types/order.type'
import ProductModule from '~/store/product.module'

export default Vue.extend({
  components: {
    DoctorDetail
  },
  data () {
    return {
      collapsed: true
    }
  },
  computed: {
    doctor (): DoctorInfo {
      return DoctorModule.doctor
    },
    totalCart (): number {
      if (sessionStorage.getItem('doc-or-storage')) {
        ProductModule.setTotalCart({ totalItem: JSON.parse(sessionStorage.getItem('doc-or-storage') as string).length })
      }
      return ProductModule.total
    }
  },
  async mounted () {
    await DoctorModule.getDoctorOrder({ hash: this.$route.query.doctor as string })
  },
  methods: {
    hiddenMenu () {
      this.collapsed = false
    },
    goToPage (path: string): void {
      this.hiddenMenu()
      this.$router.push(`${path}`)
    },
    goToCart () {
      this.$router.push(`/carts/?doctor=${this.$route.query.doctor}`)
    }
  }
})
</script>

<style lang="less">
.product-layout .ant-page-header {
  background-color: @primary-color;
  text-align: center;
  padding: 16px 24px 12px 24px;
  height: 60px;
}
.product-layout .ant-layout-header {
  background-color: @primary-color!important;
  text-align: center !important;
  padding: 16px 24px 12px 24px !important;
}
.product-layout .ant-layout-header .page-name {
  font-family: 'FC Minimal', sans-serif;
  font-size: 30px;
  font-weight: bold;
  color: #001740;
}
.product-layout .ant-layout-has-sider {
  height: 100vh;
  overflow: hidden;
}
.product-layout .ant-layout-content {
  background-color: #ffffff;
  min-height: auto;
}
.product-layout .ant-layout-sider {
  position: absolute;
  height: 100vh;
  z-index: 7;
  left: 0;
  min-width: 300px !important;
  width: 300px !important;
  -webkit-box-shadow: 2px 0px 5px 0px rgba(161, 161, 161, 1);
  -moz-box-shadow: 2px 0px 5px 0px rgba(161, 161, 161, 1);
  box-shadow: 2px 0px 5px 0px rgba(161, 161, 161, 1);
  overflow: hidden;
}
.product-layout .ant-menu-item.ant-menu-item-selected {
  border: 0;
  border-left: 3px solid #F9B7B7;
  border-right: none;
}
.product-layout .ant-layout-sider-collapsed {
  left: -80px;
  min-width: 0 !important;
  width: 0 !important;
}
.product-layout ul {
  border-right: none;
}
.product-layout .ant-layout-header {
  align-items: center;
  display: flex;
  justify-content: space-between;
}
.product-layout .carts__button .anticon-shopping-cart {
  display: flex;
}
.product-layout a.carts__button {
  color: #000000;
  line-height: 10px;
}
.product-layout .carts__button .ant-badge-dot {
  position: absolute;
  left: 55%;
}
.product-layout .menu-back {
  display: flex;
  justify-content: space-between;
  padding: 12px 24px;
  align-items: center;
}
</style>
