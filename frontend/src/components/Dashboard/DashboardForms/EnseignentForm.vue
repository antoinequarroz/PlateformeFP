<template>
  <div class="container mt-5">
    <h1 class="mb-4">Nouvel enseignant</h1>
    <form @submit.prevent="addNewEnseignant">
      <div class="mb-3">
        <label for="prenom" class="form-label">Prénom</label>
        <input type="text" class="form-control" id="prenom" v-model="prenom" required>
      </div>
      <div class="mb-3">
        <label for="nom" class="form-label">Nom</label>
        <input type="text" class="form-control" id="nom" v-model="nom" required>
      </div>
      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <input type="email" class="form-control" id="email" v-model="email" required>
      </div>
      <button type="submit" class="btn btn-primary">Ajouter</button>
    </form>
  </div>
</template>

<script>
import { db } from '../../../../firebase.js';
import { ref, get, set } from "firebase/database";

export default {
  name: 'EnseignantForm',
  data() {
    return {
      prenom: '',
      nom: '',
      email: '',
    };
  },
  methods: {
    async addNewEnseignant() {
      try {
        const enseignantsRef = ref(db, 'enseignants');

        // Obtenir les données actuelles pour compter le nombre d'enseignants
        const snapshot = await get(enseignantsRef);
        const enseignantsData = snapshot.val();
        const nextEnseignantId = enseignantsData ? Object.keys(enseignantsData).length + 1 : 1;

        // Création d'un nouvel enseignant avec un identifiant séquentiel
        const newEnseignantRef = ref(db, 'enseignants/' + nextEnseignantId);
        await set(newEnseignantRef, {
          Prenom: this.prenom,
          Nom: this.nom,
          Email: this.email,
        });

        // Réinitialiser les champs du formulaire
        this.prenom = '';
        this.nom = '';
        this.email = '';

        // Rediriger vers la liste des enseignants
        // Assurez-vous que la route 'EnseignantList' est correctement définie dans votre routeur
        this.$router.push({ name: 'EnseignantList' });
      } catch (error) {
        console.error('Erreur d’ajout du nouvel enseignant', error);
      }
    }
  }
};
</script>

<style scoped>
/* Vos styles existants */
</style>
