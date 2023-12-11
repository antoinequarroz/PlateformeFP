<template>
  <div class="container mt-5">
    <h1 class="mb-4">Nouveau praticien formateur</h1>
    <form @submit.prevent="addNewPraticienFormateur">
      <div class="mb-3">
        <label for="prenom" class="form-label">Prénom</label>
        <input type="text" class="form-control" id="prenom" v-model="prenom" required>
      </div>
      <div class="mb-3">
        <label for="nom" class="form-label">Nom</label>
        <input type="text" class="form-control" id="nom" v-model="nom" required>
      </div>

      <button type="submit" class="btn btn-primary">Ajouter</button>
    </form>
  </div>
</template>

<script>
import { db } from '../../../../firebase.js';
import { ref, get, set } from "firebase/database";

export default {
  name: 'PraticienFormateurForm',
  data() {
    return {
      prenom: '',
      nom: '',
    };
  },
  methods: {
    async addNewPraticienFormateur() {
      try {
        const praticiensFormateursRef = ref(db, 'praticiensFormateurs'); // Assurez-vous que cette référence est correcte

        // Obtenir les données actuelles pour compter le nombre de praticiens formateurs
        const snapshot = await get(praticiensFormateursRef);
        const praticiensFormateursData = snapshot.val();
        const nextPraticienFormateurId = praticiensFormateursData ? Object.keys(praticiensFormateursData).length + 1 : 1;

        // Création d'un nouveau praticien formateur avec un identifiant séquentiel
        const newPraticienFormateurRef = ref(db, 'praticiensFormateurs/' + nextPraticienFormateurId);
        await set(newPraticienFormateurRef, {
          Prenom: this.prenom,
          Nom: this.nom,
        });

        // Réinitialiser les champs du formulaire
        this.prenom = '';
        this.nom = '';

        // Rediriger vers la liste des praticiens formateurs
        // Assurez-vous que la route 'PraticienFormateurList' est correctement définie dans votre routeur
        this.$router.push({ name: 'PraticienFormateurList' });
      } catch (error) {
        console.error('Erreur d’ajout du nouveau praticien formateur', error);
      }
    }
  }
};
</script>

<style scoped>
/* Vos styles existants */
</style>
