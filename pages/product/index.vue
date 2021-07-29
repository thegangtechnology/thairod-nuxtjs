<template>
  <div class="container">
    <CardUserDetail :patient-detail="patient" />
    <a-row :gutter="[16, 16]">
      <a-col :span="24">
        <a-input-search placeholder="search for item" @search="onSearch" />
      </a-col>
    </a-row>
    <a-row :gutter="[16, 16]" type="flex" justify="space-between">
      <a-col
        v-for="(item, i) in 6"
        :key="i"
        :xs="12"
        :sm="12"
        :md="8"
        :lg="8"
        :xl="4"
      >
        <ProductCard />
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import CardUserDetail from '~/components/CardPatientDetail.vue'
import PatientModule from '~/store/patient.module'
import { Patient } from '~/types/patient.type'
import ProductCard from '~/components/product/ProductCard.vue'

export default Vue.extend({
  components: {
    CardUserDetail,
    ProductCard
  },
  layout: 'product-layout',
  data () {
    return {
      isSubmit: false
    }
  },
  computed: {
    patient (): Patient {
      return PatientModule.patient
    }
  },
  async mounted () {
    await PatientModule.getPatient({ id: 1 })
  },
  methods: {
    onSearch (value:string) : void {
      console.log('onSearch', value)
    }
  }
})
</script>

<style scoped></style>
