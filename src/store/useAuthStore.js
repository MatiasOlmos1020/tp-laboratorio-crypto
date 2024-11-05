// src/stores/authStore.js
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    hash: '',
  }),
  actions: {
    setHash(newHash) {
      this.hash = newHash;
    },
  },
});
