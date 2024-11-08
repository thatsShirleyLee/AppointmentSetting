<script setup lang="ts">
defineOptions({
  name: 'Setting',
})
defineProps(['dayname']);
import TimeChunk from './TimeChunk.vue';
</script>

<template>
  <div class="weekDay">
    <span style="width: 160px;">{{dayname}}</span>
    <TimeChunk :startTime="`06:00AM`" :endTime="`06:00PM`"></TimeChunk>
  </div>
</template>

<style scoped>
  .weekDay {
    text-indent: 1.5em;
    border-bottom: 1px solid #cbd5da;
    border-right: 1px solid #cbd5da;
    border-left: 1px solid #cbd5da;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: 60px;
    width: 860px;
  }
  .weekDay span {
    font-size: 0.8em;
    font-weight: 500;
  }
</style>
