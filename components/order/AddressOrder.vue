<template>
  <div>
    <a-row type="flex" justify="space-between" class="address-wrapper">
      <a-col span="8">Name:</a-col>
      <a-col span="16" class="value-detail">First Last</a-col>

      <a-col span="8">Phone:</a-col>
      <a-col span="16" class="value-detail">0893339223</a-col>

      <a-col span="8">Address:</a-col>
      <a-col span="16" class="value-detail">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
      </a-col>

      <a-col span="8">Optional:</a-col>
      <a-col span="16" class="value-detail">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo numquam optio voluptatum?
        Autem dolore laboriosam magni maiores natus, non numquam pariatur qui ratione, ullam unde veritatis. Commodi
        nesciunt nisi provident!
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {}
})
</script>

<style>
.address-wrapper .ant-col {
  margin: 8px 0 0 0;
}

.value-detail {
  font-weight: bold;
}
</style>
