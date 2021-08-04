<template>
  <div class="container">
    <CardPatientDetail :patient-detail="patient" />
    <a-row :gutter="[16, 16]">
      <a-col :span="24">
        <!--        <a-input-search placeholder="ค้นหา" @search="onSearch" />-->
        <a-input
          v-model="search"
          placeholder=" ค้นหา"
          size="large"
          allow-clear
          @change="onSearch"
        >
          <a-icon slot="prefix" type="search" />
        </a-input>
      </a-col>
    </a-row>
    <a-row :gutter="[16, 16]" class="space-product">
      <a-col
        v-for="(item, i) in productList"
        :key="i"
        :xs="12"
        :sm="12"
        :md="8"
        :lg="4"
        :xl="4"
        class="space-product-item"
      >
        <ProductCard :item="item" @updateAmount="updateAmount" />
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import CardPatientDetail from '~/components/CardPatientDetail.vue'
import PatientModule from '~/store/patient.module'
import ProductModule from '~/store/product.module'
import { Patient } from '~/types/patient.type'
import { ICheckoutProduct, Product } from '~/types/product.type'
import ProductCard from '~/components/product/ProductCard.vue'
import DoctorModule from '~/store/doctor.module'

export default Vue.extend({
  components: {
    CardPatientDetail,
    ProductCard
  },
  layout: 'product-layout',
  data () {
    return {
      isSubmit: false,
      search: ''
    }
  },
  computed: {
    patient (): Patient {
      return DoctorModule.patient
    },
    productList (): Product[] {
      return ProductModule.productList
    }
  },
  async mounted () {
    await PatientModule.getPatient({ id: 1 })
    await ProductModule.getProductList({
      page: 1,
      perPage: -1,
      search: ''
    })
  },
  methods: {
    onSearch (): void {
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

<style scoped lang="less">
.space-product {
  flex-wrap: wrap;
  display: flex;
  align-items: stretch;
}
.space-product-item {
  display: flex;
}
</style>
