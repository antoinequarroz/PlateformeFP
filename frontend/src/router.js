import { createRouter, createWebHistory } from 'vue-router'
import HomePage from "./components/HomePage.vue";
import Map from "./components/Map.vue";

const routes = [
    { path: '/', component: HomePage },
    { path: '/map', component: Map },

    // ... autres routes si nécessaires
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
