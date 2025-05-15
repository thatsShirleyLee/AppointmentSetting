import { ref } from 'vue'
import { defineStore } from 'pinia'
import dayjs from 'dayjs'
import { DateWithTimeBlocks, TimeBlock } from './type.ts'
import { useProviderStore } from "./provider";
import { nanoid } from 'nanoid'

export const usePatientStore = defineStore(
    'patient',
    () => {
        const selectDate = ref("");
        // 计算得到的可用日期：['2025/04/24', '2025/04/25', ...]
        const dateList = ref<string[]>([])
        // 映射每个日期的所有时间点（含是否已被预约）
        const dateWithTimeBlocks = ref<DateWithTimeBlocks>({})

    // 工具函数：生成所有可用的预约日期和时间块
    const generateAvailableDates = () => {
      const providerStore = useProviderStore();
      const start = dayjs(providerStore.startDate);
      const repeat = providerStore.repeatNum;
      const availability = providerStore.availability;

      dateList.value = [];
      dateWithTimeBlocks.value = {};

      for (let i = 0; i < repeat; i++) {
        Object.keys(availability).forEach(dayName => {
            const dayOffset = getDayOffsetFromStart(start, dayName, i);
            const date = start.add(dayOffset, 'day').format("YYYY/MM/DD");
            dateList.value.push(date);

            const chunks = availability[dayName];
            const allTimeBlocks: TimeBlock[] = [];

            chunks.forEach(chunk => {
                const timeBlocks = expandTimeRange(chunk.start, chunk.end); // 分块
                timeBlocks.forEach(time => {
                    allTimeBlocks.push({ id: nanoid(), time, booked: false }); // 标记化块
                });
            });

            dateWithTimeBlocks.value[date] = allTimeBlocks;
        });
      }

      // 设置默认选中日期
      if (dateList.value.length > 0) {
        selectDate.value = dateList.value[0];
      }
    };

    // 工具函数：从 start date 开始第 i 周的指定 weekday 的日期偏移量
    const getDayOffsetFromStart = (start: dayjs.Dayjs, dayName: string, weekIndex: number) => {
      const weekDayMap: Record<string, number> = {
        Sunday: 0, Monday: 1, Tuesday: 2, Wednesday: 3,
        Thursday: 4, Friday: 5, Saturday: 6
      };
      const targetWeekday = weekDayMap[dayName];
      const startWeekday = start.day();
      let offset = (targetWeekday - startWeekday + 7) % 7;
      return weekIndex * 7 + offset;
    };

    // 工具函数：按 15 分钟间隔展开时间段
    const expandTimeRange = (start: string, end: string): string[] => {
      const startTime = dayjs(start, 'hh:mm A');
      const endTime = dayjs(end, 'hh:mm A');
      const result: string[] = [];

      let current = startTime;
      while (current.isBefore(endTime)) {
        result.push(current.format('hh:mm A'));
        current = current.add(15, 'minute');
      }

      return result;
    };

    // 标记某个时间点为已预约
    const bookTime = (date: string, timeId: string) => {
      const list = dateWithTimeBlocks.value[date];
      const target = list?.find(t => t.id === timeId);
      if (target) target.booked = true;
    };

    return {
      selectDate,
      dateList,
      dateWithTimeBlocks,
      generateAvailableDates,
      bookTime,
    };
})