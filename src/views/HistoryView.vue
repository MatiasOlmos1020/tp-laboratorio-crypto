<template>
    <div class="container my-4 mt-5">
        <div class="row justify-content-center">
            <div class="col-12 col-lg-8 mb-4">
                <div class="card shadow-sm">
                    <div class="card-body">
                        <h5 class="text-primary text-center">Estado Actual</h5>
                        <CurrentStateComponent v-if="transactions" :data="transactions" />
                    </div>
                </div>
            </div>

            <div class="col-12 col-lg-8">
                <h5 class="mb-4 text-center text-secondary">Historial de Transacciones</h5>
                <div v-for="transaction in transactions" :key="transaction._id" class="mb-4">
                    <ShowTransaction :transactionType="transaction.action" :cryptoName="transaction.crypto_code"
                        :cryptoValue="transaction.crypto_amount" :fiatValue="transaction.money"
                        :transactionId="transaction._id" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import CurrentStateComponent from "@/components/CurrentStateComponent.vue";
import ShowTransaction from "@/components/ShowTransaction.vue";
import { getAllUserTransactions } from "@/services/transactionsService";
import { useAuthStore } from "@/store/useAuthStore";

export default {
    data() {
        return {
            transactions: null,
        };
    },
    computed: {
        hash() {
            const authStore = useAuthStore();
            return authStore.hash;
        },
    },
    async mounted() {
        try {
            this.transactions = await getAllUserTransactions(this.hash);
        } catch (error) {
            this.transactions = [];
        }
    },
    components: {
        ShowTransaction,
        CurrentStateComponent,
    },
};
</script>

<style></style>
