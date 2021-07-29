<template>
  <div class="container">
    <a-row :gutter="16" class="product-detail">
      <a-col :xs="24" :sm="12" :md="9" :lg="8" :xl="8">
        <img
          alt="example"
          :src="require('@/assets/images/mockup/image-mockup.png')"
          class="img-responsive product-detail__image"
        />
      </a-col>
      <a-col :xs="24" :sm="12" :md="15" :lg="16" :xl="16">
        <div class="product-detail__name">
          Item Name AAA
        </div>
        <div class="product-detail__description">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        </div>
        <div class="product-detail__name">
          Item Detail
        </div>
        <div class="product-detail__item">
          <a-row :gutter="16">
            <a-col
              :xs="12"
              :sm="12"
              :md="8"
              :lg="8"
              :xl="8"
              v-for="(item, i) in 4"
              :key="i"
              class="product-card__item-container"
            >
              <a-row type="flex" class="item">
                <a-col flex="50px">
                  <img
                    alt="example"
                    :src="require('@/assets/images/mockup/item-detail.png')"
                    class="img-responsive"
                  />
                </a-col>
                <a-col flex="auto" class="item__detils">
                  <div class="item__name">
                    item A
                  </div>
                  <div class="item__amount">
                    1
                  </div>
                </a-col>
              </a-row>
            </a-col>
          </a-row>
        </div>
      </a-col>
    </a-row>
    <div class="product-card__button-container">
      <a-button block size="large" class="product-detail__button"
        >Add to Cart</a-button
      >
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class ProductDetail extends Vue {}
</script>

<style>
.product-detail{
  margin-bottom: 30px;
}
.product-detail__name {
  width: 100%;
  text-align: start;
  font-size: 1.25rem;
  font-weight: 500;
  margin-bottom: 0.75rem;
}
.product-detail__description {
  width: 100%;
  text-align: start;
  font-size: 1rem;
  font-weight: 400;
  margin-bottom: 1rem;
}
.product-detail__image {
  max-width: 250px;
  margin: auto;
}
.product-card__item-container {
  margin-bottom: 24px;
}
.item__detils {
  margin-left: 16px;
}
.item__name {
  font-size: 1rem;
}
.item__amount {
  font-size: 1.25rem;
}
.product-card__button-container {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
}
.product-detail__button {
  color: #ffffff;
  background-color: #666666;
  border:1px solid #666666;
  border-radius:0;
  height:48px;
}
@media only screen and (max-width: 599px) {
  .product-detail__name {
    margin-top: 1rem;
  }
}
</style>
