import { createRouter, createWebHistory } from 'vue-router'
import firstPage from '../views/firstPage.vue'

const routes = [
  {
    path: '/',
    name: 'firstPage',
    component: firstPage
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
