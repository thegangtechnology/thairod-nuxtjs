<template>
  <div class="container">
    <CardPatientDetail :patient-detail="patient" />
    <a-row :gutter="[16, 16]" class="search-row">
      <a-col :span="24">
        <a-input v-model="search" placeholder="ค้นหา" @keyup.enter="onSearch" @blur="onSearch">
          <a-icon slot="prefix" type="search" />
          <a-icon v-if="search" slot="suffix" type="close-circle" @click="resetSearch" />
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

    <a-row class="pagination-row">
      <a-pagination
        v-model="currentPage"
        show-size-changer
        show-quick-jumper
        :total="totalItem"
        :default-page-size="pageSize"
        :page-size-options="['4','8', '12', '16', '20']"
        @change="changePagination"
        @showSizeChange="changePagination"
      />
    </a-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import CardPatientDetail from '~/components/CardPatientDetail.vue'
import ProductModule from '~/store/product.module'
import { Patient } from '~/types/patient.type'
import { ICheckoutProduct, Product } from '~/types/product.type'
import ProductCard from '~/components/product/ProductCard.vue'
import DoctorModule from '~/store/doctor.module'
import { OrderItem } from '~/types/order.type'

export default Vue.extend({
  components: {
    CardPatientDetail,
    ProductCard
  },
  layout: 'product-layout',
  data () {
    return {
      isSubmit: false,
      search: '',
      currentPage: 1,
      pageSize: 4
    }
  },
  computed: {
    hash (): string {
      return this.$route.query.doctor as string
    },
    patient (): Patient {
      return DoctorModule.patient
    },
    productList (): Product[] {
      return ProductModule.productList
    },
    totalItem (): number {
      return ProductModule.totalProduct
    },
    doctorOrder (): OrderItem[] {
      return DoctorModule.doctorOrder
    }
  },
  async created () {
    await DoctorModule.getDoctorOrder({ hash: this.$route.query.doctor as string })
    await this.checkOrder()
  },
  async mounted () {
    await ProductModule.getProductList(
      { page: this.currentPage, pageSize: this.pageSize, search: this.search })
  },
  methods: {
    async getProducts (): Promise<void> {
      await ProductModule.getProductList(
        { page: this.currentPage, pageSize: this.pageSize, search: this.search })
    },
    async onSearch (): Promise<void> {
      this.currentPage = 1
      await this.getProducts()
    },
    async resetSearch (): Promise<void> {
      this.search = ''
      await this.getProducts()
    },
    async changePagination (page: number, pageSize: number): Promise<void> {
      this.currentPage = page
      this.pageSize = pageSize
      await this.getProducts()
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
    },
    checkOrder () {
      if (this.doctorOrder.length > 0) {
        this.$router.push({ path: '/order-successed/', query: { doctor: this.$route.query.doctor as string } })
      }
    }
  }
})
</script>

<style scoped lang='less'>
.space-product {
  flex-wrap: wrap;
  display: flex;
  align-items: stretch;
}

.space-product-item {
  display: flex;
}

.anticon {
  color: #a7a7a7;
}

.anticon-close-circle {
  font-size: 14px;
}

.ant-pagination {
  margin-top: 24px;
  font-size: 18px;
}

.pagination-row {
  text-align: center;
}

.search-row {
  margin: 0 4px;
}
</style>

<style>
.ant-pagination-item {
  font-size: 14px;
}

.ant-select, .ant-icon, .ant-pagination-options, .ant-select-selection, .ant-select-dropdown-menu-item, input {
  font-size: 16px !important;
}

.ant-pagination-item-active, .ant-pagination-item-active:focus, .ant-pagination-item-active:hover {
  border-color: #F9B7B7;
}

.ant-pagination-item-active:focus a, .ant-pagination-item-active:hover a, .ant-pagination-item-active a {
  color: #F9B7B7;
}

.ant-input-affix-wrapper .ant-input:not(:first-child) {
  padding-left: 40px;
}
</style>
