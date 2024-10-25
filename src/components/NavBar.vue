<template>
  <nav class="navbar">
    <div class="nav-container">
      <router-link to="/transactions/buy" class="nav-item">Compre Cryptos</router-link>
      <router-link to="/transactions/sell" class="nav-item">Venda Cryptos</router-link>
      <router-link to="/history" class="nav-item">Historial</router-link>

    </div>
  </nav>
</template>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  width: 100%;
  background-color: #ffffff;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  padding: 20px;
  text-align: center;
  z-index: 1000;
  display: flex;
  justify-content: center;
}

.nav-container {
  display: flex;
  justify-content: center;
  gap: 30px;
}

.nav-item {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
  transition: color 0.3s ease;
}

.nav-item.router-link-exact-active {
  color: #42b983;
}

.nav-item:hover {
  color: #3a7ddd;
}
</style>
