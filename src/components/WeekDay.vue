<script setup lang="ts">
defineOptions({
  name: 'WeekDay',
})
defineProps(['dayname']);
import {ref} from 'vue'
let startTime = ref('')
let endTime = ref('')
</script>

<template>
  <div class="weekDay">
    <span>{{dayname}}</span>
    <div class="demo-time-range">
    <el-time-select
      v-model="startTime"
      style="width: 200px"
      start="00:00"
      step="00:15"
      end="23:59"
      format="hh:mm A"
    />
    <span style="color: #cbd5da; margin: 5px;">-</span>
    <el-time-select
      v-model="endTime"
      style="width: 200px"
      start="00:00"
      step="00:15"
      end="23:59"
      format="hh:mm A"
    />
    <el-button link style="color: #6e97ba; margin-left: 20px;">
      <el-icon :size="20"><CirclePlus /></el-icon>
      <span style="font-size: 1em;">Add New</span>
    </el-button>
  </div>
</div>
</template>

<style scoped>
  .weekDay {
    text-indent: 1.5em;
    border-bottom: 1px solid #cbd5da;
    display: flex;
    align-items: center;
    height: 60px;
  }
  .weekDay span {
    font-size: medium;
    font-weight: 500;
  }
</style>
