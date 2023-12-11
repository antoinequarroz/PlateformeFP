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
                <h1 class="h3 mb-2">Liste des Enseignants</h1>
                <p class="mb-2">Il y a {{ enseignants.length }} Enseignants enregistrés dans la base de données</p>
                <div>
                  <button class="btn btn-sm btn-primary m-1" @click="goToEnseignantForm">Ajouter un enseignant</button>
                  <button class="btn btn-sm btn-secondary m-1" @click="goToAdminDashboard">Retour</button>
                </div>
              </div>
              <div class="table-responsive mt-3">
                <table class="table table-dark-gray align-middle p-4 mb-0 table-hover w-100 text-center">
                  <thead>
                  <tr>
                    <th scope="col" class="border-0 rounded-start">Nom</th>
                    <th scope="col" class="border-0">Prénom</th>
                    <th scope="col" class="border-0">Email</th>
                    <th scope="col" class="border-0 rounded-end">Action</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="enseignant in filteredEnseignants" :key="enseignant.id">
                    <td>{{ enseignant.Nom }}</td>
                    <td>{{ enseignant.Prenom }}</td>
                    <td>{{ enseignant.Email }}</td>
                    <td>
                      <button class="btn btn-sm btn-success-soft me-1 mb-1 mb-md-0" @click="goToEnseignantFormModif(enseignant.id)">Modifier</button>
                      <button class="btn btn-sm btn-danger-soft me-1 mb-1 mb-md-0" @click="deleteEnseignant(enseignant.id)">Supprimer</button>
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
  name: "EnseignantList",

  data() {
    return {
      enseignants: [],
      search: '',
    };
  },

  computed: {
    filteredEnseignants() {
      return this.enseignants.filter(enseignant => {
        const searchLower = this.search.toLowerCase();
        return enseignant.Nom.toLowerCase().includes(searchLower)
            || enseignant.Prenom.toLowerCase().includes(searchLower)
            || enseignant.Email.toLowerCase().includes(searchLower);
      });
    }
  },

  async mounted() {
    try {
      const enseignantsRef = ref(db, 'enseignants/');
      onValue(enseignantsRef, (snapshot) => {
        const enseignantsData = snapshot.val();
        if (enseignantsData) {
          this.enseignants = Object.keys(enseignantsData).map(key => ({
            id: key,
            ...enseignantsData[key]
          }));
        }
      });
    } catch (error) {
      console.error('Erreur de récupération des données des enseignants', error);
    }
  },

  methods: {
    async deleteEnseignant(enseignantId) {
      if (confirm('Êtes-vous sûr de vouloir supprimer cet enseignant ?')) {
        try {
          const enseignantRef = ref(db, 'enseignants/' + enseignantId);
          await set(enseignantRef, null);
        } catch (error) {
          console.error('Erreur de suppression de l’enseignant', error);
        }
      }
    },

    goToEnseignantFormModif(enseignantId) {
      // Assurez-vous que la route et le nom du composant sont corrects
      this.$router.push({ name: 'EnseignentFormModif', params: { enseignantId } });
    },

    goToEnseignantForm() {
      // Assurez-vous que la route et le nom du composant sont corrects
      this.$router.push({ name: 'EnseignentForm' });
    },
    goToAdminDashboard() {
      // Assurez-vous que la route et le nom du composant sont corrects
      this.$router.push({ name: 'AdminDashboard' });
    },
  }
};
</script>

<style scoped>
/* Vos styles existants */
</style>
