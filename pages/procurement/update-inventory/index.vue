<template>
  <div>
    <procurement-header :title="'อัปเดตคลังสินค้า'" :on-back-button-click="onBackButtonClick" />
    <a-row type="flex" justify="center">
      <a-col :xs="24" :sm="24" :md="20" :lg="12">
        <update-inventory-form :submit-form="submitForm" />
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import UpdateInventoryForm from '~/components/procurement/UpdateInventoryForm.vue'
import ProcurementHeader from '~/components/procurement/headers/ProcurementHeader.vue'
import { UpdateInventoryFormData } from '~/types/procurement.type'

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
      },
      submitForm (formData: UpdateInventoryFormData) : void {
        console.log(formData)
      }
    }
  }
)
</script>

<style scoped lang="less">

</style>
