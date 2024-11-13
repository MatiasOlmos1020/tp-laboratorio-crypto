<template>
    <TransactionComponent msg="Editar Transacción" transaction-type="" action="edit"></TransactionComponent>
  </template>
  
  <script>
  import TransactionComponent from '@/components/TransactionComponent.vue';
  
  export default {
    name: "EidtView",
    components: {
      TransactionComponent,
    }
  }
  </script>
  