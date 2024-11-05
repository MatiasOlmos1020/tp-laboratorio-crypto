<template>
    <div class="d-flex justify-content-center align-items-center min-vh-100 bg-light">
        <div class="p-4 bg-white rounded-3 shadow-sm w-100" style="max-width: 500px;">
            <h2 class="mb-4">Editar Compra</h2>
            <form class="row g-3">
                <div class="col-12">
                    <label for="cryptoSelect" class="form-label">Seleccionar Criptomoneda</label>
                    <select id="cryptoSelect" class="form-select">
                        <option value="USDC" selected>USDC</option>
                        <option value="BTC">BTC</option>
                        <option value="ETH">ETH</option>
                    </select>
                </div>
                <div class="col-12">
                    <label for="cryptoAmount" class="form-label">Cantidad de Criptomoneda</label>
                    <input id="cryptoAmount" type="number" class="form-control" placeholder="Cantidad de criptomoneda"
                        value="0.5" />
                </div>
                <div class="col-12">
                    <span>ARS: </span><br>
                    <span>5000</span> <!-- Valor hardcodeado para el monto en ARS -->
                </div>
                <button type="submit" class="btn btn-primary w-100">Actualizar Compra</button>
            </form>
        </div>
    </div>

</template>