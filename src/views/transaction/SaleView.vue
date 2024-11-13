<template>
      <TransactionComponent msg="vender Criptos" transaction-type="sale" action="create"></TransactionComponent>

  </template>
  
  <script>
  import TransactionComponent from '@/components/TransactionComponent.vue';
  
  export default {
    name: "SaleView",
    components: {
      TransactionComponent,
    }
  }
  </script>
  