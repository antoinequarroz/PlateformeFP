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
                <h1 class="h3 mb-2">Liste des Praticiens Formateurs</h1>
                <p class="mb-2">Il y a {{ praticiensFormateurs.length }} Praticiens Formateurs enregistrés dans la base de données</p>
                <div>
                  <button class="btn btn-sm btn-primary m-1" @click="goToPraticienFormateurForm">Ajouter un praticien formateur</button>
                  <button class="btn btn-sm btn-secondary m-1" @click="goToAdminDashboard">Retour</button>
                </div>
              </div>
              <div class="table-responsive mt-3">
                <table class="table table-dark-gray align-middle p-4 mb-0 table-hover w-100 text-center">
                  <thead>
                  <tr>
                    <th scope="col" class="border-0 rounded-start">Nom</th>
                    <th scope="col" class="border-0">Prénom</th>
                    <th scope="col" class="border-0 rounded-end">Action</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="praticiensFormateurs in filteredPraticiensFormateurs" :key="praticiensFormateurs.id">
                    <td>{{ praticiensFormateurs.Nom }}</td>
                    <td>{{ praticiensFormateurs.Prenom }}</td>
                    <td>
                      <button class="btn btn-sm btn-success-soft me-1 mb-1 mb-md-0" @click="goToPraticienFormateurFormModif(praticiensFormateurs.id)">Modifier</button>
                      <button class="btn btn-sm btn-danger-soft me-1 mb-1 mb-md-0" @click="deletePraticienFormateur(praticiensFormateurs.id)">Supprimer</button>
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
  name: "PraticienFormateurList",

  data() {
    return {
      praticiensFormateurs: [],
      search: '',
    };
  },

  computed: {
    filteredPraticiensFormateurs() {
      return this.praticiensFormateurs.filter(praticienFormateur => {
        const searchLower = this.search.toLowerCase();
        return praticienFormateur.Nom.toLowerCase().includes(searchLower)
            || praticienFormateur.Prenom.toLowerCase().includes(searchLower)
            || praticienFormateur.Email.toLowerCase().includes(searchLower);
      });
    }
  },

  async mounted() {
    try {
      const praticiensFormateursRef = ref(db, 'praticiensFormateurs/');
      onValue(praticiensFormateursRef, (snapshot) => {
        const praticiensFormateursData = snapshot.val();
        if (praticiensFormateursData) {
          this.praticiensFormateurs = Object.keys(praticiensFormateursData).map(key => ({
            id: key,
            ...praticiensFormateursData[key]
          }));
        }
      });
    } catch (error) {
      console.error('Erreur de récupération des données des praticiens formateurs', error);
    }
  },

  methods: {
    async deletePraticienFormateur(praticienFormateurId) {
      if (confirm('Êtes-vous sûr de vouloir supprimer ce praticien formateur ?')) {
        try {
          const praticienFormateurRef = ref(db, 'praticiensFormateurs/' + praticienFormateurId);
          await set(praticienFormateurRef, null);
        } catch (error) {
          console.error('Erreur de suppression du praticien formateur', error);
        }
      }
    },

    goToPraticienFormateurFormModif(praticienFormateurId) {
      // Assurez-vous que la route et le nom du composant sont corrects
      this.$router.push({ name: 'PraticienFormateurFormModif', params: { praticienFormateurId } });
    },

    goToPraticienFormateurForm() {
      // Assurez-vous que la route et le nom du composant sont corrects
      this.$router.push({ name: 'PraticienFormateurForm' });
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
