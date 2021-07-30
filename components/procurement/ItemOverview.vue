<template>
  <a-col :xs="{span: 12}" :sm="{span: 8}" :lg="{span: 4}">
    <a-card>
      <img
        slot="cover"
        alt="item-image"
        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
      >
      <div class="title">
        {{ item.name }}
      </div>
      <div class="label">
        จำนวนในคลัง
      </div>
      <div><b>{{ item.stock }} {{ item.unit }}</b></div>
      <div class="label last-update-label">
        อัพปเดตเมื่อ
      </div>
      <div class="last-update">
        {{ item.lastUpdate }}
      </div>
      <secondary-button :text="'ดูรายละเอียด'" :on-click="toItemDetail" />
    </a-card>
  </a-col>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import SecondaryButton from '~/components/procurement/buttons/SecondaryButton.vue'
import { ItemOverViewInfo } from '~/types/procurement.type'

export default Vue.extend({
  components: { SecondaryButton },
  props: {
    item: {
      type: Object as PropType<ItemOverViewInfo>,
      default: () => ({})
    }
  },
  data () {
    return {}
  },
  methods: {
    toItemDetail () {
      this.$router.push('/procurement/item-detail')
    }
  }
})
</script>

<style>
.ant-card-body {
  padding-top: 0;
  padding-bottom: 12px;
}
</style>

<style scoped>

.ant-card {
  font-size: 16px;
  color: black;
  border-radius: 8px;
  min-width: 150px;
}

button {
  margin-top: 6px;
  width: 100%;
}

.title {
  padding: 12px 0 4px 0;
  font-weight: bold;
  font-size: 20px;
}

.last-update {
  font-size: 12px;
  font-weight: bold;
}

.last-update-label {
  margin-bottom: 1px;
}

.label {
  font-size: 14px;
  height: 16px;
}

.ant-col.ant-col-xs-12 {
  padding: 8px 4px 0 4px;
}

img {
  padding: 10px 10px 0;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
}

</style>
