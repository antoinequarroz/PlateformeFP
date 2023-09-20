import { createRouter, createWebHistory } from 'vue-router'
import HomePage from "./components/Home/HomePage.vue";
import Map from "./components/Home/Map.vue";
import Institution from "./components/Home/Institution.vue";
import Place from "./components/Home/Place.vue";
import Profile from "./components/Home/Profile.vue";
import Error404 from "./components/Utils/Error404.vue";
import AdminDashboard from "./components/Dashboard/AdminDashboard.vue";
import InstitutionList from "./components/Dashboard/DashboardList/InstitutionList.vue";
import EtudiantList from "./components/Dashboard/DashboardList/EtudiantList.vue";

const routes = [
    { path: '/', component: HomePage },
    { path: '/map', component: Map },
    { path: '/institution', component: Institution },
    { path: '/place', component: Place },
    { path: '/profile', component: Profile },
    { path: '/admin', component: AdminDashboard },
    { path: '/:pathMatch(.*)*', component: Error404 },
    { path: '/institution_list', component: InstitutionList },
    { path: '/etudiant_list', component: EtudiantList },

    // ... autres routes si nécessaires
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
