<template>
      <TransactionComponent msg="vender Criptos" transaction-type="sale"></TransactionComponent>

  </template>
  
  <script>
  import TransactionComponent from '@/components/CreateTransactionComponent.vue';
  
  export default {
    name: "SaleView",
    components: {
      TransactionComponent,
    }
  }
  </script>
  