<template>
  <div class="page-header-product">
    <div class="ant-layout-header">
      <a-icon type="left" @click="onBackButtonClick" />
      <span class="page-name">
        {{ title }}
      </span>
      <a-badge :count="totalCart">
        <a v-if="isDetail" class="carts__button" @click="goToCart">
          <a-badge :count="totalCart">
            <a-icon
              class="trigger float-right shopping-cart__button"
              type="shopping-cart"
            />
          </a-badge></a>
      </a-badge>
    </div>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue'
import ProductModule from '~/store/product.module'

export default Vue.extend({
  props: {
    title: { type: String, default: '' },
    onBackButtonClick: { type: Function, default: () => null },
    isDetail: { type: Boolean, default: true }
  },
  computed: {
    totalCart (): number {
      if (sessionStorage.getItem('doc-or-storage')) {
        ProductModule.setTotalCart({ totalItem: JSON.parse(sessionStorage.getItem('doc-or-storage') as string).length })
      }
      return ProductModule.total
    }
  },
  methods: {
    goToCart () {
      this.$router.push(`/carts/?doctor=${this.$route.query.doctor}`)
    }
  }
})
</script>

<style lang='less'>
.page-header-product .ant-layout-header {
  background-color: @primary-color;
  text-align: center;
  padding: 16px 24px 12px 24px;
  height: 64px;
  align-items: center;
  display: flex;
  justify-content: space-between;
}

.page-header-product .page-name {
  font-family: 'FC Minimal', sans-serif;
  font-size: 30px;
  font-weight: bold;
  color: #001740;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0 10px;
}

.page-header-product a.carts__button {
  color: #000000;
  display: flex;
  align-items:center;
}
.page-header-product a.carts__button i {
  background-position: center;
  transition: background 0.5s;
  border-radius: 50%;
  padding: 4px;
}
.page-header-product a.carts__button:hover i {
  background: rgba(255, 255, 255,0.2) radial-gradient(circle, transparent 1%, rgba(255, 255, 255,0.2)  1%) center / 15000%;
  border-radius: 50%;
}
.page-header-product a.carts__button:active {
  background-color: transparent;
  background-size: 100%;
  transition: background 0s;
  border-radius: 50%;
}

 a.carts__button {
  color: #000000;
}
</style>
