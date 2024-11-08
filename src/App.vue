<script setup lang="ts">
defineOptions({
  name: "App",
});
import { ref } from "vue";
import WeekDay from "./components/WeekDay.vue";
import Setting from "./components/Setting.vue";

let startDate = ref("");
let repeatNum = ref(2);
let week = ref([
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
]);
const handleChange = (value: number) => {
  console.log(value);
};
</script>

<template>
  <el-row>
    <el-col :span="12" style="background-color: antiquewhite;">
      <el-row><h3>Provider-end Schedule</h3></el-row>
      <el-row>
        <div style="display: flex">
          <div style="display: flex; flex-direction: column">
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
          <div style="display: flex; flex-direction: column; margin-left: 20px">
            <span class="demonstration">Repeat</span>
            <el-input-number
              v-model="repeatNum"
              :min="1"
              :max="10"
              @change="handleChange"
            />
          </div>
        </div>
      </el-row>
      <el-row style="margin-top: 20px">
        <div class="avaiSetText">Availability Setting</div>
        <div v-for="dayName in week">
          <WeekDay :dayname="dayName"></WeekDay>
        </div>
      </el-row>
    </el-col>
    <el-col :span="12">
      <div class="avaiSetText" style="margin-top: 160px;">Availability</div>
      <Setting :dayname="week[0]"></Setting>
      <el-button style="background-color: #173c64; color: #f0f0f0; margin-top: 380px; margin-left: 780px;">
          <span style="font-size: 1em;">Confirm</span>
      </el-button>
    </el-col>
  </el-row>
  <el-divider />
  <el-row>
    <el-row><h3>Patient-end Show</h3></el-row>
    <el-row>xxx</el-row>
  </el-row>
</template>

<style scoped>
.avaiSetText {
  border: 1px solid #cbd5da;
  background-color: #edeef0;
  text-indent: 1.5em;
  vertical-align: middle;
  height: 1.5em;
  width: 860px;
}
</style>
