<template>
  <div>
    <ProductHeader
      :title="product.name"
      :on-back-button-click="onBackButtonClick"
    />
    <ProductDetail :item="product" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ProductDetail from '~/components/product/ProductDetail.vue'
import ProductModule from '~/store/product.module'
import { Product } from '~/types/product.type'
import ProductHeader from '~/components/product/ProductHeader.vue'

export default Vue.extend({
  components: {
    ProductDetail,
    ProductHeader
  },
  layout: 'empty',
  data () {
    return {}
  },
  computed: {
    product (): Product {
      return ProductModule.product
    }
  },
  async mounted () {
    await ProductModule.getProduct({ id: 1 })
  },
  methods: {
    onBackButtonClick (): void {
      this.$router.push('/product')
    }
  }
})
</script>

<style scoped></style>
