<template>
  <div>
    <div class="search-elements">
      <div class="search-bar text-center">
        <div class="">
          <input v-model="search" placeholder="Recherche par nom, prénom, ou email" class="search-input">
        </div>

      </div>
    </div>

    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-center">
                <h1 class="h3 mb-2">Liste des utilisateurs</h1>
                <p class="mb-2">Il y a {{ utilisateurs.length }} utilisateurs enregistrés dans la base de données</p>
                <div>
                  <button class="btn btn-sm btn-primary m-1" @click="goToUserForm">Ajouter un utilisateur</button>
                  <button class="btn btn-sm btn-secondary m-1" @click="goToAdminDashboard">Retour</button>
                </div>
              </div>
              <div class="table-responsive mt-3">
                <table class="table table-dark-gray align-middle p-4 mb-0 table-hover w-100 text-center">
                  <thead>
                  <tr>
                    <th scope="col" class="border-0 rounded-start">Nom</th>
                    <th scope="col" class="border-0">Prénom</th>
                    <th scope="col" class="border-0">Rôle</th>
                    <th scope="col" class="border-0">Email</th>
                    <th scope="col" class="border-0 rounded-end">Action</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="utilisateur in filteredUtilisateurs" :key="utilisateur.id">
                    <td>
                      <h6 class="table-responsive-title mb-0 ms-2">{{ utilisateur.Nom }}</h6>
                    </td>
                    <td>
                      <h6 class="table-responsive-title mb-0 ms-2">{{ utilisateur.Prenom }}</h6>
                    </td>
                    <td>
                      <h6 class="table-responsive-title mb-0 ms-2">{{ utilisateur.Role }}</h6>
                    </td>
                    <td>
                      <h6 class="table-responsive-title mb-0 ms-2">{{ utilisateur.Email }}</h6>
                    </td>
                    <td>
                      <button class="btn btn-sm btn-success-soft me-1 mb-1 mb-md-0" @click="goToUserFormModif(utilisateur.id)">Modifier</button>
                      <button class="btn btn-sm btn-danger-soft me-1 mb-1 mb-md-0"
                              @click="deleteUser(utilisateur.id)">Supprimer</button>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from '../../../../firebase.js';
import { ref, onValue, set } from "firebase/database";

export default {
  name: "UserList",

  data() {
    return {
      utilisateurs: [],
      search: '',
    };
  },

  computed: {
    filteredUtilisateurs() {
      return this.utilisateurs.filter(utilisateur => {
        const searchLower = this.search.toLowerCase();
        return utilisateur.Nom.toLowerCase().includes(searchLower)
            || utilisateur.Prenom.toLowerCase().includes(searchLower)
            || utilisateur.Email.toLowerCase().includes(searchLower);
      });
    }
  },

  async mounted() {
    try {
      const usersRef = ref(db, 'users/');
      onValue(usersRef, (snapshot) => {
        const usersData = snapshot.val();
        if (usersData) {
          this.utilisateurs = Object.keys(usersData).map(key => ({
            id: key,
            ...usersData[key]
          }));
        }
      });
    } catch (error) {
      console.error('Erreur de récupération des données', error);
    }
  },

  methods: {
    async deleteUser(userId) {
      if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
        try {
          const userRef = ref(db, 'users/' + userId);
          await set(userRef, null);
        } catch (error) {
          console.error('Erreur de suppression de l’utilisateur', error);
        }
      }
    },

    goToUserFormModif(userId) {
      this.$router.push({ name: 'NewUserFormModif', params: { userId } });
    },
    goToUserForm() {
      this.$router.push({ name: 'NewUserForm' });
    },
    goToAdminDashboard() {
      this.$router.push({ name: 'AdminDashboard' });
    },
  }
};
</script>

<style scoped>
/* Vos styles existants */
</style>
