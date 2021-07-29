<template>
  <a-page-header
    @back="onBackButtonClick"
  >
    <template slot="backIcon">
      <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 1.46875L1 6.1329L6 10.5312" stroke="black" stroke-width="2.2" stroke-linecap="square" />
      </svg>
    </template>
    <span slot="title" class="title">
      {{ title }}
    </span>
  </a-page-header>
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

<style scoped lang="less">

  .ant-page-header {
    background-color: @primary-color;
    text-align: center;
    padding: 16px 24px 12px 24px;
  }

  .title {
    color: black;
    font-size: 24px;
    line-height: 16px;
    font-weight: bold;
  }

</style>
