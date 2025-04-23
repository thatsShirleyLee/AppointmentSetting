<script setup lang="ts">
defineOptions({
  name: 'TimeChunk',
})
// defineProps(['dayName', 'id', 'startTime', 'endTime'])
defineProps<{
  id: string
  dayName: string
  startTime: string
  endTime: string
}>()
import { useProviderStore } from "../store/modules/provider";
const providerStore = useProviderStore();

// const removeChunk = () => {
//   providerStore.removeChunk(dayName, id);
// }
</script>

<template>
  <el-row style="background-color: #e4eff9;">
    <span>{{startTime}} - {{endTime}}</span>
    <el-icon style="cursor: pointer;" @click="providerStore.removeChunk(dayName, id)"><Close :color="`#d25a58`"/></el-icon>
  </el-row>
</template>

<style scoped>
  span {
    color: #4675a4;
    font-size: 0.5em;
    font-weight: 400;
    padding-left: 1em;
    /* padding-right: 1em; */
    width: 125px;
  }
</style>
