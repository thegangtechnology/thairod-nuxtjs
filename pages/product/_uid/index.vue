<template>
  <div>
    <ProductDetail />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ProductDetail from '~/components/product/ProductDetail.vue'

export default Vue.extend({
  components: {
    ProductDetail
  },
  layout: 'product-layout',
  data () {
    return {
    }
  }

})
</script>

<style scoped></style>
