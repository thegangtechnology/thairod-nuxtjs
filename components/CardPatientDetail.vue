<template>
  <div class='overview-container'>
    <a-row type='flex' class='ant-row-flex-no-wrap' :gutter='[16, 16]'>
      <a-col :span='24'>
        <div class='text-title--patient'>
          รายละเอียดผู้รับการรักษา
        </div>
      </a-col>
    </a-row>
    <a-row type='flex' class='ant-row-flex-no-wrap' :gutter='[8, 0]'>
      <!--      <a-col flex="80px">Name : </a-col>-->
      <a-col :md='12' :xs='12'>
        <strong class='name--text'>{{ patientDetail.name }}</strong>
      </a-col>
      <a-col :md='12' :xs='12'>
        <div class='card-number--text'>
          {{ patientDetail.cid }}
        </div>
      </a-col>
    </a-row>

    <!--    <a-row type="flex" class="ant-row-flex-no-wrap" :gutter="[16, 16]">-->
    <!--      <a-col flex="80px">-->
    <!--        Phone :-->
    <!--      </a-col>-->
    <!--      <a-col flex="auto">-->
    <!--        <strong>{{ patientDetail.phone }}</strong>-->
    <!--      </a-col>-->
    <!--    </a-row>-->
  </div>
</template>

<script lang='ts'>
import Vue, { PropType } from 'vue'
import { Patient } from '@/types/patient.type'

export default Vue.extend({
  props: {
    patientDetail: {
      type: Object as PropType<Patient>,
      default: () => {
      }
    }
  }
})
// @Component
// export default class OverviewTable extends Vue {
//   @Prop({
//     default: Object
//   })
//   private readonly patientDetail!: Patient
// }
</script>

<style lang='less'>
.name--text {
  font-size: 18px;
  color: #404040;
}

.text-title--patient {
  font-size: 16px;
  color: #909090;
  line-height: normal;
}

.card-number--text {
  font-size: 16px;
  color: #404040;
  text-align: right;
}
</style>
