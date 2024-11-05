<template>
  <NavBar></NavBar>
  <div id="app" class="d-flex flex-column align-items-center bg-light min-vh-100">
    <router-view/>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue';
export default {
  name: "app",
  components: {
    NavBar
  }
}
</script>