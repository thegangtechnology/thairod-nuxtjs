<template>
  <a-button
    type="primary"
    shape="round"
    :style="{backgroundColor: '#F9B7B7', color: '#000000', borderColor: '#ffc1c1'}"
    :size="size"
    :block="block"
    @click="onClick"
  >
    {{ text }}
  </a-button>
</template>

<script>

import Vue from 'vue'

export default Vue.extend({
  props: {
    onClick: { type: Function, default: () => {} },
    text: { type: String, default: '' },
    size: { type: String, default: '' },
    block: { type: Boolean, default: false }
  }
})
</script>

<style scoped>

</style>
