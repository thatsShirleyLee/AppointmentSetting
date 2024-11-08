<script setup lang="ts">
defineOptions({
  name: 'App',
})
import {ref} from 'vue'
import WeekDay from './components/WeekDay.vue';

let startDate = ref('');
let repeatNum = ref(2);
let week = ref(['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']);
const handleChange = (value: number) => {
  console.log(value)
}
</script>

<template>
  <el-row><h3>Provider-end Schedule</h3></el-row>
  <el-row>
    <div style="display: flex;">
      <div style="display: flex; flex-direction: column;">
        <span class="demonstration">Start Date</span>
        <div class="demo-date-picker">
          <div class="block">
            <el-date-picker
              v-model="startDate"
              format="MM/DD/YYYY"
              value-format="MM/DD/YYYY"
              type="date"
              placeholder="Pick a day"
            />
          </div>
        </div>
      </div>
      <div style="display: flex; flex-direction: column; margin-left: 20px;">
        <span class="demonstration">Repeat</span>
        <el-input-number v-model="repeatNum" :min="1" :max="10" @change="handleChange" /> 
      </div>
    </div>
  </el-row>
  <el-row style="margin-top: 20px;">
    <el-col :span="12">
      <div v-for="dayName in week" style="border: 1px solid #cbd5da; height: 400px; width: 80%;">
        <div style="background-color: #edeef0; border-bottom: 1px solid #cbd5da; text-indent: 1.5em">Availability Setting</div>
        <WeekDay :dayname="dayName"></WeekDay>
      </div>
    </el-col>
    <el-col :span="12">
      xxx
    </el-col>
  </el-row>
  <el-divider />
  <el-row><h3>Patient-end Show</h3></el-row>
  <el-row>
    <el-col :span="24">
      xxx
    </el-col>
  </el-row>
</template>

<style scoped>
</style>
