<template>
  <div>
    <InformationView />
    <InformationUtilisation />
    <VideoHomePage />
    <Faq />

  </div>
</template>

<script>
import { getAuth, onAuthStateChanged } from "firebase/auth";

import InformationView from "./InformationView.vue";
import Faq from "./Faq.vue";
import InformationUtilisation from "./InformationUtilisation.vue";
import VideoHomePage from "./VideoHomePage.vue";

export default {
  name: "HomePage",
  data() {
    return {
      user: null,  // Ajout de la propriété user pour suivre l'état de connexion
    };
  },

  components: {
    InformationView,
    Faq,
    InformationUtilisation,
    VideoHomePage,
  },
  // Ajoutez votre logique Vue.js ici si nécessaire
}
</script>

<style scoped>
/* Ajoutez vos styles CSS ici si nécessaire */
</style>
