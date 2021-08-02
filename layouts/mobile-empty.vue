<template>
  <div>
    <a-page-header>
      <span slot="title" class="title">
        {{ headerTitle }}
      </span>
    </a-page-header>
    <div class="app-wrapper">
      <nuxt />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import CommonModule from '~/store/common.module'

export default Vue.extend({
  computed: {
    headerTitle (): string {
      return CommonModule.headerTitle
    }
  }
})
</script>

<style lang="less">
.app-wrapper {
  padding: 20px;
}

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

p {
  margin-bottom: 4px;
}

.ant-btn:hover {
  color: black;
  border-color: @primary-color;
}

.ant-btn.ant-btn-primary {
  background: @primary-color;
  color: black;
  border-color: @primary-color;
}

button {
  width: 95%;
}

.ant-btn {
  height: 38px;
}

.button-group {
  margin-top: 5vh;
}
</style>
