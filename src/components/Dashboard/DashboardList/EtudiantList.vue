<template>
  <div>
    <div class="search-elements">
      <div class="classes-checkboxes text-center">
        <label><input type="checkbox" value="ba23" v-model="classes"> BA23</label>
        <label><input type="checkbox" value="ba22" v-model="classes"> BA22</label>
        <label><input type="checkbox" value="ba21" v-model="classes"> BA21</label>
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
                      <th scope="col" class="border-0">Prénom</th>
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
                        <button class="btn btn-sm btn-success-soft me-1 mb-1 mb-md-0"
                          @click="goToEtudiantDetails(etudiant.id)">Détails</button>
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
import { getDatabase, ref, onValue, set, child } from "firebase/database";
import { useRouter } from 'vue-router';

export default {
  name: "EtudiantList",

  data() {
    return {
      etudiants: [],
      classes: ['ba21', 'ba22', 'ba23'], // Initialisation des classes disponibles
      search: '',
    };
  },
  methods: {
    // méthode pour naviguer vers la page des détails de l'étudiant
    goToEtudiantDetails(etudiantId) {
      this.$router.push({ name: 'EtudiantDetails', params: { id: etudiantId } });
    },
    
    async deleteStudent(studentId, classe) {
      if (confirm('Êtes-vous sûr de vouloir supprimer cet étudiant ?')) {
        try {
          const studentRef = ref(db, `students/${classe}/${studentId}`);
          await set(studentRef, null);
          this.etudiants = this.etudiants.filter(student => student.id !== studentId);
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
  },
  computed: {
    filteredEtudiants() {
      return this.etudiants.filter(etudiant => {
        const matchesClass = this.classes.length === 0 || this.classes.includes(etudiant.Classe);
        const searchLower = this.search.toLowerCase();

        const matchesSearch = (etudiant.Nom ? etudiant.Nom.toLowerCase().includes(searchLower) : false) || (etudiant.Prenom ? etudiant.Prenom.toLowerCase().includes(searchLower) : false);

        return matchesClass && matchesSearch;
      });
    }
  },

  async mounted() {
    try {
      // Boucle sur chaque classe pour récupérer les étudiants
      this.classes.forEach(classe => {
        const starCountRef = ref(db, `students/${classe}`);
        onValue(starCountRef, (snapshot) => {
          const studentsData = snapshot.val();
          if (studentsData) {
            const transformedData = Object.keys(studentsData).map(key => ({
              id: key,
              Classe: classe,
              ...studentsData[key]
            }));
            this.etudiants = [...this.etudiants, ...transformedData];
          }
        });
      });
    } catch (error) {
      console.error('Erreur de récupération des données', error);
    }
  },
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
