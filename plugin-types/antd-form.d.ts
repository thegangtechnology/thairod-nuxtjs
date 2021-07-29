// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Vue from 'vue'
import { Form } from 'ant-design-vue'

declare module 'vue/types/vue' {
  // 3. Declare augmentation for Vue
  interface Vue {
    $form: Form
  }
}
