<template>
    <div class="container my-4 mt-5">
        <div class="row justify-content-center">
            <template v-if="!loading">
                <div class="col-12 col-lg-8 mb-4">
                    <div class="card shadow-sm mt-5">
                        <div class="card-body">
                            <h5 class="text-primary text-center">Estado Actual</h5>
                            <CurrentStateComponent v-if="transactions" :data="transactions" />
                        </div>
                    </div>
                    <div class="card shadow-sm mt-5">
                        <div class="card-body">
                            <h5 class="text-primary text-center">Analisis de Inversiones</h5>
                            <AnalisisComponent v-if="transactions" :data="transactions" />
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
            </template>
            <template v-else>
                <div class="d-flex justify-content-center align-items-center min-vh-100 bg-light">
                    <div class="p-4 bg-white rounded-3 shadow-sm w-100 position-relative">
                        <div class="d-flex justify-content-center align-items-center text-center">
                            <span class="spinner-border text-primary" role="status" aria-hidden="true"></span>
                            <span class="ms-2">Cargando...</span>
                        </div>
                    </div>
                </div>
            </template>


        </div>
    </div>
</template>

<script>
import AnalisisComponent from "@/components/AnalisisComponent.vue";
import CurrentStateComponent from "@/components/CurrentStateComponent.vue";
import ShowTransaction from "@/components/ShowTransaction.vue";
import { getAllUserTransactions } from "@/services/transactionsService";
import { useAuthStore } from "@/store/useAuthStore";

export default {
    name: 'historyView',
    data() {
        return {
            transactions: null,
            loading: false,
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
            this.loading = true;
            this.transactions = await getAllUserTransactions(this.hash);
            this.loading = false;
        } catch (error) {
            this.transactions = [];
        }
    },
    components: {
        ShowTransaction,
        CurrentStateComponent,
        AnalisisComponent,
    },
};
</script>

<style></style>
