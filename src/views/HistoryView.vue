<template>
    <div class="container">
        <div class="row">
            <div v-for="transaction in transactions" :key="transaction._id">
                <ShowTransaction :transactionType="transaction.action" :cryptoName="transaction.crypto_code"
                    :cryptoValue="transaction.crypto_amount" :fiatValue="transaction.money" :transactionId="transaction._id"></ShowTransaction>
                <p>{{ transaction._id }}</p>
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
        console.log(this.transactions)
    },
    components: {
        ShowTransaction
    }
}
</script>

<style></style>