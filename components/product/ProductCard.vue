<template>
  <a-card hoverable class="product-card">
    <img
      slot="cover"
      alt="product image"
      :src="item.image"
      class="img-responsive"
      @click="goToProduct(item.id)"
    >
    <a-card-meta
      :title="item.name"
      class="product-card__info"
      @click="goToProduct(item.id)"
    >
      <template slot="description">
        {{ item.description }}
      </template>
    </a-card-meta>
    <template slot="actions" class="ant-card-actions product-card__button">
      <primary-button
        class="update-button"
        :text="'เพิ่มใส่ตะกร้า'"
        block
        :on-click="addToCart"
        :size="'large'"
      />
    </template>
  </a-card>
</template>
<script lang="ts">
import Vue, { PropType } from 'vue'
import { ICheckoutProduct, Product } from '~/types/product.type'
import PrimaryButton from '~/components/procurement/buttons/PrimaryButton.vue'
import ProductModule from '~/store/product.module'

export default Vue.extend({
  components: { PrimaryButton },
  props: {
    item: {
      type: Object as PropType<Product>,
      default: () => {
        return {
          id: 0
        }
      }
    }
  },
  data () {
    return {
      amount: 0
    }
  },
  computed: {
    getAmount (): number {
      const cartItems = JSON.parse(sessionStorage.getItem('doc-or-storage') as string)
      if (!cartItems) {
        return 0
      }
      const foundItem = cartItems.find((item: ICheckoutProduct) => item.itemId === this.item.id)
      if (foundItem) {
        return foundItem.quantity
      } else {
        return 0
      }
    }
  },
  mounted () {
    this.amount = this.getAmount
  },
  methods: {
    goToProduct (id: number): void {
      this.$router.push(`/product/${id}/?doctor=${this.$route.query.doctor}`)
    },
    addToCart (): void {
      this.amount += 1
      this.$emit('updateAmount', this.amount, this.item)
    }
  }
})
</script>

<style lang="less">
.product-card.ant-card {
  //min-width: 160px;
  max-width: 350px;
  width: 100%;
  background-color: #ffffff !important;;
  border-radius: 10px !important;
  border-color: #e9ecf2 !important;;
  overflow: hidden;
}

.product-card .ant-card-cover img {
  border-radius: 6px;
  max-height: 205px;
}

.product-card .ant-card-body,
.product-card .ant-card-cover,
.product-card .ant-card-actions {
  padding: 8px;
}

.product-card .ant-card-actions {
  border-top: none;
  background-color: #ffffff;
}

.product-card .ant-card-meta-title,
.product-card .ant-card-meta-detail > div:not(:last-child) {
  margin-bottom: 0;
  line-height: normal;
  font-size: 18px;
}

.product-card .ant-card-meta-description {
  font-size: 16px;
}

.btn-add-cart {
  background-color: #666666;
  color: #ffffff;
}

.product-card .update-button {
  font-size: 18px;
}

@media only screen and (max-width: 375px) {
  .product-card {
    min-width: 120px;
    max-width: 100%;
  }

  .product-card .ant-card-actions {
    padding: 0 8px;
  }

  .btn-add-cart {
    padding: 0 8px;
  }

  .product-card .ant-card-cover img {
    border-radius: 6px;
    max-height: 100px;
  }
}
</style>
