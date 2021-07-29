<template>
  <div class="container">
    <img
      alt="item-image"
      src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
    >
    <a-row type="flex">
      <a-col :flex="10">
        <div class="card left-card">
          <div> จำนวนในคลัง </div>
          <b>{{ inventoryRecord.currentAmount }} {{ inventoryRecord.unit }}</b>
          <a-divider />
          <div> ยอดรวมสะสม </div>
          <b class="acc-amount">{{ inventoryRecord.accumulativeAmount }} {{ inventoryRecord.unit }}</b>
        </div>
        <a-button
          block
          class="card-button"
          :style="{backgroundColor: '#ffcdcd', border: 0, color: '#454545'}"
          @click="moreCurrentInventoryInfo"
        >
          ดูรายละเอียดเพิ่มเติม
        </a-button>
      </a-col>
      <a-col :flex="3" />
      <a-col :flex="10">
        <div class="card right-card">
          <div> จำนวนที่ใช้วันนี้ </div>
          <b>{{ inventoryRecord.usedAmount }} {{ inventoryRecord.unit }}</b>
          <a-divider />
          <div> ยอดใช้สะสม </div>
          <b class="acc-amount">{{ inventoryRecord.accumulativeUsed }} {{ inventoryRecord.unit }}</b>
        </div>
        <a-button
          block
          class="card-button"
          :style="{backgroundColor: '#aeaeae', border: 0, color: '#454545'}"
          @click="moreUsedInventoryInfo"
        >
          ดูรายละเอียดเพิ่มเติม
        </a-button>
      </a-col>
    </a-row>
    <a-divider class="main-divider" />
    <div>
      <b class="list-title"> รายละเอียดสินค้า </b>
      <a-list :data-source="itemList" class="list-items">
        <a-list-item slot="renderItem" slot-scope="{name, quantity, unit}">
          <a-list-item-meta
            :description="quantity + ' ' + unit"
          >
            <a slot="title">{{ name }}</a>
            <a-avatar
              slot="avatar"
              src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            />
          </a-list-item-meta>
        </a-list-item>
      </a-list>
    </div>
    <primary-button class="update-button" :text="'อัปเดตคลังสินค้า'" :on-click="updateInventory" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import PrimaryButton from '~/components/procurement/buttons/PrimaryButton.vue'

export default Vue.extend({
  components: { PrimaryButton },
  props: {},
  data () {
    return {
      inventoryRecord: { currentAmount: 100, accumulativeAmount: 800, usedAmount: 100, accumulativeUsed: 800, unit: 'กล่อง' },
      itemList: [
        { name: 'ยา Favipiravir', quantity: 1, unit: 'กล่อง' },
        { name: 'อาหาร', quantity: 1, unit: 'กล่อง' },
        { name: 'เครื่องวัดค่าออกซิเจน', quantity: 1, unit: 'เครื่อง' }
      ]
    }
  },
  computed: {},
  methods: {
    updateInventory () : void {
      console.log('to update inventory view')
    },
    moreCurrentInventoryInfo () : void {
      console.log('to current inventory view')
    },
    moreUsedInventoryInfo () : void {
      console.log('to used inventory view')
    }
  }
})
</script>

<style scoped lang="less">

.list-title {
  font-weight: bolder;
  color: black;
}

.container {
  padding: 18px;
}

img {
  display: block;
  width: 100%;
  padding-bottom: 18px;
}

.update-button {
  height: 38px;
  width: 100%;
  margin-top: 24px;
}

.card {
  border-radius: 8px 8px 0 0;
  padding: 8px 20px;
  color: #454545;
  line-height: 22px;
  border-width: 0;
}

.left-card {
  background-color: @primary-color;
}

.right-card {
  background-color: #969696;
}

.card > .ant-divider-horizontal {
  margin: 8px 0 5px 0;
  background-color: #454545;
}

.card > div {
  font-size: 16px;
}

.card > .acc-amount {
  font-size: 20px;
}

.card > b {
  font-size: 23px;
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

.ant-list-item-meta-description {
  color: #000000;
  font-weight: bolder;
  line-height: 10px;
  font-size: 18px;
}

</style>
