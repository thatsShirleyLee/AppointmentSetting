import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

// 引入路由
import router from './router/index.ts'
// 引入pinia
import pinia from './store/index.ts'
//引入路由鉴权文件
import './permission'

const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.use(ElementPlus)
// 注册pinia
app.use(pinia)
// 注册模板路由
app.use(router)
app.mount('#app')
