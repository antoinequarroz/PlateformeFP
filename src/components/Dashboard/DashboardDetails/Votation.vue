<template>
  <div class="container">
    <section class="pt-5">
      <div class="container">
        <div class="mb-3">
          <h1>Votez pour votre place de PFP</h1>
          <!-- Affichage de l'ID de l'utilisateur connecté (si disponible) -->
          <p v-if="user">ID Utilisateur: {{ user.uid }}</p>
        </div>
        <table class="table table-striped">
          <thead>
          <tr>
            <th>Institution</th>
            <th>Canton</th>
            <th>Lieu</th>
            <th>Langue</th>
            <th>Secteur</th>
            <th>Praticien Formateur</th>
            <th>AIGU </th>
            <th>REA </th>
            <th>MSQ </th>
            <th>SYSINT </th>
            <th>NEUROGER </th>
            <th>AMBU </th>
            <th>Choix 1 </th>
            <th>Choix 2 </th>
            <th>Choix 3 </th>
            <th>Choix 4 </th>
            <th>Choix 5 </th>
            <th> </th>
            <th>ET Choix 1 </th>
            <th>ET Choix 2 </th>
            <th>ET Choix 3 </th>
            <th>ET Choix 4 </th>
            <th>ET Choix 5 </th>
            <th>ET Choix : Total</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(stage, index) in stages" :key="index">
            <!-- Les données de la table ici -->
          </tr>
          </tbody>
        </table>
        <button @click="choice" class="btn btn-primary">Choisir ses choix pour la PFP</button>
      </div>
    </section>
  </div>
</template>

<script>
import { getAuth, onAuthStateChanged } from "firebase/auth";
export default {
  name: 'Votation',
  data() {
    return {
      stages: [],
      user: null, // Ajouter l'utilisateur ici pour stocker l'état de l'utilisateur connecté
    };
  },
  created() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user; // Mettre à jour l'état de l'utilisateur lorsqu'il est connecté
      } else {
        this.user = null; // Réinitialiser l'état de l'utilisateur lorsqu'il est déconnecté
      }
    });
    // Supposons que fetchStages et d'autres méthodes nécessaires sont définies ici
  },
  methods: {
    choice() {
      // Méthode pour gérer le choix des utilisateurs
    },
    // Autres méthodes ici
  }
}
</script>

<style scoped>
/* Vos styles spécifiques au composant ici */
</style>
