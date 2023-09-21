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
import InstitutionForm from "./components/Dashboard/DashboardForms/InstitutionForm.vue";
import EtudiantForm from "./components/Dashboard/DashboardForms/EtudiantForm.vue";
import InstitutionDetails from "./components/Dashboard/DashboardDetails/InstitutionDetails.vue";
import EtudiantDetails from "./components/Dashboard/DashboardDetails/EtudiantDetails.vue";
import NewUser from "./components/Dashboard/DashboardForms/NewUser.vue";

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
    { path: '/institution_form', component: InstitutionForm, name: 'InstitutionForm'  },
    { path: '/etudiant_form', component: EtudiantForm, name: 'EtudiantForm'  },
    { path: '/institution/:instSlug', component: InstitutionDetails, name: 'institution-details', props: true },
    { path: '/etudiant/:etuSlug', component: EtudiantDetails, name: 'etudiant-details', props: true },
    { path: '/new_user', component: NewUser, name: 'NewUser'  }

    // ... autres routes si nécessaires
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
