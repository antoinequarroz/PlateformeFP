<template>
  <div>
    <div class="search-elements">
      <div class="classes-checkboxes text-center">
        <label><input type="checkbox" value="B23" v-model="classes"> B23</label>
        <label><input type="checkbox" value="B22" v-model="classes"> B22</label>
        <label><input type="checkbox" value="B21" v-model="classes"> B21</label>
        <label><input type="checkbox" value="PRO" v-model="classes"> PRO</label>
      </div>
      <div class="search-bar text-center">
        <input v-model="search" placeholder="Recherche par nom ou prénom" class="search-input">
      </div>
    </div>

    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-center">
                <h1 class="h3 mb-2">Liste des étudiants</h1>
                <p class="mb-2">Il y a {{ etudiants.length }} étudiants d'enregistrés dans la base de données</p>
                <div>
                  <button class="btn btn-sm btn-primary m-1" @click="goToEtudiantForm">Ajouter un étudiant</button>
                  <button class="btn btn-sm btn-secondary m-1" @click="goToAdminDashboard">Retour</button>

                </div>
              </div>
              <div class="table-responsive mt-3">
                <table class="table table-dark-gray align-middle p-4 mb-0 table-hover w-100 text-center">
                  <thead>
                    <tr>
                      <th scope="col" class="border-0 rounded-start">Nom</th>
                      <th scope="col" class="border-0">Prenom</th>
                      <th scope="col" class="border-0">Classe</th>
                      <th scope="col" class="border-0">Responsable stage</th>
                      
                      <th scope="col" class="border-0">E-Mail</th>
                      <th scope="col" class="border-0">SAE</th> <!-- Nouvelle Colonne -->

                      <th scope="col" class="border-0 rounded-end">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="etudiant in filteredEtudiants" :key="etudiant.id">
                      <td>
                        <h6 class="table-responsive-title mb-0 ms-2">{{ etudiant.Nom }}</h6>
                      </td>
                      <td>
                        <h6 class="table-responsive-title mb-0 ms-2">{{ etudiant.Prenom }}</h6>
                      </td>
                      <td>
                        <h6 class="table-responsive-title mb-0 ms-2">{{ etudiant.Classe }}</h6>
                      </td>
                      <td>
                        <h6 class="table-responsive-title mb-0 ms-2">{{ etudiant.responsableDeStage }}</h6>
                      </td> <!-- Nouvelle Cellule -->
                      <td>
                        <h6 class="table-responsive-title mb-0 ms-2">{{ etudiant.Email }}</h6>
                      </td>
                      <td>
                        <input type="checkbox" :checked="etudiant.SAE" disabled />
                      </td>
                      <td>
                        <button class="btn btn-sm btn-success-soft me-1 mb-1 mb-md-0">Détails</button>
                        <button class="btn btn-sm btn-success-soft me-1 mb-1 mb-md-0">Modifier</button>
                        <button class="btn btn-sm btn-danger-soft me-1 mb-1 mb-md-0"
                          @click="deleteStudent(etudiant.id)">Supprimer</button>
                        
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
import { getDatabase, ref, onValue, set } from "firebase/database";

export default {
  name: "EtudiantList",

  data() {
    return {
      etudiants: [],
      classes: [],
      search: '',
      sae: false, // la valeur par défaut, changez cela en fonction de la valeur récupérée de la base de données.

    };
  },

  computed: {
    filteredEtudiants() {
      return this.etudiants.filter(etudiant => {
        const matchesClass = this.classes.length === 0 || this.classes.includes(etudiant.Classe);
        const searchLower = this.search.toLowerCase();

        // Vérification de l'existence de Nom et Prenom avant d'appeler toLowerCase
        const matchesSearch =
          (etudiant.Nom ? etudiant.Nom.toLowerCase().includes(searchLower) : false)
          || (etudiant.Prenom ? etudiant.Prenom.toLowerCase().includes(searchLower) : false);

        return matchesClass && matchesSearch;
      });
    }
  },

  async mounted() {
    try {
      const starCountRef = ref(db, 'etudiants/');
      onValue(starCountRef, (snapshot) => {
        const studentsData = snapshot.val();
        if (studentsData) { // Vérification si les données existent
          this.etudiants = Object.keys(studentsData).map(key => ({
            id: key,
            ...studentsData[key]
          }));
        }
      });
    } catch (error) {
      console.error('Erreur de récupération des données', error);
    }
  },

  methods: {
    async deleteStudent(studentId) {
      if (confirm('Êtes-vous sûr de vouloir supprimer cet étudiant ?')) {
        try {
          const studentRef = ref(db, 'etudiants/' + studentId);
          await set(studentRef, null);
        } catch (error) {
          console.error('Erreur de suppression de l’étudiant', error);
        }
      }
    },

    goToEtudiantForm() {
      this.$router.push({ name: 'EtudiantForm' });
    },
    goToAdminDashboard() {
      this.$router.push({ name: 'AdminDashboard' });
    },
  }
};
</script>


<style scoped>
.search-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.classes-checkboxes label {
  margin-right: 15px;
  cursor: pointer;
}

.search-bar {
  position: relative;
}

.search-input {
  padding: 8px;
  width: 100%;
  box-sizing: border-box;
  border-radius: 5px;
  border: 1px solid #ccc;
}

</style>
