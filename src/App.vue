<template>
  <template v-if="this.hash != ''">
    <NavBar></NavBar>
  </template>
  <div id="app" class="d-flex flex-column align-items-center bg-light min-vh-100">
    <router-view />
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import { useAuthStore } from '@/store/useAuthStore';

export default {
  name: "app",
  components: {
    NavBar
  },
  computed: {
    hash() {
      let authStore = useAuthStore();
      return authStore.hash;
    },
  },
  created() {
    if (!this.hash) {
      this.$router.push({ name: 'login' });
    }
  }
}
</script>