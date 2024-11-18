<template>
    <div class="accordion col-12" id="analisisAcordion">
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingOne">
                <button class="accordion-button" type="button" data-bs-toggle="collapse"
                    data-bs-target="#collapseAnalisis" aria-expanded="true" aria-controls="collapseAnalisis">
                    Analisis de Inversiones
                </button>
            </h2>
            <div id="collapseAnalisis" class="accordion-collapse collapse show" aria-labelledby="headingOne"
                data-bs-parent="#analisisAcordion">
                <div class="accordion-body">
                    <div v-if="!analysis">
                        <p class="text-center text-muted">Cargando datos...</p>
                    </div>
                    <div v-else class="table-responsive col-12">
                        <table class="table table-bordered table-striped table-hover table-sm">
                            <thead>
                                <tr class="table-primary">
                                    <th>Criptomoneda</th>
                                    <th>resultado</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(cryptoData, cryptoName) in analysis" :key="cryptoName">
                                    <th>{{ cryptoName }}</th>
                                    <th>{{cryptoData}}</th>
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
    name: "AnalysisComponent",
    data() {
        return {
            analysis: {}
        };
    },
    props: {
        data: {
            type: Array,
        },
    },
    methods: {
        calculateAnalysis(transactions, currentCryptoValues) {
            const result = {};

            const groupedTransactions = transactions.reduce((acc, transaction) => {
                const { crypto_code, crypto_amount, money, action } = transaction;

                if (!acc[crypto_code]) {
                    acc[crypto_code] = { totalAmount: 0, totalSpent: 0, totalReceived: 0 };
                }

                const amount = parseFloat(crypto_amount);
                const fiat = parseFloat(money);

                if (action === "purchase") {
                    acc[crypto_code].totalAmount += amount;
                    acc[crypto_code].totalSpent += fiat;
                } else if (action === "sale") {
                    acc[crypto_code].totalAmount -= amount;
                    acc[crypto_code].totalReceived += fiat;
                }

                return acc;
            }, {});

            for (const crypto in groupedTransactions) {
                const { totalAmount, totalSpent, totalReceived } = groupedTransactions[crypto];
                const currentValue = totalAmount * (currentCryptoValues[crypto] || 0);
                const profit = totalReceived - totalSpent + currentValue;

                result[crypto] = parseFloat(profit.toFixed(2));
            }
            return result;
        },
        async exchangeRates() {
            const cryptoNames = ["usdc", "btc", "eth"];
            const fiatValue = 1;
            return await getCryptoValues(cryptoNames, fiatValue);
        },
    },
    async created() {
        const exchangeRates = await this.exchangeRates();
        this.analysis = this.calculateAnalysis(this.data, exchangeRates);
    },
};
</script>
