import { createRouter, createWebHistory } from 'vue-router'
import HomePage from "./components/Home/HomePage.vue";
import Map from "./components/Home/Map.vue";
import Institution from "./components/Home/Institution.vue";
import Place from "./components/Home/Place.vue";
import Profile from "./components/Home/Profile.vue";
import Error404 from "./components/Error404.vue";
import AdminDashboard from "./components/Dashboard/AdminDashboard.vue";

const routes = [
    { path: '/', component: HomePage },
    { path: '/map', component: Map },
    { path: '/institution', component: Institution },
    { path: '/place', component: Place },
    { path: '/profile', component: Profile },
    { path: '/admin', component: AdminDashboard },
    { path: '/:pathMatch(.*)*', component: Error404 }

    // ... autres routes si nécessaires
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
