<template>
  <div>
    <h4>Package Name</h4>
    <img :src="require('~/assets/images/mockup/default-img.svg')" width="160"/>

    <a-row type="flex" justify="space-between" class="item-wrapper">
      <a-col v-for="(item, itemIndex) in items" :key="itemIndex" span="11">
        <a-row>
          <a-col span="11">
            <img :src="require('~/assets/images/mockup/default-img.svg')" width="40"/>
          </a-col>
          <a-col span="11">
            <h5>{{ item.name }}</h5>
            <p>{{ item.total }}</p>
          </a-col>
        </a-row>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    items: {
      type: Array,
      default: () => []
    }
  }
})
</script>

<style>
.item-wrapper .ant-col {
  margin: 8px 0 0 0;
}

.item-wrapper p {
  margin: 0;
}
</style>
