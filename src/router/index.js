import Vue from 'vue'
import Router from 'vue-router'
import index from '../pages/index.vue'
import page from '../pages/addEvent.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/addEvent',
      name: 'addEvent',
      component: page
    }
  ]
})
