import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import TransactionsLayout from '@/Layouts/TransactionsLayout.vue'
import BuyView from '@/views/BuyView.vue'
import SellView from '@/views/SellView.vue'

const routes = [
  {
    path: '/',
    name: 'login',
    component : LoginView
  },
  {
    path: '/transactions',
    component: TransactionsLayout,
    children:[
      {
        name: 'buy',
        path: '/transactions/buy',
        component: BuyView
      },
      {
        path: '/transactions/sell',
        component: SellView
      }
    ] 
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
