<template>
    <div class="d-flex justify-content-center align-items-center min-vh-100 bg-light">
        <div class="p-4 bg-white rounded-3 shadow-sm w-100" style="max-width: 500px;">
            <h2 class="mb-4">{{ msg }}</h2>
            <form @submit.prevent="handleSubmit" class="row g-3">
                <div class="col-12">
                    <select @change="handleExchangeValue" v-model="crypto" class="form-select">
                        <option value="USDC" selected>USDC</option>
                        <option value="BTC">BTC</option>
                        <option value="ETH">ETH</option>
                    </select>
                </div>
                <div class="col-12">
                    <InputComponent :spanMsg="crypto" v-model="cryptoAmount" @blur="handleParse()" :placeholder="crypto"
                        type="number" inputClass="form-control" />
                </div>
                <div class="col-12">
                    <span>ARS: </span><br>
                    <span>
                        {{ fiatAmount }}
                    </span>
                </div>

                <div class="mt-3">
                    <button type="submit" class="btn btn-primary w-100 mb-3">
                        {{ action === 'create' ? 'Crear Transaccion' : 'Editar Transaccion' }}
                    </button>
                    <template v-if="this.action === 'edit'">
                        <button @click.prevent="showModal = true" class="btn btn-danger w-100">Eliminar
                            Transacción</button>
                    </template>
                </div>
            </form>
        </div>
    </div>
    <ConfirmDeleteComponent class="col-12" :isOpen="showModal"
        message="Por favor, confirme que quiere eliminar la Transacción" @confirm="onConfirmDelete"
        @cancel="onCancelDelete"></ConfirmDeleteComponent>
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
        await this.handleExchangeValue();

        if (this.action === "edit") {
            let res = await getTransactionById(this.$route.params.id);
            this.previousTransactionType = res.action;
            this.crypto = res.crypto_code;
            await this.handleExchangeValue();
            this.cryptoAmount = res.crypto_amount;
            this.fiatAmount = res.money;
        }
    }
}
</script>
