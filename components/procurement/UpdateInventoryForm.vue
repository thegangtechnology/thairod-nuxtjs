<template>
  <div>
    <div class="container">
      <img
        alt="item-image"
        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
      >
      <a-form
        :form="form"
        :wrapper-col="{ span: 24 }"
        :hide-required-mark="true"
        @submit="handleSubmit"
      >
        <a-form-item label="จำนวนที่เข้ามาใหม่">
          <a-input-number
            v-decorator="['quantity', { rules: [{ required: true, message: 'กรุณาระบุจำนวนที่เข้ามาใหม่' }] }]"
            :precision="0"
            :min="1"
            :step="100"
          />
        </a-form-item>
        <a-form-item label="ราคาทุน">
          <a-input-number
            v-decorator="['cost', { rules: [{ required: true, message: 'กรุณาระบุราคาทุน' }] }]"
            :precision="0"
            :min="0"
            :step="100"
          />
        </a-form-item>
        <a-form-item label="คลังสินค้า">
          <a-select
            v-decorator="[
              'warehouse',
              { rules: [{ required: true, message: 'กรุณาระบุคลังสินค้า' }] },
            ]"
            class="select"
          >
            <a-select-option v-for="warehouse in warehouses" :key="warehouse">
              {{ warehouse }}
            </a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
      <a-row type="flex" class="button-group">
        <a-col :span="12">
          <secondary-button :text="'ยกเลิก'" :on-click="closeModal" />
        </a-col>
        <a-col :span="12">
          <primary-button :text="'ยืนยัน'" :on-click="showModal" />
        </a-col>
      </a-row>
    </div>
    <a-modal
      class="modal"
      :visible="modal.visible"
      :confirm-loading="modal.confirmLoading"
      :footer="null"
      :style="{width: '130px'}"
      @cancel="closeModal"
    >
      <ConfirmModalContent :close-modal="closeModal" :handle-submit="handleSubmit" :form-data="form.getFieldsValue()" />
    </a-modal>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ConfirmModalContent from '~/components/procurement/ConfirmModalContent.vue'
import PrimaryButton from '~/components/procurement/buttons/PrimaryButton.vue'
import SecondaryButton from '~/components/procurement/buttons/SecondaryButton.vue'

export default Vue.extend({
  components: { ConfirmModalContent, PrimaryButton, SecondaryButton },
  data () {
    return {
      form: this.$form.createForm(this),
      modal: {
        visible: false,
        confirmLoading: false
      },
      warehouses: ['Warehouse A', 'Warehouse B', 'คลังสินค้า C']
    }
  },
  methods: {
    showModal () {
      console.log(this.form.getFieldsValue())
      this.form.validateFields((err) => {
        if (!err) {
          this.modal.visible = true
        }
      })
    },
    closeModal () {
      this.modal.visible = false
    },
    handleSubmit () {
      // this.modal.confirmLoading = true
      // console.log('form submitted')
      // this.modal.confirmLoading = false
      this.closeModal()
      this.form.resetFields()
    },
    onCancel (): void {
      this.form.resetFields()
      console.log('back')
    }
  }
}
)
</script>

<style scoped lang="less">

.container {
  padding: 18px 24px 0 24px;
}

img {
  display: block;
  width: 100%;
  margin-bottom: 18px;
  border-radius: 6px;
}

.ant-input-number {
  width: 100%;
}

.ant-card {
  max-height: 100vh;
  padding: 18px;
}

.ant-card-actions {
  background-color: #ffffff;
}

button {
  width: 95%;
}

.ant-btn {
  height: 38px;
}

.button-group {
  margin-top: 5vh;
}

</style>
