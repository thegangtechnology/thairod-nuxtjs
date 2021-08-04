<template>
  <div class="centered">
    <img :src="require('@/assets/images/error-page.svg')" alt="Error image">
    <h1 v-if="error.statusCode === 404">
      {{ pageNotFound }}
    </h1>
    <h1 v-else>
      {{ otherError }}
    </h1>
    <div class="detail__text">
      กรุณาตรวจสอบ URL อีกครั้ง หรือกดปุ่มด้านล่างเพื่อ <br>
      ย้อนกลับไปที่หน้าก่อนหน้า
    </div>
    <primary-button :text="'ย้อนกลับ'" :on-click="goBack" />
  </div>
</template>

<script>
import PrimaryButton from '~/components/procurement/buttons/PrimaryButton.vue'

export default {
  components: { PrimaryButton },
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      pageNotFound: 'ขออภัย ไม่พบหน้าที่คุณต้องการ',
      otherError: 'ขออภัย เกิดข้อผิดพลาด'
    }
  },
  head () {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
h1 {
  font-size: 24px;
  font-weight: bold;
}
.centered{
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding:0 30px;
}
.detail__text{
  text-align: center;
  line-height: normal;
  font-size: 16px;
}
</style>
