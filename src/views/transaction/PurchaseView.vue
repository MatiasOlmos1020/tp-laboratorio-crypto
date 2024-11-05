<template>
  <TransactionComponent msg="Comprar Criptos" transaction-type="purchase"></TransactionComponent>
</template>

<script>
import TransactionComponent from '@/components/CreateTransactionComponent.vue';

export default {
  name: "PurchaseView",
  components: {
    TransactionComponent,
  }
}
</script>
