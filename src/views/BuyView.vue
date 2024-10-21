<template>
  <TransactionComponent msg="Comprar Criptos" previous-currency="ARS" result-currency="USDT"></TransactionComponent>
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
