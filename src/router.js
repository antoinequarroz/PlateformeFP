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
import InstitutionFormModif from "./components/Dashboard/DashboardForms/InstitutionFormModif.vue";
import EtudiantDetails from "./components/Dashboard/DashboardDetails/EtudiantDetails.vue";
import PlaceDetails from "./components/Dashboard/DashboardDetails/PlaceDetails.vue";
import PFPDetails from "./components/Dashboard/DashboardDetails/PFPDetails.vue";
import Votation from "./components/Dashboard/DashboardDetails/Votation.vue";
import VotationPreview from "./components/Dashboard/DashboardDetails/Votation_preview.vue";
import Validation from "./components/Dashboard/DashboardDetails/Validation.vue";
import Reception from "./components/Dashboard/DashboardDetails/Reception.vue";
import NewUserForm from "./components/Dashboard/DashboardForms/NewUserForm.vue";
import NewUserFormModif from "./components/Dashboard/DashboardForms/NewUserFormModif.vue";
import UserList from "./components/Dashboard/DashboardList/UserList.vue";
import EnseignentForm from "./components/Dashboard/DashboardForms/EnseignentForm.vue";
import EnseignentFormModif from "./components/Dashboard/DashboardForms/EnseignentFormModif.vue";
import EnseignentList from "./components/Dashboard/DashboardList/EnseignentList.vue";
import PraticienFormateurForm from "./components/Dashboard/DashboardForms/PraticienFormateurForm.vue";
import PraticienFormateurList from "./components/Dashboard/DashboardList/PraticienFormateurList.vue";
import Faq from "./components/Home/Faq.vue";
import SignIn from "./components/Utils/SignIn.vue";
import SignUp from "./components/Utils/SignUp.vue";
import TermsOfUse from "./components/Utils/TermsOfUse.vue";
import EditUserProfile from "./components/UserProfile/EditUserProfile.vue";
import InfoExterne from "./components/Utils/InfoExterne.vue";

const routes = [
    { path: '/', component: HomePage, name: 'HomePage' },
    { path: '/sign_up', component: SignUp , name: 'sign_up'},
    { path: '/sign_in', component: SignIn , name: 'sign_in' },
    { path: '/terms_of_use', component: TermsOfUse, name: 'TermsOfUse' },
    { path: '/edit_user_profile', component: EditUserProfile },
    { path: '/map', component: Map, name: Map },
    { path: '/institution', component: Institution, name: Institution },
    { path: '/place', component: Place, name: Place },
    { path: '/profile', component: Profile, name: 'Profile' },
    { path: '/admin', component: AdminDashboard, name: 'AdminDashboard' },
    { path: '/institution_list', component: InstitutionList, name: 'InstitutionList' },
    { path: '/etudiant_list', component: EtudiantList },
    { path: '/institution_form/:id', component: InstitutionForm, name: 'InstitutionForm', props: true },
    { path: '/institution_form_modif/:id', component: InstitutionFormModif, name: 'InstitutionFormModif', props: true },
    { path: '/etudiant_form', component: EtudiantForm, name: 'EtudiantForm'  },
    { path: '/institution/:id', component: InstitutionDetails, name: 'InstitutionDetail', props: true },
    { path: '/place_details', component: PlaceDetails, name: 'place-details'},
    { path: '/pfp_details', component: PFPDetails, name: 'pfp-details'},
    { path: '/etudiant/:etuSlug', component: EtudiantDetails, name: 'etudiant-details', props: true },
    { path: '/new_user_form', component: NewUserForm, name: 'NewUserForm'  },
    { path: '/new_user_form_modif/:userId', component: NewUserFormModif, name: 'NewUserFormModif', props: true },
    { path: '/user_list', component: UserList, name: 'UserList' },
    { path: '/enseignent_form', component: EnseignentForm, name: 'EnseignentForm'  },
    { path: '/enseignent_form_modif/:enseignantId', component: EnseignentFormModif, name: 'EnseignentFormModif', props: true },
    { path: '/enseignent_list', component: EnseignentList, name: 'EnseignentList' },
    { path: '/praticien_formateur_form', component: PraticienFormateurForm, name: 'PraticienFormateurForm'  },
    { path: '/praticien_formateur_form_modif/:praticienFormateurId', component: PraticienFormateurForm, name: 'PraticienFormateurFormModif', props: true },
    { path: '/praticien_formateur_list', component: PraticienFormateurList, name: 'PraticienFormateurList' },
    { path: '/info_externe', component: InfoExterne, name: 'InfoExterne' },
    { path: '/faq', component: Faq, name: 'Faq' },
    { path: '/votation_preview', component: VotationPreview, name: 'VotationPreview' },
    { path: '/validation', component: Validation, name: 'Validation' },
    { path: '/reception', component: Reception, name: 'Reception' },
    { path: '/votation', component: Votation, name: 'Votation' },
    { path: '/:pathMatch(.*)*', component: Error404, name: 'Error404' },

    // ... autres routes si nécessaires
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
