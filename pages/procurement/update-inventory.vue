<template>
  <div>
    <ProcurementHeader :title="'อัปเดตคลังสินค้า'" :on-back-button-click="onBackButtonClick" />
    <a-row type="flex" justify="center">
      <a-col :xs="24" :sm="24" :md="20" :lg="12">
        <UpdateInventoryForm />
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import UpdateInventoryForm from '~/components/procurement/UpdateInventoryForm.vue'
import ProcurementHeader from '~/components/procurement/ProcurementHeader.vue'

export default Vue.extend(
  {
    components: { UpdateInventoryForm, ProcurementHeader },
    data () {
      return {
      }
    },
    methods: {
      onBackButtonClick () : void {
        console.log('back')
      }
    }
  }
)
</script>

<style scoped lang="less">

</style>
