<script setup lang="ts">
defineOptions({
  name: 'TimeChunk',
})
defineProps(['startTime', 'endTime'])
</script>

<template>
  <!-- <div style="background-color: #ebf1f5;"> -->
    <span>06:00AM - 06:00PM</span>
    <!-- <el-icon style="margin-left: 5px;"><Close :color="`#d25a58`"/></el-icon> -->
  <!-- </div> -->
</template>

<style scoped>
  span {
    color: #4675a4;
    background-color: aquamarine;
    font-size: 0.5em;
  }
</style>
