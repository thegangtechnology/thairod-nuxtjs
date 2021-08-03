<template>
  <a-button
    type="primary"
    shape="round"
    :style="{backgroundColor: '#EEEFF6FF', color: 'black', borderColor: '#efefef', fontSize: '18px', textShadow: 'none'}"
    @click="onClick"
  >
    <strong>{{ text }}</strong>
  </a-button>
</template>

<script lang="ts">

import Vue from 'vue'

export default Vue.extend({
  props: {
    onClick: {
      type: Function,
      default: () => {
      // empty
      }
    },
    text: { type: String, default: '' }
  }
})
</script>

<style scoped>

</style>
