<template>
  <div class="app-wrapper">
    <nuxt />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({})
</script>

<style>
.app-wrapper {
  margin: 20px;
}

.ant-btn:hover {
  color: black;
  border-color: black;
}

.ant-btn.ant-btn-primary {
  background: black;
  color: white;
  border-color: black;
}
</style>
