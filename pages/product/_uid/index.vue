<template>
  <div>
    <ProductHeader
      :title="product.name"
      :on-back-button-click="onBackButtonClick"
    />
    <ProductDetail :item="product" @updateAmount="updateAmount" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ProductDetail from '~/components/product/ProductDetail.vue'
import ProductModule from '~/store/product.module'
import { ICheckoutProduct, Product } from '~/types/product.type'
import ProductHeader from '~/components/product/ProductHeader.vue'
import DoctorModule from '~/store/doctor.module'

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
    hash (): string {
      return this.$route.query.doctor as string ? this.$route.query.doctor as string : ''
    },
    product (): Product {
      return ProductModule.product
    }
  },
  async mounted () {
    await ProductModule.getProduct(
      { id: Number(this.$route.params.uid) }
    )
  },
  async created () {
    await DoctorModule.getDoctorOrder({ hash: this.hash })
  },
  methods: {
    onBackButtonClick (): void {
      this.$router.push(`/product/?doctor=${this.$route.query.doctor}`)
    },
    updateAmount (amount: number, product: Product): void {
      let cartItems = []
      if (sessionStorage.getItem('doc-or-storage')) {
        cartItems = JSON.parse(sessionStorage.getItem('doc-or-storage') as string)
        const duplicateItemIndex = cartItems.findIndex((item: ICheckoutProduct) => item.itemId === product.id)
        if (duplicateItemIndex !== -1) {
          cartItems[duplicateItemIndex].quantity = amount
        } else {
          cartItems.push({ itemId: product.id, quantity: amount })
        }
      } else {
        cartItems.push({ itemId: product.id, quantity: amount })
      }
      sessionStorage.setItem('doc-or-storage', JSON.stringify(cartItems))
      ProductModule.setTotalCart({ totalItem: cartItems.length })
    }
  }
})
</script>
