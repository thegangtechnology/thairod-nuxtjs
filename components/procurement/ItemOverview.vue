<template>
  <a-col :xs="{span: 12}" :sm="{span: 8}" :lg="{span: 4}">
    <a-card>
      <img
        slot="cover"
        alt="item-image"
        :src="imageMap[item.id]"
      >
      <div class="title">
        {{ item.name }}
      </div>
      <div class="label">
        จำนวนในคลัง
      </div>
      <div><strong>{{ item.stock ? item.stock : '-' }} {{ item.unit }}</strong></div>
      <div class="label last-update-label">
        อัปเดตเมื่อ
      </div>
      <div class="last-update">
        {{ formatDate(item.updatedDate) }}
      </div>
      <secondary-button :text="'ดูรายละเอียด'" :on-click="toItemDetail" />
    </a-card>
  </a-col>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import SecondaryButton from '~/components/procurement/buttons/SecondaryButton.vue'
import { ItemOverviewInfo } from '~/types/procurement.type'
import { productImageMap } from '~/data/image-map'
import { defaultItemOverviewInfo } from '~/types/procurement.default'

export default Vue.extend({
  components: { SecondaryButton },
  props: {
    item: {
      type: Object as PropType<ItemOverviewInfo>,
      default: () => (defaultItemOverviewInfo)
    }
  },
  data () {
    return {
      imageMap: productImageMap
    }
  },
  methods: {
    toItemDetail () : void {
      this.$router.push({ path: '/procurement/item-detail', query: { id: this.item.id.toString() } })
    },
    formatDate (date: string) : string {
      return new Date(date).toLocaleString('th', { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' })
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
  overflow-wrap: break-word;
}

.last-update {
  font-size: 14px;
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
