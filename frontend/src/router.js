import { createRouter, createWebHistory } from 'vue-router'
import HomePage from "./components/HomePage.vue";
import Map from "./components/Map.vue";
import Error404 from "./components/Error404.vue";

const routes = [
    { path: '/', component: HomePage },
    { path: '/map', component: Map },
    { path: '/:pathMatch(.*)*', component: Error404 }

    // ... autres routes si nécessaires
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
