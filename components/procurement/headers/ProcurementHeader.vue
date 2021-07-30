<template>
  <a-page-header
    @back="onBackButtonClick"
  >
    <template slot="backIcon">
      <a-icon type="left" />
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
    padding: 14px 24px 12px 24px;
    height: 60px;
  }

  .title {
    color: black;
    font-size: 24px;
    font-weight: bold;
  }

</style>
