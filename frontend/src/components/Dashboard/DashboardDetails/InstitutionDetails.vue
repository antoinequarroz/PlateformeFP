<template>
  <div class="container mt-5">
    <h1 class="mb-4">{{ institutionDetails ? institutionDetails.Name : 'Chargement...' }}</h1>
    <p>{{ institutionDetails ? institutionDetails.Description : '' }}</p>
    <!-- Vous pouvez ajouter d'autres champs de l'institution ici -->
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
  props: {
    institutionId: {
      type: String,
      required: true
    }
  },
  mounted() {
    this.fetchInstitutionDetailsFromFirebase();
  },
  methods: {
    fetchInstitutionDetailsFromFirebase() {
      const institutionRef = ref(db, 'institutions/' + this.institutionId);
      onValue(institutionRef, (snapshot) => {
        this.institutionDetails = snapshot.val();
      });
    }
  }
}
</script>

<style scoped>
.form-control {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}
</style>
