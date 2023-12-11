//main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import "plyr/dist/plyr.css";
import './assets/js/functions.js'
import L from 'leaflet';



// Remember to create and mount the app
createApp(App).use(router).mount('#app')
