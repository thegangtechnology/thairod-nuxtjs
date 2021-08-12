<template>
  <div id="update-inventory-form">
    <div class="container">
      <img
        alt="item-image"
        :src="imageMap[$route.query.id]"
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
            :step="10"
            :style="{ height: '38px' }"
          />
        </a-form-item>
        <a-form-item label="ราคาทุน">
          <a-input-number
            v-decorator="['unitPrice', { rules: [{ required: true, message: 'กรุณาระบุราคาทุน' }] }]"
            :precision="2"
            :min="0"
            :step="10"
            :style="{ height: '38px' }"
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
            <a-select-option v-for="(warehouse, index) in warehouseList" :key="index">
              {{ warehouse.name }}
            </a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
      <a-row type="flex" class="button-group">
        <a-col :span="12">
          <secondary-button :text="'ยกเลิก'" :on-click="onCancel" />
        </a-col>
        <a-col :span="12">
          <primary-button :text="'ยืนยัน'" :on-click="showModal" />
        </a-col>
      </a-row>
    </div>
    <a-modal
      id="update-inventory-modal"
      :visible="modal.visible"
      :confirm-loading="modal.confirmLoading"
      :footer="null"
      :style="{width: '130px'}"
      @cancel="closeModal"
    >
      <confirm-modal-content :close-modal="closeModal" :handle-submit="handleSubmit" :form-data="form.getFieldsValue()" :warehouse-list="warehouseList" />
    </a-modal>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import ConfirmModalContent from '~/components/procurement/ConfirmModalContent.vue'
import PrimaryButton from '~/components/procurement/buttons/PrimaryButton.vue'
import SecondaryButton from '~/components/procurement/buttons/SecondaryButton.vue'
import { Warehouse } from '~/types/procurement/procurement.type'
import { productImageMap } from '~/data/image-map'

export default Vue.extend({
  components: { ConfirmModalContent, PrimaryButton, SecondaryButton },
  props: {
    submitForm: {
      type: Function,
      default: () => {
        return () => {
          // empty
        }
      }
    },
    warehouseList: {
      type: [] as PropType<Warehouse[]>,
      default: () => ([] as Warehouse[])
    }
  },
  data () {
    return {
      form: this.$form.createForm(this),
      modal: {
        visible: false,
        confirmLoading: false
      },
      imageMap: productImageMap
    }
  },
  methods: {
    showModal () : void {
      this.form.validateFields((err) => {
        if (!err) {
          this.modal.visible = true
        }
      })
    },
    closeModal () : void {
      this.modal.visible = false
    },
    async handleSubmit () : Promise<void> {
      this.modal.confirmLoading = true
      await this.submitForm(this.form.getFieldsValue())
        .then(() => {
          this.modal.confirmLoading = false
          this.closeModal()
          this.$router.push({ path: '/procurement/item-detail/', query: { id: this.$route.query.id } })
        })
    },
    onCancel (): void {
      this.form.resetFields()
      this.$router.push({ path: '/procurement/item-detail/', query: { id: this.$route.query.id } })
    }
  }
}
)
</script>

<style lang="less">
#update-inventory-form .ant-select-selection {
  border-radius: 25px;
  height: 38px;
  padding-top: 4px;
  font-size: 20px !important;
}

#update-inventory-form .ant-input-number-handler-wrap {
  background-color: transparent;
}

#update-inventory-modal .ant-modal{
  max-width: 80vw;
}

#unitPrice.ant-input-number-input, #quantity.ant-input-number-input {
  height: 38px;
  font-size: 20px !important;
  padding-bottom: 2px;
}
</style>

<style scoped lang="less">

.container {
  padding: 18px 24px 0 24px;
}

img {
  display: block;
  width: 100%;
  margin-bottom: 18px;
  border-radius: 8px;
}

.ant-input-number {
  width: 100%;
  border-radius: 25px;
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
