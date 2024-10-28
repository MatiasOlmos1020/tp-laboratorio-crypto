<template>
    <div class="buy-view">
        <div class="buy-container">
            <h2>{{ msg }}</h2>
            <form @submit.prevent="handleSubmit" class="row g-3 buy-form">
                <div class="col-12">
                    <select @change="handleExchangeValue" v-model="crypto" class="form-select">
                        <option value="USDC" selected>USDC</option>
                        <option value="BTC">BTC</option>
                    </select>
                </div>
                <div class="col-6">
                    <InputComponent 
                        spanMsg="ARS"
                        v-model="fiatAmount" 
                        @blur="handleParse()" 
                        placeholder="ARS" 
                        type="number"
                        inputClass="form-control" 
                    />
                </div>
                <div class="col-6">
                    <InputComponent 
                        :spanMsg="crypto" 
                        v-model="cryptoAmount" 
                        @blur="handleParse()" 
                        :placeholder="crypto" 
                        type="number"
                        inputClass="form-control" 
                    />
                </div>
                <button class="submit-button" type="submit"> 
                    {{ transactionType === 'purchase' ? "Comprar" : "Vender" }}
                </button>
            </form>
        </div>
    </div>
</template>

<script>
import { useAuthStore } from '@/store';
import { createTransaction } from '@/services/transactionsService';
import { getCriptoValue } from '@/services/cryptoService';
import InputComponent from '@/components/InputComponent.vue';

export default {
    name: 'EditTransaction',
    data() {
        return {
            crypto: "USDC",
            fiatAmount: 0,
            cryptoAmount: 0,
            exchangeValue: 0,
            areValuesChanging: false,
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
        }
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
        handleParse() {
            this.fiatAmount = parseFloat(this.fiatAmount).toFixed(2);
            this.cryptoAmount = parseFloat(this.cryptoAmount).toFixed(7);
        }
    },
    components: {
        InputComponent
    },
    watch: {
        async fiatAmount(newVal) {
            if (!this.areValuesChanging) {
                this.areValuesChanging = true;
                this.cryptoAmount = newVal / this.exchangeValue;
                this.areValuesChanging = false;
            }
        },
        async cryptoAmount(newVal) {
            if (!this.areValuesChanging) {
                this.areValuesChanging = true;
                this.fiatAmount = newVal * this.exchangeValue;
                this.areValuesChanging = false;
            }
        }
    },
}
</script>

<style scoped>
.buy-view {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #f4f4f9;
}

.buy-container {
    padding: 20px;
    background-color: #ffffff;
    border-radius: 10px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 500px;
    margin: auto;
    text-align: center;
}

h2 {
    margin-bottom: 20px;
}

.form-select,
.form-control {
    border: 2px solid #ccc;
    border-radius: 5px;
    background-color: #ffffff;
    color: #2c3e50;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.form-select:focus,
.form-control:focus {
    border-color: #5b9fff;
    box-shadow: 0 0 5px rgba(66, 103, 184, 0.5);
}

@media (max-width: 768px) {
    .buy-container {
        padding: 15px;
    }
}

.submit-button {
  padding: 10px;
  background-color: #5b9fff;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-button:hover {
  background-color: #3a7ddd;
}
</style>