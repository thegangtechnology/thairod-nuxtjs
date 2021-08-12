<template>
  <a-page-header
    @back="onButtonClick"
  >
    <template slot="backIcon">
      <a-icon type="menu" :style="{color: 'black'}" />
    </template>
    <div slot="title" class="title">
      {{ title }}
    </div>
  </a-page-header>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    title: { type: String, default: '' },
    onButtonClick: {
      type: Function,
      default: () => {
      // empty
      }
    }
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
  color: #001740;
  font-size: 24px;
  font-weight: bold;
  min-width: 120px;
  line-height: 32px;
}

</style>
