import { reactive, ref, computed } from 'vue'
// 创建用户相关的小仓库
import { defineStore } from 'pinia'
import { DayAvailability } from './type.ts'
import dayjs from 'dayjs'

export const useProviderStore = defineStore(
    'provider',
    () => {
        let startDate = ref(dayjs().format("YYYY/MM/DD"));
        let repeatNum = ref<number>(2);
        let dayNameList = ref([
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
        ]);
        let availability = reactive<DayAvailability>({})
        const isConfirmed = ref(false);
        const availDayNameList = computed(() => {
            return Object.entries(availability).filter(([_, times]) => times.length > 0).map(([dayName]) => dayName)
        });
        const TimeChunkList = computed(() => {
            return (dayName: string) => availability[dayName] || []
        });
        const sortChunks = () => {
            Object.keys(availability).forEach(dayName => {
                availability[dayName].sort((a, b) => {
                    const aTime = dayjs(a.start, 'hh:mm A');
                    const bTime = dayjs(b.start, 'hh:mm A');
                    return aTime.isAfter(bTime) ? 1 : -1;
                });
            });
        };
        const removeChunk = (dayName: string, id: string) => {
            const list = availability[dayName];
            if (!list) return;
            const index = list.findIndex(chunk => chunk.id === id);
            if (index !== -1) {
                list.splice(index, 1);
            }
        };
        return {
            startDate,
            repeatNum,
            dayNameList,
            availability,
            isConfirmed,
            availDayNameList,
            TimeChunkList,
            sortChunks, // for confirm
            removeChunk, // for delete current selected time chunk
        }
    },
    // 持久化
    {
        persist: false, // 将 store 的状态自动保存到 localStorage 中， 需要安装piniaPluginPersistedstate插件, 并且在 Pinia 配置中设置这个插件
    },
)