<template>
  <div class="page-header-product">
    <div class="ant-layout-header">
        <a-icon type="left"  @click="onBackButtonClick"/>
      <span class="page-name">
        {{ title }}
      </span>
      <a href="/carts" class="carts__button">
        <a-icon
          class="trigger float-right shopping-cart__button"
          type="shopping-cart"
        />
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    title: { type: String, default: '' },
    onBackButtonClick: { type: Function, default: () => null }
  }
})
</script>

<style lang="less">
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
  padding:0 10px;
}
.page-header-product a.carts__button {
  color: #000000;
}
</style>
