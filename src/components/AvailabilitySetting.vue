<script setup lang="ts">
defineOptions({
  name: 'AvailabilitySetting',
})
defineProps(['dayName']);
import {ref} from 'vue'
import { useProviderStore } from "../store/modules/provider";
import { ElMessage } from 'element-plus'
import dayjs from 'dayjs'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import { nanoid } from 'nanoid'
dayjs.extend(isSameOrBefore)
dayjs.extend(isSameOrAfter)

const providerStore = useProviderStore();

let sTime = ref("");
let eTime = ref("")
const addNew = (dayName: string) => {
  const start = sTime.value;
  const end = eTime.value;
  const startTime = dayjs(start, 'hh:mm A');
  const endTime = dayjs(end, 'hh:mm A');

  // 是否选择时间？
  if (!start || !end) {
    ElMessage('Please select both start and end time.');
    return;
  };

  // 都选择->判断时间合法？（只有startTime<endTime才「初步」合法）
  if (!endTime.isAfter(startTime)) { // 等价于 startTime.isSameOrAfter(endTime)
    ElMessage.error("Oops, time setting is illegal.");
    return;
  }

  // 初始化可用时间
  if (!providerStore.availability.hasOwnProperty(dayName)) {
    providerStore.availability[dayName] = [];
  }

  // 是否与已有时间段交叉（只有无交叉才「真正」合法）
  const overlaps = providerStore.availability[dayName].some(chunk => {
    const existingStart = dayjs(chunk.start, 'hh:mm A');
    const existingEnd = dayjs(chunk.end, 'hh:mm A');
    // 判断交叉：两者不交叉的条件是一个完全在前或后
    return !(endTime.isSameOrBefore(existingStart) || startTime.isSameOrAfter(existingEnd));
  });
  if (overlaps) {
    ElMessage({
      message: "Time period overlaps with existing chunks.",
      type: 'warning',
    });
    return;
  }

  // 经过一系列检验后，「真正」合法才添加
  providerStore.availability[dayName].push({
    id: nanoid(),
    start,
    end
  });
  ElMessage.success('Added successfully.');

  // 添加后，置空
  sTime.value = "";
  eTime.value = "";
};
</script>

<template>
  <div class="weekday">
    <span class="weekname">{{dayName}}</span>
    <div class="time-container">
      <el-time-select
        v-model="sTime"
        class="time-picker"
        start="00:00"
        step="00:15"
        end="23:59"
        format="hh:mm A"
      />
      <span>-</span>
      <el-time-select
        v-model="eTime"
        class="time-picker"
        start="00:00"
        step="00:15"
        end="23:59"
        format="hh:mm A"
      />
    </div>
    <el-button link class="add-new" @click="addNew(dayName)">
      <el-icon :size="20" :color="`#6e97ba`"><CirclePlus /></el-icon>
      <span style="color: #6e97ba;">Add New</span>
    </el-button>
</div>
</template>

<style scoped>
  .weekday {
    border-bottom: 1px solid #cbd5da;
    border-right: 1px solid #cbd5da;
    border-left: 1px solid #cbd5da;
    height: 50px;
    display: flex;
    align-items: center;
    width: 100%;
    padding: 0 10px 0 0;
  }
  .weekday .weekname {
    flex: 0 0 110px;
    text-indent: 1em;
    font-size: 0.9em;
    font-weight: 500;
  }

  .time-container {
    display: flex;
    align-items: center;
    gap: 6px;
    flex: 1; /* 撑满剩余空间 */
    min-width: 300px;
    margin-left: 6%;
  }
  .time-picker {
    width: 40%;
    min-width: 120px;
  }

  .add-new {
    flex: 0 0 auto;
    margin-left: auto; /* 把按钮推到最右边 */
    white-space: nowrap;
    font-size: 0.8em;
  }
</style>
