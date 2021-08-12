<template>
  <div>
    <procurement-header :title="'อัปเดตคลังสินค้า'" :on-back-button-click="onBackButtonClick" />
    <a-row type="flex" justify="center">
      <a-col :xs="24" :sm="24" :md="20" :lg="12">
        <update-inventory-form :submit-form="submitForm" :warehouse-list="warehouseList" />
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import UpdateInventoryForm from '~/components/procurement/UpdateInventoryForm.vue'
import ProcurementHeader from '~/components/procurement/headers/ProcurementHeader.vue'
import { UpdateInventoryFormData, Warehouse } from '~/types/procurement/procurement.type'
import ProcurementModule from '~/store/procurement.module'
import { updateProcurement } from '~/services/procurement.service'
import { UpdateProcurementBody } from '~/types/procurement/procurement-service.type'

export default Vue.extend(
  {
    components: { UpdateInventoryForm, ProcurementHeader },
    layout: 'empty',
    data () {
      return {
      }
    },
    computed: {
      warehouseList () : Warehouse[] {
        return ProcurementModule.warehouseList
      }
    },
    async mounted () {
      await ProcurementModule.getWarehouseList()
    },
    methods: {
      onBackButtonClick () : void {
        this.$router.push({ path: '/procurement/item-detail/', query: { id: this.$route.query.id } })
      },
      async submitForm (formData: UpdateInventoryFormData) : Promise<void> {
        const body : UpdateProcurementBody = {
          quantity: formData.quantity,
          unitPrice: formData.unitPrice,
          warehouse: this.warehouseList[formData.warehouse].id,
          productVariation: parseInt(this.$route.query.id.toString())
        }
        await updateProcurement(body)
      }
    }
  }
)
</script>
