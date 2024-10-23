<template>
    <div class="buy-view">
        <div class="buy-container">
            <h2>{{ msg }}</h2>
            <form @submit.prevent="handleCreate" class="row g-3 buy-form">
                <div class="col-12">
                    <select class="form-select">
                        <option value="" disabled selected>{{ msg }}</option>
                        <option value="option1">Option 1</option>
                        <option value="option2">Option 2</option>
                    </select>
                </div>
                <div class="col-6">
                    <span>{{ previousCurrency }}</span>
                    <input type="text" placeholder="Input 1" class="form-control" />
                </div>
                <div class="col-6">
                    <span>{{ resultCurrency }}</span>
                    <input type="text" placeholder="Input 2" class="form-control" />
                </div>
                <button type="submit"> comprar</button>
            </form>
        </div>
    </div>
</template>


<script>
import { useAuthStore } from '@/store';
import { createTransaction } from '@/services/transactionsService';

export default {
    name: 'TransactionComponent',
    props: {
        msg: String,
        previousCurrency: String,
        resultCurrency: String,
    },
    computed: {
        hash() {
            const authStore = useAuthStore();
            return authStore.hash;
        }
    },
    methods: {
        handleCreate() {
            let data = {
                "user_id": `${this.hash}`,
                "action": "purchase",
                "crypto_code": "usdc",
                "crypto_amount": "1.01",
                "money": "165.23",
                "datetime": "11-07-2021 17:50"
            }
            let res = createTransaction(data);
            console.log(res);
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
</style>