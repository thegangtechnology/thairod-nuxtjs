<template>
  <div>
    <ProcurementHeader :title="headerTitle" :on-back-button-click="onBackButtonClick" />
    <a-row type="flex" justify="center">
      <a-col :xs="24" :sm="24" :md="20" :lg="12">
        <ItemDetail />
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ProcurementHeader from '~/components/procurement/ProcurementHeader.vue'
import ItemDetail from '~/components/procurement/ItemDetail.vue'

export default Vue.extend({
  components: { ProcurementHeader, ItemDetail },
  props: {
    headerTitle: { type: String, default: 'กล่องสีเขียว' }
  },
  methods: {
    onBackButtonClick () : void {
      console.log('back')
    }
  }
})
</script>

<style scoped>
</style>
