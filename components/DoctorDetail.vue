<template>
  <div>
    <a-row :gutter="8">
      <a-col :span="6">
        <img
          alt="Docter icon"
          :src="require('@/assets/images/docter-female.svg')"
          class="img-responsive image__icon"
        >
      </a-col>
      <a-col :span="18">
        <div class="name__text">
          พญ. กวินทิรา เลิศพรสุขจิต
        </div>
        <div class="detail__text">
          ใบอนุญาตเลขที่ 88888888888
        </div>
      </a-col>
    </a-row>
    <!--    <a-row :gutter="16">-->
    <!--      <a-col :span="24">-->
    <!--        <div class="carts-detail__title">-->
    <!--          ข้อมูลผู้ตรวจ-->
    <!--        </div>-->
    <!--      </a-col>-->
    <!--      <a-col :span="24" class="mb-4">-->
    <!--        <div class="carts-detail__subtitle">-->
    <!--          ชื่อผู้ตรวจ-->
    <!--        </div>-->
    <!--        <div class="carts-detail__data">-->
    <!--          พญ. กวินทิรา เลิศพรสุขจิต-->
    <!--        </div>-->
    <!--      </a-col>-->
    <!--      <a-col :span="24">-->
    <!--        <div class="carts-detail__subtitle">-->
    <!--          ใบอนุญาตเลขที่-->
    <!--        </div>-->
    <!--        <div class="carts-detail__data">-->
    <!--          88888888888-->
    <!--        </div>-->
    <!--      </a-col>-->
    <!--    </a-row>-->
  </div>
</template>

<style>
.carts-detail__title {
  color: #000000;
  font-size: 1.25rem;
  font-weight: 500;
  margin-bottom: 20px;
}
.image__icon{
  height:70px;
}
.detail__text {
  font-size: 20px;
  color: #3C3C3C;
  margin-bottom: 4px;
}
.name__text {
  font-size: 24px;
  color: #000000;
}
</style>
