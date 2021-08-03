<template>
  <a-button
    type="primary"
    shape="round"
    :style="{backgroundColor: '#F9B7B7', color: '#000000', borderColor: '#ffc1c1', fontSize: '18px', textShadow: 'none'}"
    :size="size"
    :block="block"
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
    text: { type: String, default: '' },
    size: { type: String, default: 'default' },
    block: { type: Boolean, default: false }
  }
})
</script>
