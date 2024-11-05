import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router/router'; 
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap';  

const app = createApp(App).use(createPinia());
const pinia = createPinia();

app.use(pinia); 
app.use(router); 

app.mount('#app');
