<template>
    <div class="accordion col-12" id="currentStateAcordion">
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingOne">
                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#currentState"
                    aria-expanded="true" aria-controls="currentState">
                    Estado Actual
                </button>
            </h2>
            <div id="currentState" class="accordion-collapse collapse show" aria-labelledby="headingOne"
                data-bs-parent="#currentStateAcordion">
                <div class="accordion-body">
                    <div v-if="!currentState">
                        <p class="text-center text-muted">Cargando datos...</p>
                    </div>
                    <div v-else class="table-responsive col-12">
                        <table class="table table-bordered table-striped table-hover table-sm">
                            <thead>
                                <tr class="table-primary">
                                    <th>Criptomoneda</th>
                                    <th>Cantidad</th>
                                    <th>Dinero</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(cryptoData, cryptoName) in currentState.cryptoTotals" :key="cryptoName">
                                    <td>{{ cryptoName }}</td>
                                    <td>{{ cryptoData.totalAmount }}</td>
                                    <td>{{ cryptoData.totalMoney }}</td>
                                </tr>
                                <tr class="table-light">
                                    <td class="fw-bold">Total:</td>
                                    <td></td>
                                    <td class="fw-bold">{{ currentState.totalMoney }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getCryptoValues } from "@/services/cryptoService";

export default {
    name: "CurrentState",
    data() {
        return {
            currentState : { cryptoTotals: {}, totalMoney: 0 }
        };
    },
    props: {
        data: {
            type: Array,
        },
    },
    methods: {
        calculateCurrentState(transactions, exchangeRates) {
            const cryptoTotals = {};
            let totalMoney = 0;

            transactions.forEach((transaction) => {
                const { crypto_code, crypto_amount, money, action } = transaction;
                const amount = parseFloat(crypto_amount);
                const moneyValue = parseFloat(money);

                if (!cryptoTotals[crypto_code]) {
                    cryptoTotals[crypto_code] = { totalAmount: 0, totalMoney: 0 };
                }

                if (action === "purchase") {
                    cryptoTotals[crypto_code].totalAmount += amount;
                    cryptoTotals[crypto_code].totalMoney += moneyValue;
                    totalMoney += moneyValue;
                } else if (action === "sale") {
                    cryptoTotals[crypto_code].totalAmount -= amount;
                    cryptoTotals[crypto_code].totalMoney -= moneyValue;
                    totalMoney -= moneyValue;
                }
            });

            for (const code in cryptoTotals) {
                cryptoTotals[code].currentValue = cryptoTotals[code].totalAmount * (exchangeRates[code] || 0);
            }

            return { cryptoTotals, totalMoney };
        },
        async exchangeRates() {
            const cryptoNames = ["usdc", "btc", "eth"];
            const fiatValue = 1;
            return await getCryptoValues(cryptoNames, fiatValue);
        },
    },
    async created() {
        const exchangeRates = await this.exchangeRates();
        this.currentState = this.calculateCurrentState(this.data, exchangeRates);
    },
};
</script>
