import { createRouter, createWebHistory } from 'vue-router'
import HomePage from "./components/HomePage.vue";

const routes = [
    { path: '/', component: HomePage },

    // ... autres routes si nécessaires
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
