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
                    <InputComponent 
                        :spanMsg="crypto" 
                        v-model="cryptoAmount" 
                        @blur="handleParse()" 
                        :placeholder="crypto" 
                        type="number"
                        inputClass="form-control" 
                    />
                </div>
                <div class="col-12">
                    <span>ARS: </span><br>
                    <span>
                        {{ fiatAmount }}
                    </span>
                </div>
                <button type="submit" class="btn btn-primary w-100"> 
                    {{ transactionType === 'purchase' ? "Comprar" : "Vender" }}
                </button>
            </form>
        </div>
    </div>
</template>

<script>
import { useAuthStore } from '@/store/useAuthStore';
import { createTransaction } from '@/services/transactionsService';
import { getCriptoValue } from '@/services/cryptoService';
import InputComponent from './InputComponent.vue';

export default {
    name: 'TransactionComponent',
    data() {
        return {
            crypto: "USDC",
            fiatAmount: 0,
            cryptoAmount: 0,
            exchangeValue: 0,
        };
    },
    props: {
        msg: String,
        transactionType: String,
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
                user_id: this.hash,
                action: this.transactionType,
                crypto_code: this.crypto,
                crypto_amount: this.cryptoAmount,
                money: this.fiatAmount,
                datetime: Date.now(),
            };

            let res = await createTransaction(data);
            console.log(res);
        },
        async handleExchangeValue() {
            let res = await getCriptoValue(this.crypto, this.fiatAmount);
            this.fiatAmount = 0;
            this.cryptoAmount = 0;
            this.exchangeValue = res.totalBid;
        },
        
    },
    watch:{
        cryptoAmount(newCryptoAmountValue){
            this.fiatAmount = parseFloat(newCryptoAmountValue * this.exchangeValue).toFixed(2);
        }
    },
    components: {
        InputComponent
    },
    async created(){
        await this.handleExchangeValue();
    }
}
</script>

