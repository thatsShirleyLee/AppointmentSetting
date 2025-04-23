// 静态路由
export const constantRoute = [
  // provider
  {
    path: '/provider',
    name: 'Provider',
    component: () => import('../views/Provider.vue'),
    meta: {
      title: '医生', // 菜单标题
    },
  },
  // patient
  {
    path: '/patient',
    name: 'Patient',
    component: () => import('../views/Patient.vue'),
    meta: {
      title: '病人',
    },
  },
]