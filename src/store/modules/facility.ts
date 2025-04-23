import { ref } from 'vue'
// 创建用户相关的小仓库
import { defineStore } from 'pinia'
import type { RouteRecordRaw } from 'vue-router'
// 引入路由
import { constantRoute } from '../../router/routes'


export const useFacilityStore = defineStore(
    'facility',
    () => {
        let menuRoutes = ref<RouteRecordRaw[]>(constantRoute) // 常量路由
        return {
            menuRoutes
        }
    },
    // 持久化
    {
        persist: true, // 将 store 的状态自动保存到 localStorage 中， 需要安装piniaPluginPersistedstate插件, 并且在 Pinia 配置中设置这个插件
    },
)