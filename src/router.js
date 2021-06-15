import Vue from 'vue'
import Router from 'vue-router'
import setting from '@/setting'
Vue.use(Router)

const routes = [
  {
    path: '*',
    redirect: '/index'
  },
  {
    name: 'index',
    path: '/index',
    component: () => import('./view/home'),
    meta: {
      title: 'home'
    }
  }
]

const router = new Router({
  mode: setting.mode,
  routes
})

router.beforeEach((to, from, next) => {
  const title = to.meta && to.meta.title
  if (title) {
    document.title = title
  }
  next()
})

export {
  router
}
