<template>
  <div class="login-container">
    <img alt="app-logo" src="../assets/icon.jpg" class="logo">
    <h2>Login</h2>
    <form @submit.prevent="handleSubmit" class="login-form"> 
      <div class="form-group">
        <label>Email</label>
        <input v-model="email" type="email" placeholder="Ingresa tu direccion de correo" required />
      </div>

      <div class="form-group">
        <label>Password</label>
        <input v-model="password" type="password" placeholder=" " required />
      </div>

      <button type="submit" class="login-button">Login</button>
    </form>
  </div>
</template>

<script>
import { useAuthStore } from '@/store';

export default {
  data(){
    return{
      email: "",
      password: "",
    }
  },
  methods:{
    async handleSubmit() {
      const hash = await this.generateHash();
      const authStore = useAuthStore();
      authStore.setHash(hash);
      this.$router.push('/transactions/purchase')
    },
    async generateHash() {
      // Uso el pass y el user para generar una clave que es la que voy a usar en la API
      const encoder = new TextEncoder();
      const seed = this.password + this.email;
      const data = encoder.encode(seed);

      return crypto.subtle.digest('SHA-256', data).then(hashBuffer => {
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        return hashHex.substring(0, 16);
      });
    }
  }
}
</script>

<style scoped>
.login-container {
  width: 320px;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.logo {
  width: 100px;
  margin-bottom: 20px;
}

.login-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  font-size: 14px;
  margin-bottom: 5px;
  text-align: left;
  color: #333;
}

.form-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
  outline: none;
}

.form-group input:focus {
  border-color: #5b9fff;
}

.login-button {
  padding: 10px;
  background-color: #5b9fff;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.login-button:hover {
  background-color: #3a7ddd;
}
</style>