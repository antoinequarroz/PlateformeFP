// main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia' // Importez createPinia
import "plyr/dist/plyr.css";
import './assets/js/functions.js'
import L from 'leaflet';

const app = createApp(App);

const pinia = createPinia(); // Créez une instance de Pinia

// Utilisez Pinia et le router avec votre application Vue
app.use(pinia);
app.use(router);

// Montez l'application Vue
app.mount('#app');
