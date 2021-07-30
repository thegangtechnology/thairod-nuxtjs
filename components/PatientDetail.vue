<template>
  <div>
    <a-row :gutter="16">
      <a-col :span="24">
        <div class="carts-detail__title">
          ข้อมูลผู้รับการรักษา
        </div>
      </a-col>
      <a-col :span="24" class="mb-4">
        <div class="carts-detail__subtitle">
          ชื่อผู้รับการรักษา
        </div>
        <div class="carts-detail__data">
          นางสาวภัณฑิรา พัชรกิตติกุล
        </div>
      </a-col>
       <a-col :span="24">
        <div class="carts-detail__subtitle">
          รหัสประจำประชาชน
        </div>
        <div class="carts-detail__data">
          8-8888-88888-88-8
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<style>
.carts-detail__title{
  color: #000000;
  font-size: 1.25rem;
  font-weight: 500;
  margin-bottom:20px;
}

.carts-detail__subtitle{
  font-size: 1rem;
  color: #808080;
  margin-bottom: 4px;
}
.carts-detail__data{
  font-size: 1rem;
  color: #000000;
}
</style>


