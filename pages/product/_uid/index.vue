<template>
  <div>
    <ProductHeader
      :title="product.name"
      :on-back-button-click="onBackButtonClick"
    />
    <ProductDetail :item="product" @updateAmount="updateAmount"/>
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
    return {
      slug: 0
    }
  },
  computed: {
    product (): Product {
      return ProductModule.product
    }
  },
  async mounted () {
    await ProductModule.getProduct(
      { id: this.$route.params.uid }
    )
  },
  methods: {
    onBackButtonClick (): void {
      this.$router.push('/product')
    },
    updateAmount (amount: number, id: number): void {
      const newProduct = { ...this.product }
      newProduct.amount = amount
      console.log(amount, id)
      ProductModule.updateProduct(
        newProduct
      )
    }
  }
})
</script>

<style scoped></style>
