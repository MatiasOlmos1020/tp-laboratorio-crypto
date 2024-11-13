<template>
  <TransactionComponent msg="Comprar Criptos" transaction-type="purchase" action="create"></TransactionComponent>
</template>

<script>
import TransactionComponent from '@/components/TransactionComponent.vue';

export default {
  name: "PurchaseView",
  components: {
    TransactionComponent,
  }
}
</script>
