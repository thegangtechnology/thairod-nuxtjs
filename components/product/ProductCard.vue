<template>
  <a-card hoverable class="product-card">
    <div @click="goToProduct">
      <img
        slot="cover"
        alt="example"
        :src="require('@/assets/images/mockup/image-mockup.png')"
        class="img-responsive"
      >
      <a-card-meta title="Item Name AAA" class="product-card__info">
        <template slot="description">
          Description Lorem ipsum dolor sit amet, consectetur
        </template>
      </a-card-meta>
    </div>
    <template slot="actions" class="ant-card-actions product-card__button">
      <a-button class="btn-add-cart" block size="large">
        Add to Cart
      </a-button>
    </template>
  </a-card>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data () {
    return {

    }
  },

  methods: {
    goToProduct (): void {
      this.$router.push('/product/1')
    }
  }
})
</script>

<style>
.product-card {
  min-width: 160px;
  max-width: 350px;
  width: 100%;
  background-color: #f7f7f7;
}
.product-card .ant-card-body,
.product-card .ant-card-cover,
.product-card .ant-card-actions {
  padding: 8px;
}
.product-card .ant-card-actions {
  border-top: none;
}

.btn-add-cart {
  background-color: #666666;
  color: #ffffff;
}

@media only screen and (max-width: 375px) {
  .product-card {
    min-width: 130px;
    max-width: 100%;
    width: 100%;
    background-color: #f7f7f7;
  }
  .product-card .ant-card-actions {
    padding: 0 8px;
  }
  .btn-add-cart {
    padding: 0 8px;
  }
}
</style>
