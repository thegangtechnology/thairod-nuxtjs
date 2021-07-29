<template>
  <a-button
    type="primary"
    shape="round"
    :style="{backgroundColor: '#EEEFF6FF', color: 'black', borderColor: '#efefef'}"
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
    text: { type: String, default: '' }
  }
})
</script>

<style scoped>

</style>
