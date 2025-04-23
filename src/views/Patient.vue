<script setup lang="ts">
defineOptions({
  name: 'Patient',
})
import { onMounted, ref } from "vue";
import dayjs from 'dayjs'
import { usePatientStore } from "../store/modules/patient";
const patientStore = usePatientStore();
onMounted(() => {
  patientStore.generateAvailableDates();
})
const disabledDate = (time: Date) => {
    const dateStr = dayjs(time).format("YYYY/MM/DD");
    return !patientStore.dateList.includes(dateStr);
}
const selectedBlockId = ref<string>('');
// 仅用于点击选择
const saveBlockId = (id: string) => {
  const timeBlock = patientStore.dateWithTimeBlocks[patientStore.selectDate]?.find(b => b.id === id);
  if (!timeBlock || timeBlock.booked) return;
  selectedBlockId.value = id;
};
// 预约函数
const confirmBooking = () => {
  if (!selectedBlockId.value) return;
  patientStore.bookTime(patientStore.selectDate, selectedBlockId.value);
  selectedBlockId.value = ""; // 清除状态
};
</script>

<template>
  <!-- 病人端展示可预约时间 -->
  <el-row>
    <el-row style="width: 100%; margin-top: 10px;">
      <el-col :span="10">
        <el-row>
          <span class="demonstration">Select Date</span>
        </el-row>
        <el-row>
          <div class="demo-date-picker">
            <div class="block">
              <el-date-picker
                v-model=" patientStore.selectDate"
                format="YYYY/MM/DD"
                value-format="YYYY/MM/DD"
                type="date"
                placeholder="Pick a day"
                :disabled-date="disabledDate"
              />
            </div>
          </div>
        </el-row>
      </el-col>
    </el-row>
    <!-- Select Date -->
    <el-row style="width: 100%; margin-top: 10px;">
      <span class="demonstration">Availability</span>
    </el-row>
    <!-- Availability -->
    <el-row class="time-container">
      <span
        class="time-block"
        v-for="item in patientStore.dateWithTimeBlocks[patientStore.selectDate]"
        :key="item.id"
        :disabled="item.booked"
        :class="{ booked: item.booked, selected: selectedBlockId === item.id }"
        @click="saveBlockId(item.id)"
      >
        {{item.time}}
      </span>
    </el-row>
    <!-- Patient Confirm -->
    <el-row style="width: 100%;">
      <el-button
        style="background-color: #173c64; color: #f0f0f0; margin-left: 90%; margin-top: 2%;"
        @click="confirmBooking"
      >
        <span style="font-size: 1em;">Confirm</span>
      </el-button>
    </el-row>
  </el-row>
</template>

<style scoped>
.avaiSetText {
  border: 1px solid #cbd5da;
  background-color: #edeef0;
  text-indent: 1.7em;
  line-height: 3em;
  width: 95%;
  font-size: 0.7em;
  font-weight: 400;
  color: grey;
  box-sizing: border-box;
}
.demonstration {
  font-size: 0.8em;
  font-weight: 500;
}
.time-container {
  display: flex;
  flex-wrap: wrap; /* 允许换行 */
  gap: 8px;
  border: 1px solid #cbd5da;
  width: 100%;
  padding: 10px;
}
.time-block {
  border: 1px solid #cbd5da;
  border-radius: 5px;
  font-size: 0.5em;
  font-weight: 400;
  padding: 4px 0.6em;
  width: 60px;
  text-align: center;
  cursor: pointer;
  /* white-space: nowrap; */
}
.time-block:hover {
  background-color: #e4eff9;
}

.time-block.booked {
  border: 1px solid #eeeeee;
  background-color: #eeeeee;
  color: #999;
  cursor: not-allowed;
  pointer-events: none;
}

.time-block.selected {
  background-color: #e4eff9;
}
</style>
