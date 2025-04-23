import router from './router/index.ts'
//@ts-ignore
import nprogress from 'nprogress'
//引入进度条样式
import 'nprogress/nprogress.css'
nprogress.configure({ showSpinner: false })

router.beforeEach(async (to: any, _from: any, next: any) => {
  document.title = `门诊预约 - ${to.meta.title}` // 浏览器标签页标题
  if(to.path==='/') {
    next({ path: '/provider'})
  } else {
    next()
  }
  nprogress.start()
})

router.afterEach((_to: any, _from: any) => {
  nprogress.done()
})