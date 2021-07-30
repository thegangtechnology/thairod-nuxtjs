<template>
  <div class="modal-container">
    <img
      alt="modal-image"
      src="~/assets/images/procurement/icon/modal-image.svg"
    ><br>
    <b class="title">ยืนยันการอัปเดตสินค้า</b><br>
    <p>
      กล่องสินค้า <span>{{ formData.quantity ? formData.quantity.toLocaleString(): '' }} กล่อง</span><br>
      ราคาทุน <span>{{ formData.cost || formData.cost === 0 ? formData.cost.toLocaleString(): '' }} บาท</span><br>
      คลังสินค้า <span>{{ formData.warehouse }}</span>
    </p>
    <div>
      <secondary-button :text="'ยกเลิก'" :on-click="closeModal" />
      <div class="divider" />
      <primary-button :text="'ยืนยัน'" :on-click="handleSubmit" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { UpdateInventoryFormData } from '~/types/procurement.type'
import PrimaryButton from '~/components/procurement/buttons/PrimaryButton.vue'
import SecondaryButton from '~/components/procurement/buttons/SecondaryButton.vue'

export default Vue.extend(
  {
    components: { PrimaryButton, SecondaryButton },
    props: {
      closeModal: { type: Function, default: () => {} },
      handleSubmit: { type: Function, default: () => {} },
      formData: {
        type: Object as PropType<UpdateInventoryFormData>,
        default: () => ({})
      }
    }
  }
)
</script>

<style scoped lang="less">

.modal-container {
  text-align: center;
  padding: 24px 0;
}

.title {
  line-height: 50px;
}

button {
  width: 100%;
}

.button-group {
  padding: 16px;
}

.divider {
  margin: 20px;
}

.ant-btn {
  height: 38px;
}

p > span {
  font-weight: bolder;
}

</style>
