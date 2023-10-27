<template>
  <div class="container mt-5">
    <h1 class="mb-4">{{ institutionDetails ? institutionDetails.Name : 'Chargement...' }}</h1>
    <p>{{ institutionDetails ? institutionDetails.Description : '' }}</p>
    <p><strong>Canton:</strong> {{ institutionDetails ? institutionDetails.Canton : '' }}</p>
    <p><strong>Rue:</strong> {{ institutionDetails ? institutionDetails.Street : '' }}</p>
    <p><strong>Lieu:</strong> {{ institutionDetails ? institutionDetails.Lieu : '' }}</p>
    <img :src="institutionDetails ? institutionDetails.src : ''" alt="Image de l'institution" v-if="institutionDetails && institutionDetails.src">
  </div>
</template>

<script>
import { db } from '../../../../firebase.js';
import { ref, onValue } from "firebase/database";

export default {
  name: 'InstitutionDetails',
  data() {
    return {
      institutionDetails: null
    };
  },
  computed: {
    slug() {
      return this.$route.params.slug;
    }
  },
  mounted() {
    this.fetchInstitutionDetailsFromFirebase();
  },
  beforeDestroy() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  },
  methods: {
    fetchInstitutionDetailsFromFirebase() {
      const institutionRef = ref(db, `institutions/${this.slug}`);
      this.unsubscribe = onValue(institutionRef, (snapshot) => {
        if (snapshot.exists()) {
          this.institutionDetails = snapshot.val();
        } else {
          this.$router.push({ name: 'Error404' }); // Redirige vers la page d'erreur si l'institution n'est pas trouvée
        }
      });
    }
  }
}
</script>

<style scoped>
/* Si vous avez des styles spécifiques pour ce composant, ajoutez-les ici. */
</style>
