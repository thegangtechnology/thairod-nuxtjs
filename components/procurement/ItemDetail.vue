<template>
  <div class="container">
    <img
      alt="item-image"
      :src="imageMap[itemDetail.id]"
    >
    <a-row type="flex">
      <a-col :flex="10">
        <div class="card left-card">
          <div> จำนวนในคลัง </div>
          <strong>{{ itemStock.currentTotal }} {{ itemDetail.unit }}</strong>
          <a-divider />
          <div> ยอดรวมสะสม </div>
          <strong class="acc-amount">{{ itemStock.procured }} {{ itemDetail.unit }}</strong>
        </div>
        <a-button
          block
          class="card-button"
          :style="{backgroundColor: '#001740C6', border: 0, color: '#ffffff'}"
          @click="moreCurrentInventoryInfo"
          disabled=""
        >
          ดูรายละเอียดเพิ่มเติม
        </a-button>
      </a-col>
      <a-col :flex="3" />
      <a-col :flex="10">
        <div class="card right-card">
          <div> จำนวนที่ใช้วันนี้ </div>
          <strong>- {{ itemDetail.unit }}</strong>
          <a-divider />
          <div> ยอดใช้สะสม </div>
          <strong class="acc-amount">{{ itemStock.fulfilled }} {{ itemDetail.unit }}</strong>
        </div>
        <a-button
          block
          class="card-button"
          :style="{backgroundColor: '#aeaeae', border: 0, color: '#ffffff'}"
          @click="moreUsedInventoryInfo"
          disabled=""
        >
          ดูรายละเอียดเพิ่มเติม
        </a-button>
      </a-col>
    </a-row>
    <a-divider class="main-divider" />
    <div>
      <strong class="list-title"> รายละเอียดสินค้า </strong>
      <ul>
        <li v-for="item in itemDetail.productDescription.split('\n')" :key="item">
          {{ item }}
        </li>
      </ul>
      <p> {{ itemDetail.description }} </p>
    </div>
    <primary-button class="update-button" :text="'อัปเดตคลังสินค้า'" :on-click="updateInventory" />
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import PrimaryButton from '~/components/procurement/buttons/PrimaryButton.vue'
import { ItemDetail, Stock } from '~/types/procurement.type'
import { productImageMap } from '~/data/image-map'
import { defaultItemDetail, defaultStock } from '~/types/procurement.default'

export default Vue.extend({
  components: { PrimaryButton },
  props: {
    itemDetail: {
      type: Object as PropType<ItemDetail>,
      default: () => (defaultItemDetail)
    },
    itemStock: {
      type: Object as PropType<Stock>,
      default: () => (defaultStock)
    }
  },
  data () {
    return {
      imageMap: productImageMap
    }
  },
  computed: {},
  methods: {
    updateInventory () : void {
      this.$router.push({ path: '/procurement/update-inventory/', query: { id: this.$route.query.id } })
    },
    moreCurrentInventoryInfo () : void {
      this.$router.push({ path: '/procurement/current-inventory/', query: { id: this.$route.query.id } })
    },
    moreUsedInventoryInfo () : void {
      this.$router.push({ path: '/procurement/used-inventory/', query: { id: this.$route.query.id } })
    }
  }
})
</script>

<style scoped lang="less">

.container {
  padding: 18px;
}

img {
  display: block;
  width: 100%;
  margin-bottom: 18px;
  border-radius: 8px;
}

.update-button {
  height: 38px;
  width: 100%;
  margin-top: 24px;
}

.card {
  border-radius: 8px 8px 0 0;
  padding: 8px 20px;
  color: white;
  line-height: 22px;
  border-width: 0;
}

.left-card {
  background-color: #001740;
}

.right-card {
  background-color: #92959A;
}

.card > .ant-divider-horizontal {
  margin: 8px 0 5px 0;
  background-color: #ffffff;
}

.card > div {
  font-size: 16px;
}

.card > .acc-amount {
  font-size: 19px;
}

.card > b {
  font-size: 22px;
}

.card-button {
  border-width: 0;
  border-radius: 0 0 8px 8px;
  font-size: 16px;
  height: 36px;
}

.main-divider {
  margin: 18px 0;
}

.ant-avatar {
  border-radius: 4px;
  height: 40px;
  width: 40px;
}

ul {
  margin-bottom: 4px;
  padding-left: 18px;
}

</style>
