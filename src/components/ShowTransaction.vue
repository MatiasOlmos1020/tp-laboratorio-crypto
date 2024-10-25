<template>
    <div class="transaction-card">
        <h3 class="transaction-type">{{ transactionType }}</h3>
        <p class="crypto-name">{{ cryptoName }}</p>
        <div class="transaction-values">
            <div class="value-col">
                <p class="label">ARS</p>
                <p class="value">{{ fiatValue }}</p>
            </div>
            <div class="value-col">
                <p class="label">{{ cryptoName }}</p>
                <p class="value">{{ cryptoValue }}</p>
            </div>
        </div>
        <button class="crud-button">Gestionar CRUD</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            
        }
    },
    props: {
        transactionType: String,
        cryptoName: String,
        fiatValue: Number,
        cryptoValue: Number,
    }
}
</script>

<style scoped>
.transaction-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #ffffff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
    margin: auto;
    text-align: center;
}

.transaction-type {
    font-size: 1.5rem;
    color: #2c3e50;
    margin-bottom: 10px;
}

.crypto-name {
    font-size: 1.25rem;
    color: #5b9fff;
    margin-bottom: 20px;
}

.transaction-values {
    display: flex;
    justify-content: center;
    width: 100%;
    gap: 20px;
    margin-bottom: 20px;
}

.value-col {
    flex: 1;
    text-align: center;
}

.label {
    font-size: 0.9rem;
    color: #7a7a7a;
}

.value {
    font-size: 1.2rem;
    color: #2c3e50;
    font-weight: bold;
}

.crud-button {
    padding: 8px 16px;
    background-color: #5b9fff;
    color: #ffffff;
    border: none;
    border-radius: 5px;
    font-size: 0.9rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.crud-button:hover {
    background-color: #3a7ddd;
}
</style>