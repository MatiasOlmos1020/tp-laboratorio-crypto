<template>
    <div class="container my-4 mt-5">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div v-for="transaction in transactions" :key="transaction._id" >
                    <div class="card-body">
                        <ShowTransaction :transactionType="transaction.action" :cryptoName="transaction.crypto_code"
                            :cryptoValue="transaction.crypto_amount" :fiatValue="transaction.money"
                            :transactionId="transaction._id" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ShowTransaction from '@/components/ShowTransaction.vue';
import { getAllUserTransactions } from '@/services/transactionsService';
import { useAuthStore } from '@/store/useAuthStore';

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