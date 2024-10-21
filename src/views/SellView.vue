<template>
    <TransactionComponent msg="Vender Criptos" previous-currency="USDT" result-currency="ARS"></TransactionComponent>
  </template>
  
  <script>
  import TransactionComponent from '@/components/TransactionComponent.vue';
  
  export default {
    name: "SellView",
    components: {
      TransactionComponent,
    }
  }
  </script>
  