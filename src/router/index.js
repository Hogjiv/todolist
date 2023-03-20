import { createRouter, createWebHistory } from 'vue-router'
import firstPAge from '../views/firstPAge.vue'

const routes = [
  {
    path: '/',
    name: 'firstPAge',
    component: firstPAge
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
