<template>
  <div>
    <procurement-header :title="'อัปเดตคลังสินค้า'" :on-back-button-click="onBackButtonClick" />
    <a-row type="flex" justify="center">
      <a-col :xs="24" :sm="24" :md="20" :lg="12">
        <update-inventory-form />
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import UpdateInventoryForm from '~/components/procurement/UpdateInventoryForm.vue'
import ProcurementHeader from '~/components/procurement/headers/ProcurementHeader.vue'

export default Vue.extend(
  {
    components: { UpdateInventoryForm, ProcurementHeader },
    layout: 'empty',
    data () {
      return {
      }
    },
    methods: {
      onBackButtonClick () : void {
        this.$router.push('/procurement/item-detail')
      }
    }
  }
)
</script>

<style scoped lang="less">

</style>
