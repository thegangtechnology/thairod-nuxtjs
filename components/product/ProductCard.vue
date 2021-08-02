<template>
  <a-card hoverable class="product-card">
    <img
      slot="cover"
      alt="product image"
      :src="item.image"
      class="img-responsive"
      @click="goToProduct"
    />
    <a-card-meta
      :title="item.name"
      class="product-card__info"
      @click="goToProduct"
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
import { Product } from '~/types/product.type'
import PrimaryButton from '~/components/procurement/buttons/PrimaryButton.vue'

export default Vue.extend({
  components: { PrimaryButton },
  props: {
    item: {
      type: Object as PropType<Product>,
      default: () => {}
    }
  },
  data() {
    return {}
  },

  methods: {
    goToProduct(): void {
      this.$router.push('/product/1')
    },
    addToCart(): void {
      console.log('addtocart')
    }
  }
})
</script>

<style lang="less">
.product-card.ant-card {
  //min-width: 160px;
  max-width: 350px;
  width: 100%;
  background-color: #ffffff!important;;
  border-radius: 10px!important;
  border-color: #e9ecf2!important;;
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
