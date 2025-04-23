<script setup lang="ts">
defineOptions({
  name: 'AvailabilityShow',
})
defineProps(['dayName']);
import TimeChunk from './TimeChunk.vue';
import { useProviderStore } from "../store/modules/provider";
const providerStore = useProviderStore();
</script>

<template>
  <div class="weekday">
    <span class="weekname">{{dayName}}</span>
    <div class="time-chunk-container">
        <TimeChunk class="time-chunk" v-for="chunk in providerStore.TimeChunkList(dayName)" :key="chunk.id" :dayName="dayName" :id="chunk.id" :startTime="chunk.start" :endTime="chunk.end"></TimeChunk>
    </div>
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
    overflow: hidden;
  }
  .weekday .weekname {
    flex: 0 0 110px;
    text-indent: 1em;
    font-size: 0.9em;
    font-weight: 500;
  }
  .time-chunk-container {
    display: flex;
    flex-wrap: wrap;
    /* gap: 4px; */
    flex: 1 1 0;
    min-width: 0;
    max-height: 50px;
    overflow-y: auto;
  }
  .time-chunk-container::-webkit-scrollbar {
    width: 6px;
  }
  .time-chunk-container::-webkit-scrollbar-thumb {
    background-color: #cbd5da;
    border-radius: 3px;
  }
  .time-chunk-container::-webkit-scrollbar-track {
    background-color: #f5f5f5;
  }
  .time-chunk {
    margin-top: 0.5%;
    margin-bottom: 0.5%;
    margin-right: 0.5%;
  }
</style>
