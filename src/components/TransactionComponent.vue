<template>
    <div class="d-flex justify-content-center align-items-center min-vh-100 bg-light">
        <div class="p-4 bg-white rounded-3 shadow-sm w-100 position-relative" style="max-width: 500px;">
            <template v-if="!loading">
                <router-link :to="{ name: 'History' }" class="btn-close position-absolute top-0 end-0 m-3"
                    aria-label="Close">
                </router-link>
                <form @submit.prevent="handleSubmit" class="row g-3 mt-2">
                    <div class="col-12">
                        <select @change="handleExchangeValue" v-model="crypto" class="form-select">
                            <option value="USDC" selected>USDC</option>
                            <option value="BTC">BTC</option>
                            <option value="ETH">ETH</option>
                        </select>
                    </div>
                    <div class="col-12">
                        <InputComponent :spanMsg="crypto" v-model="cryptoAmount" @blur="handleParse()"
                            :placeholder="crypto" type="number" inputClass="form-control" />
                    </div>
                    <div class="col-12">
                        <span class="fw-bold">ARS:</span>
                        <div class="mt-1">
                            <span>{{ fiatAmount }}</span>
                        </div>
                    </div>
                    <div class="mt-3">
                        <button type="submit" class="btn btn-primary w-100 mb-3">
                            {{ action === 'create' ? 'Crear Transacción' : 'Editar Transacción' }}
                        </button>
                        <template v-if="action === 'edit'">
                            <button @click.prevent="showModal = true" class="btn btn-danger w-100">
                                Eliminar Transacción
                            </button>
                        </template>
                    </div>
                </form>
            </template>
            <template v-else>
                <div class="d-flex justify-content-center align-items-center text-center">
                    <span class="spinner-border text-primary" role="status" aria-hidden="true"></span>
                    <span class="ms-2">Cargando...</span>
                </div>
            </template>
        </div>
    </div>
    <ConfirmDeleteComponent class="col-12" :isOpen="showModal"
        message="Por favor, confirme que quiere eliminar la Transacción" @confirm="onConfirmDelete"
        @cancel="onCancelDelete">
    </ConfirmDeleteComponent>
</template>


<script>
import { useAuthStore } from '@/store/useAuthStore';
import { createTransaction, deleteTransaction, editTransaction, getTransactionById } from '@/services/transactionsService';
import { getCriptoValue } from '@/services/cryptoService';
import InputComponent from './InputComponent.vue';
import ConfirmDeleteComponent from './ConfirmDeleteComponent.vue';

export default {
    name: 'TransactionComponent',
    data() {
        return {
            crypto: "USDC",
            fiatAmount: 0,
            cryptoAmount: 0,

            exchangeValue: 0,

            previousTransactionType: '',

            showModal: false,
            loading: false,
        };
    },
    props: {
        msg: String,
        transactionType: String,
        action: String,
    },
    computed: {
        hash() {
            const authStore = useAuthStore();
            return authStore.hash;
        },
    },
    methods: {
        async handleSubmit() {
            try {
                this.loading = true;
                let data = {
                    action: this.transactionType === '' ? this.previousTransactionType : this.transactionType,
                    crypto_code: this.crypto,
                    crypto_amount: this.cryptoAmount,
                    money: this.fiatAmount,
                    datetime: Date.now(),
                };
                let res
                if (this.action === "create") {
                    data = { ...data, user_id: this.hash }
                    res = await createTransaction(data);
                } else if (this.action === "edit") {
                    res = await editTransaction(data, this.$route.params.id);
                }
                console.log(res);
                this.loading = false;
                this.$router.push({ name: 'History' })
            } catch (error) {
                console.log(error);
            }
        },
        async handleExchangeValue() {
            let res = await getCriptoValue(this.crypto, this.fiatAmount);
            this.exchangeValue = res.totalBid;
            console.log(this.exchangeValue);
            this.fiatAmount = parseFloat(this.cryptoAmount * this.exchangeValue).toFixed(2);
        },
        async onConfirmDelete() {
            await deleteTransaction(this.$route.params.id);
            this.showModal = false;
            this.handleClose()
        },
        onCancelDelete() {
            this.showModal = false;
        },
        handleClose() {
            this.$router.push({ name: 'History' })
        },
    },
    watch: {
        cryptoAmount(newCryptoAmountValue) {
            this.fiatAmount = parseFloat(newCryptoAmountValue * this.exchangeValue).toFixed(2);
        }
    },
    components: {
        InputComponent,
        ConfirmDeleteComponent,
    },
    async created() {
        this.loading = true;
        await this.handleExchangeValue();

        if (this.action === "edit") {
            let res = await getTransactionById(this.$route.params.id);
            this.previousTransactionType = res.action;
            this.crypto = res.crypto_code;
            await this.handleExchangeValue();
            this.cryptoAmount = res.crypto_amount;
            this.fiatAmount = res.money;
        }
        this.loading = false
    }
}
</script>
