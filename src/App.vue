<template>
  <NavBar></NavBar>
  <div class="home">
    <router-view/>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue';
export default{
  name: "app",
  components: {
    NavBar
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.home {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f4f4f9;
}
</style>
