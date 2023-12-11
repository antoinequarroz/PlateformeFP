<template>
  <div class="container mt-5">
    <h1 class="mb-4">Nouvel utilisateur</h1>
    <form @submit.prevent="addNewUser">
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
      <button type="submit" class="btn btn-primary">Ajouter</button>
    </form>
  </div>
</template>

<script>
import { db } from '../../../../firebase.js';
import { ref, get, set } from "firebase/database";

export default {
  name: 'NewUserForm',
  data() {
    return {
      prenom: '',
      nom: '',
      role: '',
      email: '',
      institution: '',
    };
  },
  methods: {
    async addNewUser() {
      try {
        const usersRef = ref(db, 'users');

        // Obtenir les données actuelles pour compter le nombre d'utilisateurs
        const snapshot = await get(usersRef);
        const usersData = snapshot.val();
        const nextUserId = usersData ? Object.keys(usersData).length + 1 : 1;

        // Création d'un nouvel utilisateur avec un identifiant séquentiel
        const newUserRef = ref(db, 'users/' + nextUserId);
        await set(newUserRef, {
          Prenom: this.prenom,
          Nom: this.nom,
          Role: this.role,
          Email: this.email,
          Institution: this.institution,
        });

        // Réinitialiser les champs du formulaire
        this.prenom = '';
        this.nom = '';
        this.role = '';
        this.email = '';
        this.institution = '';

        // Rediriger vers la liste des utilisateurs
        this.$router.push({ name: 'UserList' });
      } catch (error) {
        console.error('Erreur d’ajout du nouvel utilisateur', error);
      }
    }
  }
};

</script>

<style scoped>
/* Vos styles existants */
</style>
