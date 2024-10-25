<template>
  <TransactionComponent msg="Comprar Criptos" transaction-type="purchase"></TransactionComponent>
</template>

<script>
import TransactionComponent from '@/components/TransactionComponent.vue';

export default {
  name: "BuyView",
  components: {
    TransactionComponent,
  }
}
</script>
