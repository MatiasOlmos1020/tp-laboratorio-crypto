<template>
    <div class="container">
        <div class="row">
            <div v-for="(transaction, index) in transactions" :key="index">
                <ShowTransaction :transactionType="transaction.action" :cryptoName="transaction.crypto_code"
                    :cryptoValue="transaction.crypto_amount" :fiatValue="transaction.money"></ShowTransaction>
            </div>
        </div>
    </div>
</template>

<script>
import ShowTransaction from '@/components/ShowTransaction.vue';
import { getAllUserTransactions } from '@/services/transactionsService';
import { useAuthStore } from '@/store';

export default {
    data() {
        return {
            transactions: null,
        }
    },
    computed: {
        hash() {
            const authStore = useAuthStore();
            return authStore.hash;
        }
    },
    async mounted() {
        this.transactions = await getAllUserTransactions(this.hash)
    },
    components: {
        ShowTransaction
    }
}
</script>

<style></style>