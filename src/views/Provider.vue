<script setup lang="ts">
defineOptions({
  name: 'Provider',
})
import { onMounted, onBeforeUnmount } from "vue";
import { onBeforeRouteLeave } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus';
import type { Action } from 'element-plus';
import AvailabilitySetting from "../components/AvailabilitySetting.vue";
import AvailabilityShow from "../components/AvailabilityShow.vue";
import { useProviderStore } from "../store/modules/provider";
const providerStore = useProviderStore();
const sortChunks = () => {
  providerStore.isConfirmed=true;
  providerStore.sortChunks;
  ElMessageBox.alert('Do you complete availibility settings?', 'Confirm', {
    // if you want to disable its autofocus
    // autofocus: false,
    confirmButtonText: 'OK',
    callback: (action: Action) => {
      ElMessage({
        type: 'info',
        message: `action: ${action}`,
      })
    },
  })
}
</script>

<template>
  <!-- 医生端设置可预约时间和周期 -->
  <el-row>
    <!-- Start Date & Repeat -->
    <el-row style="width: 50%; margin-top: 10px;">
      <el-col :span="10">
        <el-row>
          <span class="demonstration">Start Date</span>
        </el-row>
        <el-row>
          <div class="demo-date-picker">
            <div class="block">
              <el-date-picker
                v-model="providerStore.startDate"
                format="YYYY/MM/DD"
                value-format="YYYY/MM/DD"
                type="date"
                placeholder="Pick a day"
              />
            </div>
          </div>
        </el-row>
      </el-col>
      <el-col :span="6">
        <el-row>
          <span class="demonstration">Repeat</span>
        </el-row>
        <el-row>
          <el-input-number
          v-model="providerStore.repeatNum"
          :min="1"
          :max="10"
          />
        </el-row>
      </el-col>
    </el-row>
    <!-- Availability Setting & Availability Show -->
    <el-row style="margin-top: 10px;">
      <!-- Availability Setting -->
      <el-col :span="12">
        <el-row>
            <span class="avaiSetText">Availability Setting</span>
            <div style="display: flex; width: 95%;" v-for="dayName in providerStore.dayNameList">
              <AvailabilitySetting :dayName="dayName"></AvailabilitySetting>
            </div>
        </el-row>
      </el-col>
      <!-- Availability Show -->
      <el-col :span="12">
        <el-row style="width: 100%;">
          <span class="avaiSetText">Availability Show</span>
          <div style="display: flex; width: 95%;" v-for="dayName in providerStore.availDayNameList">
            <AvailabilityShow :dayName="dayName"></AvailabilityShow>
          </div>
        </el-row>
      </el-col>
    </el-row>
  </el-row>
  <!-- Provider Confirm -->
  <el-row>
    <el-button style="background-color: #173c64; color: #f0f0f0; margin-left: 90%; margin-top: 2%;" @click="sortChunks">
      <span style="font-size: 1em;">Confirm</span>
    </el-button>
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
</style>
