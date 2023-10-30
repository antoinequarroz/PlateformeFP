<template>
  <section class="pt-5">
    <div class="container" data-sticky-container>
      <div class="row g-4 g-sm-5">
        <div class="col-xl-4">
          <div data-sticky data-margin-top="80" data-sticky-for="992">
            <div class="row justify-content-center">
              <div class="col-md-8 col-xl-12">
                <div class="card shadow">
                  <div class="rounded-3">
                    <img src="https://eduport.webestica.com/assets/images/courses/4by3/11.jpg" class="card-img-top" alt="institution image">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-8">
          <h1 class="mb-4">{{ institutionDetails ? institutionDetails.Name : 'Chargement...' }}</h1>
          <div class="d-flex align-items-center mb-4">
            <!-- Vous pouvez ajouter une logique de notation ici si nécessaire -->
          </div>
          <ul class="list-inline mb-4">
            <!-- Vous pouvez ajouter une logique de prix ici si nécessaire -->
          </ul>
          <h4>Description</h4>
          <p><strong>Rue:</strong> {{ institutionDetails ? institutionDetails.Street : '' }}</p>
          <p><strong>Lieu:</strong> {{ institutionDetails ? institutionDetails.Lieu : '' }}</p>
          <p><strong>Langue:</strong> {{ institutionDetails ? institutionDetails.Langue : '' }}</p>
          <p><strong>Nom Responsable Physio:</strong> {{ institutionDetails ? institutionDetails.NomResponsablePhysio : '' }}</p>
          <p><strong>Téléphone Responsable Physio:</strong> {{ institutionDetails ? institutionDetails.PhoneResponsablePhysio : '' }}</p>
          <p><strong>URL:</strong> <a :href="institutionDetails ? institutionDetails.URL : ''">{{ institutionDetails ? institutionDetails.URL : '' }}</a></p>
        </div>
      </div>
    </div>
  </section>
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
    institutionId() {
      return this.$route.params.id;
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
      const institutionRef = ref(db, `institutions/${this.institutionId}`);
      this.unsubscribe = onValue(institutionRef, (snapshot) => {
        if (snapshot.exists()) {
          this.institutionDetails = snapshot.val();
        } else {
          this.$router.push({ name: 'Error404' });
        }
      });
    }
  }
}
</script>

<style scoped>
/* Si vous avez des styles spécifiques pour ce composant, ajoutez-les ici. */
</style>
