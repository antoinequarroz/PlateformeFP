// main.js
import { createApp, reactive, provide, inject } from 'vue';
import App from './App.vue';
import router from './router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import "plyr/dist/plyr.css";
import './assets/js/functions.js';
import './components/Plugins/DarkMode.js';



const app = createApp(App);
app.use(router);


// Créer un état réactif pour l'utilisateur
const userState = reactive({
    user: null
});

// Écouter les changements d'état d'authentification
const auth = getAuth();
onAuthStateChanged(auth, (user) => {
    userState.user = user;
});

// Créer un plugin simple pour fournir l'état de l'utilisateur à toute l'application
app.provide('userState', userState);

app.mount('#app');
