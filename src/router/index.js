import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import TransactionsLayout from '@/Layouts/TransactionsLayout.vue'
import PurchaseView from '@/views/PurchaseView.vue'
import SaleView from '@/views/SaleView.vue'
import HistoryView from '@/views/HistoryView.vue'
import EditTransaction from '@/views/EditTransactionView.vue'

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
        name: 'Purchase',
        path: '/transactions/purchase',
        component: PurchaseView
      },
      {
        path: '/transactions/sale',
        component: SaleView
      },
      {
        path: '/transactions/edit/:id',
        component: EditTransaction
      },
    ] 
  },
  {
    path: '/history',
    component: HistoryView
  },
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
