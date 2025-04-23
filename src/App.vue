<script setup lang="ts">
defineOptions({
  name: "App",
});
//  获取路由对象
import { useRoute } from 'vue-router'
import { useFacilityStore } from './store/modules/facility';

const route = useRoute()
const facilityStore = useFacilityStore();
</script>

<template>
  <el-menu
    :default-active="route.path"
    active-text-color="#213b61"
    class="el-menu-demo"
    mode="horizontal"
    router
    :ellipsis="false"
  >
    <template v-for="item in facilityStore.menuRoutes" :key="item.path">
      <el-menu-item :index="item.path">{{item.name}}</el-menu-item>
    </template>
  </el-menu>
  <router-view></router-view>
</template>

<style scoped>
.el-menu-demo {
  width: 100%;
  display: flex;
  /* justify-content: space-between; */
}
.el-menu-demo .el-menu-item {
  flex: 1;
  font-weight: 600;
  font-size: 1.1em;
}
.el-menu-demo .el-menu-item:hover {
  color: #213b61 !important;
}
</style>
