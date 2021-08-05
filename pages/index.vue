<template>
  <a-row type="flex" justify="center" align="middle">
    <a-alert
      v-if="alert.message"
      :message="alert.message"
      :description="alert.description"
      type="error"
      show-icon
    />
    <a-col>
      <div class="container">
        <img
          alt="logo"
          src="~/assets/images/logo/main-logo.svg"
        >
        <a-form
          :form="form"
          :hide-required-mark="true"
          @submit="handleSubmit"
        >
          <a-form-item label="ชื่อผู้ใช้ / อีเมล / เบอร์โทรศัพท์" class="username-form-item">
            <a-input
              v-decorator="['username', { rules: [{ required: true, message: 'กรุณากรอกชื่อผู้ใช้ / อีเมล / เบอร์โทรศัพท์' }] }]"
            >
              <a-icon slot="prefix" type="user" />
            </a-input>
          </a-form-item>
          <a-form-item label="รหัสผ่าน" class="password-form-item">
            <a-input
              v-decorator="['password', { rules: [{ required: true, message: 'กรุณากรอกรหัสผ่าน' }] }]"
              type="password"
              @keyup.enter="handleSubmit"
            >
              <a-icon slot="prefix" type="unlock" />
            </a-input>
          </a-form-item>
          <a-form-item>
            <primary-button html-type="submit" :text="'ลงชื่อเข้าใช้'" class="login-button" :on-click="handleSubmit" />
          </a-form-item>
        </a-form>
      </div>
    </a-col>
  </a-row>
</template>

<script lang="ts">
import Vue from 'vue'
import PrimaryButton from '~/components/procurement/buttons/PrimaryButton.vue'

export default Vue.extend({
  components: { PrimaryButton },
  layout: 'empty',
  middleware ({ store, redirect }) {
    if (store.state.auth.loggedIn) {
      redirect('/procurement')
    }
  },
  data () {
    return {
      form: this.$form.createForm(this),
      alert: {
        message: '',
        description: ''
      }
    }
  },
  methods: {
    async onLogin () : Promise<void> {
      await this.$auth.loginWith('local', {
        data: this.form.getFieldsValue()
      })
        .catch(() => {
          this.alert.message = 'ไม่สามารถเข้าสู่ระบบได้'
          this.alert.description = 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง'
        })
    },
    handleSubmit () : void {
      this.form.validateFields((err) => {
        if (!err) {
          this.onLogin()
        }
      })
    }
  }
})
</script>

<style lang="less">

.ant-form-explain {
  text-align: left
}

.ant-input {
  border-radius: 25px;
  height: 38px;
}

input#password.ant-input, input#username.ant-input {
  padding-left: 43px;
}

.ant-alert-with-description .ant-alert-icon {
  font-size: 16px;
}

.ant-alert-with-description .ant-alert-message {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 0;
}

.ant-alert-description {
  font-size: 18px;
}

</style>

<style scoped lang="less">

.container {
  width: 280px;
  text-align: center;
}

.login-button {
  width: 100%;
  height: 38px;
}

.ant-row-flex-middle {
  height: 100vh;
}

.password-form-item {
  margin: 0 0 24px 0;
  text-align: left;
}

.username-form-item {
  margin: 12px 0 12px 0;
  text-align: left;
}

img {
  margin-bottom: 16px;
}

.ant-alert {
  width: 90%;
  border-radius: 4px;
  margin: 16px;
  position: absolute;
  top: 0;
  max-width: 560px;
  padding: 10px 10px 10px 54px;
}

</style>
