<template>
  <div>
    <ProductDetail :item="product"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ProductDetail from '~/components/product/ProductDetail.vue'
import ProductModule from '~/store/product.module'
import { Product } from '~/types/product.type'

export default Vue.extend({
  components: {
    ProductDetail
  },
  layout: 'product-layout',
  data() {
    return {}
  },
  computed: {
    product(): Product{
      return ProductModule.product
    }
  },
  async mounted() {
    await ProductModule.getProduct({ id: 1 })
  }
})
</script>

<style scoped></style>
