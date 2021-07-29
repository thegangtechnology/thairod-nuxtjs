<template>
  <div class="overview-container">
    <a-row type="flex" class="ant-row-flex-no-wrap" :gutter="[16, 16]">
      <a-col flex="80px">Name : </a-col>
      <a-col flex="auto">
        <strong>{{ patientDetail.fullName }}</strong>
      </a-col>
    </a-row>
    <a-row type="flex" class="ant-row-flex-no-wrap" :gutter="[16, 16]">
      <a-col flex="80px">Phone : </a-col>
      <a-col flex="auto">
        <strong>{{ patientDetail.phone }}</strong>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { Patient } from '@/types/patient.type'

@Component
export default class OverviewTable extends Vue {
  @Prop({
    default: Object
  })
  private readonly patientDetail!: Patient
}
</script>
