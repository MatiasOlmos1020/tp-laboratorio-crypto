<template>
  <div class="d-flex justify-content-center align-items-center min-vh-100 bg-light">
    <div class="card p-4 shadow-sm" style="width: 320px;">
      <img alt="app-logo" src="../assets/icon.jpg" class="card-img-top mx-auto" style="width: 100px;">
      <h2 class="text-center mt-3">Login</h2>
      <form @submit.prevent="handleSubmit">
        <div class="mb-3">
          <label class="form-label">Email</label>
          <input v-model="email" type="email" class="form-control" placeholder="Ingresa tu direccion de correo" required />
        </div>
        <div class="mb-3">
          <label class="form-label">Password</label>
          <input v-model="password" type="password" class="form-control" placeholder=" " required />
        </div>
        <button type="submit" class="btn btn-primary w-100">Login</button>
      </form>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from '@/store/useAuthStore';

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
      this.$router.push({ name: 'History' });
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
