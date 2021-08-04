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
        <ProductCard :item="item" @updateAmount="updateAmount"/>
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
import { Product } from '~/types/product.type'
import ProductCard from '~/components/product/ProductCard.vue'

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
      return PatientModule.patient
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
    onSearch (): void {},
    updateAmount (amount: number, product: Product): void {
      console.log('product list',product)
      const newProduct = { ...product }
      newProduct.amount = amount
      console.log(amount)
      ProductModule.updateProduct(
        newProduct
      )
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
