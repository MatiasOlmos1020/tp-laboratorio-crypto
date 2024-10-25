<template>
      <TransactionComponent msg="vender Criptos" transaction-type="sale"></TransactionComponent>

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
  