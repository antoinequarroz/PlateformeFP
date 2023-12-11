<template>
  <div class="container mt-5">
    <h1 class="mb-4">Modifier les enseignants</h1>
    <form @submit.prevent="updateEnseignant">
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
  name: 'EnseignantFormModif',
  props: {
    enseignantId: String // Assurez-vous que ce nom correspond à celui passé en prop
  },
  data() {
    return {
      prenom: '',
      nom: '',
      role: '',
      email: '',
      institution: '',
    };
  },
  async mounted() {
    if (this.enseignantId) {
      try {
        const enseignantRef = ref(db, 'enseignants/' + this.enseignantId);
        const snapshot = await get(enseignantRef);
        if (snapshot.exists()) {
          const enseignantData = snapshot.val();
          this.prenom = enseignantData.Prenom || '';
          this.nom = enseignantData.Nom || '';
          this.role = enseignantData.Role || '';
          this.email = enseignantData.Email || '';
          this.institution = enseignantData.Institution || '';
        } else {
          console.error('Enseignant non trouvé');
        }
      } catch (error) {
        console.error('Erreur de chargement des données de l’enseignant', error);
      }
    } else {
      console.error('Aucun ID d’enseignant fourni');
    }
  },
  methods: {
    async updateEnseignant() {
      if (confirm('Êtes-vous sûr de vouloir mettre à jour cet enseignant ?')) {
        try {
          const enseignantRef = ref(db, 'enseignants/' + this.enseignantId);
          await set(enseignantRef, {
            Prenom: this.prenom,
            Nom: this.nom,
            Role: this.role,
            Email: this.email,
            Institution: this.institution,
          });

          // Rediriger vers la liste des enseignants
          this.$router.push({ name: 'EnseignantList' }); // Assurez-vous que la route est correcte
        } catch (error) {
          console.error('Erreur de mise à jour de l’enseignant', error);
        }
      }
    }
  }
};
</script>

<style scoped>
/* Vos styles existants */
</style>