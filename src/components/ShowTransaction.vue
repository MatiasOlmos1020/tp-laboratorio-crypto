<template>
    <div class="d-flex justify-content-center align-items-center">
        <div class="p-4 bg-white rounded-3 shadow-sm w-100 mb-4" style="max-width: 500px;">
            <h5 class="text-primary mb-3 text-center">{{ transactionType }}</h5>
            <div class="d-flex justify-content-between align-items-center mb-3">
                <div>
                    <small class="text-muted">Moneda</small>
                    <p class="mb-0 fw-bold">{{ cryptoName }}</p>
                </div>
                <div>
                    <small class="text-muted">ARS</small>
                    <p class="mb-0 fw-bold">{{ fiatValue }}</p>
                </div>
                <div>
                    <small class="text-muted">{{ cryptoName }}</small>
                    <p class="mb-0 fw-bold">{{ cryptoValue }}</p>
                </div>
            </div>
            <router-link :to="'/transactions/edit/' + transactionId" class="btn btn-outline-primary w-100">
                Gestionar CRUD
            </router-link>
        </div>
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
        fiatValue: String,
        cryptoValue: String,
        transactionId: String
    }
}
</script>