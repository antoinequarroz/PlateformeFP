<template>
  <div class="container mt-5">
    <h1 class="mb-4">Modifier l'utilisateur</h1>
    <form @submit.prevent="updateUser">
      <div class="mb-3">
        <label for="prenom" class="form-label">Prénom</label>
        <input type="text" class="form-control" id="prenom" v-model="prenom" required>
      </div>
      <div class="mb-3">
        <label for="nom" class="form-label">Nom</label>
        <input type="text" class="form-control" id="nom" v-model="nom" required>
      </div>
      <div class="mb-3">
        <label for="role" class="form-label">Rôle</label>
        <select class="form-control" id="role" v-model="role" required>
          <option value="admin">Admin</option>
          <option value="PF">PF</option>
          <option value="Prof">Prof</option>
        </select>
      </div>
      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <input type="email" class="form-control" id="email" v-model="email" required>
      </div>
      <div class="mb-3">
        <label for="institution" class="form-label">Institution</label>
        <input type="text" class="form-control" id="institution" v-model="institution">
      </div>
      <button type="submit" class="btn btn-primary">Mettre à jour</button>
    </form>
  </div>
</template>
<script>
import { db } from '../../../../firebase.js';
import { ref, get, set } from "firebase/database";

export default {
  name: 'NewUserFormModif',
  props: {
    userId: String
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
    if (this.userId) {
      try {
        const userRef = ref(db, 'users/' + this.userId);
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
          const userData = snapshot.val();
          this.prenom = userData.Prenom || '';
          this.nom = userData.Nom || '';
          this.role = userData.Role || '';
          this.email = userData.Email || '';
          this.institution = userData.Institution || '';
        } else {
          console.error('Utilisateur non trouvé');
          // Gérer le cas où l'utilisateur n'est pas trouvé
        }
      } catch (error) {
        console.error('Erreur de chargement des données de l’utilisateur', error);
        // Gérer les erreurs de chargement des données
      }
    } else {
      console.error('Aucun ID d’utilisateur fourni');
      // Gérer le cas où aucun ID d'utilisateur n'est fourni
    }
  },
  methods: {
    async updateUser() {
      if (confirm('Êtes-vous sûr de vouloir mettre à jour cet utilisateur ?')) {
        try {
          const userRef = ref(db, 'users/' + this.userId);
          await set(userRef, {
            Prenom: this.prenom,
            Nom: this.nom,
            Role: this.role,
            Email: this.email,
            Institution: this.institution,
          });

          // Rediriger vers la liste des utilisateurs
          this.$router.push({ name: 'UserList' });
        } catch (error) {
          console.error('Erreur de mise à jour de l’utilisateur', error);
          // Gérer les erreurs de mise à jour
        }
      }
    }
  }
};
</script>

<style scoped>
/* Vos styles existants */
</style>
