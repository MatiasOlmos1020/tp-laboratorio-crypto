import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import TransactionsLayout from '@/Layouts/TransactionsLayout.vue'
import PurchaseView from '@/views/transaction/PurchaseView.vue'
import SaleView from '@/views/transaction/SaleView.vue'
import HistoryView from '@/views/HistoryView.vue'
import EditTransaction from '@/views/transaction/EditTransactionView.vue'

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
        name: 'Sale',
        path: '/transactions/sale',
        component: SaleView
      },
      {
        name: 'EditTransaction',
        path: '/transactions/edit/:id',
        component: EditTransaction
      },
    ] 
  },
  {
    name: 'History',
    path: '/history',
    component: HistoryView
  },
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
