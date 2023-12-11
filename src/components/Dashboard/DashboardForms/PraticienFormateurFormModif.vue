<template>
  <div class="container mt-5">
    <h1 class="mb-4">Modifier le praticien formateur</h1>
    <form @submit.prevent="updatePraticienFormateur">
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

      <button type="submit" class="btn btn-primary">Mettre à jour</button>
    </form>
  </div>
</template>

<script>
import { db } from '../../../../firebase.js';
import { ref, get, set } from "firebase/database";

export default {
  name: 'PraticienFormateurModif',
  props: {
    praticienFormateurId: String
  },
  data() {
    return {
      prenom: '',
      nom: '',
      email: '',
    };
  },
  async mounted() {
    if (this.praticienFormateurId) {
      const praticienFormateurRef = ref(db, 'praticiensFormateurs/' + this.praticienFormateurId);
      try {
        const snapshot = await get(praticienFormateurRef);
        if (snapshot.exists()) {
          const data = snapshot.val();
          this.prenom = data.Prenom;
          this.nom = data.Nom;
          this.email = data.Email;
        } else {
          console.error('Praticien formateur non trouvé');
        }
      } catch (error) {
        console.error('Erreur de chargement des données du praticien formateur:', error);
      }
    } else {
      console.error('Aucun ID de praticien formateur fourni');
    }
  },
  methods: {
    async updatePraticienFormateur() {
      if (confirm('Êtes-vous sûr de vouloir mettre à jour ce praticien formateur ?')) {
        try {
          const praticienFormateurRef = ref(db, 'praticiensFormateurs/' + this.praticienFormateurId);
          await set(praticienFormateurRef, {
            Prenom: this.prenom,
            Nom: this.nom,
            Email: this.email,
          });
          this.$router.push({ name: 'PraticienFormateurList' });
        } catch (error) {
          console.error('Erreur de mise à jour du praticien formateur:', error);
        }
      }
    }
  }
};
</script>

<style scoped>
/* Vos styles existants */
</style>
