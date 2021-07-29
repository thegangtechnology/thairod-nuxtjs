<template>
  <div>
    <a-row :gutter="16">
      <a-col :span="24">
        <div class="carts-detail__title">
          ข้อมูลผู้ตรวจ
        </div>
      </a-col>
      <a-col :span="24" class="mb-4">
        <div class="carts-detail__subtitle">
          ชื่อผู้ตรวจ
        </div>
        <div class="carts-detail__data">
          พญ. กวินทิรา เลิศพรสุขจิต
        </div>
      </a-col>
      <a-col :span="24">
        <div class="carts-detail__subtitle">
          ใบอนุญาตเลขที่
        </div>
        <div class="carts-detail__data">
          88888888888
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<style>
.carts-detail__title {
  color: #000000;
  font-size: 1.25rem;
  font-weight: 500;
  margin-bottom: 20px;
}

.carts-detail__subtitle {
  font-size: 1rem;
  color: #808080;
  margin-bottom: 4px;
}
.carts-detail__data {
  font-size: 1rem;
  color: #000000;
}
</style>
