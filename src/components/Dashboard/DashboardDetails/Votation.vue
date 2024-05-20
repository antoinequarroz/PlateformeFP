<template>
  <div class="container-fluid mt-4">
    <div class="search-elements mb-3">
      <div class="classes-checkboxes text-center mb-3">
        <label><input type="checkbox" value="ba23" v-model="selectedClasses"> BA23</label>
        <label><input type="checkbox" value="ba22" v-model="selectedClasses"> BA22</label>
        <label><input type="checkbox" value="ba21" v-model="selectedClasses"> BA21</label>
        <label><input type="checkbox" value="PRO" v-model="selectedClasses"> PRO</label>
      </div>
      <div class="pfp-selection text-center mb-3">
        <select v-model="selectedPFP" class="form-select" @change="generatePFPInfo">
          <option disabled value="">Sélectionnez un PFP</option>
          <option value="PFP1A">PFP1A</option>
          <option value="PFP1B">PFP1B</option>
          <option value="PFP2">PFP2</option>
          <option value="PFP3">PFP3</option>
          <option value="PFP4">PFP4</option>
        </select>
      </div>
      <div class="text-center mb-3">
        <input v-model="search" placeholder="Recherche par nom ou prénom" class="form-control search-input">
      </div>
    </div>

    <div v-if="selectedPFP && selectedClasses.length > 0" class="table-responsive">
      <table class="table table-dark-gray align-middle p-4 mb-0 table-hover w-100 text-center">
        <thead>
          <tr>
            <th scope="col" class="border-0 rounded-start">Nom</th>
            <th scope="col" class="border-0">Prénom</th>
            <th scope="col" class="border-0">Répondant HES</th>
            <th scope="col" class="border-0">SAE</th>
            <th scope="col" class="border-0">Lesé</th>
            <th scope="col" class="border-0">Cas particulier</th>
            <th scope="col" class="border-0">Remarque</th>
            <th scope="col" class="border-0 rounded-end">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="etudiant in filteredEtudiants" :key="etudiant.id">
            <td>{{ etudiant.Nom }}</td>
            <td>{{ etudiant.Prenom }}</td>
            <td>{{ etudiant.responsableDeStage }}</td>
            <td>
              <input type="checkbox" v-model="etudiant.PFPinfo[selectedPFP].SAE" @change="updateStudent(etudiant)">
            </td>
            <td>
              <input type="checkbox" v-model="etudiant.PFPinfo[selectedPFP].Lese" @change="updateStudent(etudiant)">
            </td>
            <td>
              <input type="checkbox" v-model="etudiant.PFPinfo[selectedPFP].CasParticulier" @change="updateStudent(etudiant)">
            </td>
            <td>
              <input type="text" v-model="etudiant.PFPinfo[selectedPFP].Remarque" @change="updateStudent(etudiant)">
            </td>
            <td>
              <button class="btn btn-sm btn-danger-soft me-1 mb-1 mb-md-0"
                @click="deleteStudent(etudiant.id, etudiant.Classe)">Supprimer</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="selectedPFP && selectedClasses.length > 0" class="mt-3">
      <div class="text-center">
        <button class="btn btn-primary me-2" @click="createVotation('lese')">Créer votation pour Lesé</button>
        <button class="btn btn-primary" @click="createVotation()">Créer votation</button>
      </div>
    </div>

    <div class="mt-4">
      <h4>Total des étudiants: {{ filteredEtudiants.length }}</h4>
      <h4>Total SAE: {{ totalSAE }}</h4>
      <h4>Total Lesé: {{ totalLese }}</h4>
      <h4>Total Cas Particulier: {{ totalCasParticulier }}</h4>
    </div>
  </div>
</template>

<script>
import { db } from '../../../../firebase.js';
import { ref, onValue, set } from "firebase/database";
import { useRouter } from 'vue-router';

export default {
  name: "Votation",
  data() {
    return {
      etudiants: [],
      selectedClasses: [],
      search: '',
      selectedPFP: '',
    };
  },
  computed: {
    filteredEtudiants() {
      return this.etudiants.filter(etudiant => {
        const matchesClass = this.selectedClasses.includes(etudiant.Classe);
        const searchLower = this.search.toLowerCase();
        const matchesSearch = (etudiant.Nom ? etudiant.Nom.toLowerCase().includes(searchLower) : false) || (etudiant.Prenom ? etudiant.Prenom.toLowerCase().includes(searchLower) : false);
        return matchesClass && matchesSearch;
      });
    },
    totalSAE() {
      return this.filteredEtudiants.filter(etudiant => etudiant.PFPinfo && etudiant.PFPinfo[this.selectedPFP] && etudiant.PFPinfo[this.selectedPFP].SAE).length;
    },
    totalLese() {
      return this.filteredEtudiants.filter(etudiant => etudiant.PFPinfo && etudiant.PFPinfo[this.selectedPFP] && etudiant.PFPinfo[this.selectedPFP].Lese).length;
    },
    totalCasParticulier() {
      return this.filteredEtudiants.filter(etudiant => etudiant.PFPinfo && etudiant.PFPinfo[this.selectedPFP] && etudiant.PFPinfo[this.selectedPFP].CasParticulier).length;
    }
  },
  watch: {
    selectedClasses(newClasses) {
      this.fetchStudentsData();
    },
    selectedPFP(newPFP) {
      this.fetchStudentsData();
    }
  },
  methods: {
    async fetchStudentsData() {
      if (!this.selectedPFP || this.selectedClasses.length === 0) return;

      this.etudiants = [];
      for (const classe of this.selectedClasses) {
        const starCountRef = ref(db, `students/${classe}`);
        onValue(starCountRef, (snapshot) => {
          const studentsData = snapshot.val();
          if (studentsData) {
            const transformedData = Object.keys(studentsData).map(key => ({
              id: key,
              Classe: classe,
              PFPinfo: {},
              ...studentsData[key]
            }));
            this.etudiants = [...this.etudiants, ...transformedData];
          }
        });
      }
    },
    updateStudent(etudiant) {
      const studentRef = ref(db, `students/${etudiant.Classe}/${etudiant.id}`);
      set(studentRef, etudiant);
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
    createVotation(type) {
      if (type === 'lese') {
        this.$router.push({ name: 'VotationLese', params: { selectedClass: this.selectedClasses, selectedPFP: this.selectedPFP } });
      } else {
        alert(`Votation créée pour ${type || 'les stages'}`);
      }
    },
    generatePFPInfo() {
      if (!this.selectedPFP || this.selectedClasses.length === 0) return;

      for (const etudiant of this.filteredEtudiants) {
        if (!etudiant.PFPinfo) {
          etudiant.PFPinfo = {};
        }
        if (!etudiant.PFPinfo[this.selectedPFP]) {
          etudiant.PFPinfo[this.selectedPFP] = {
            dateDebut: '',
            dateFin: '',
            classe: etudiant.Classe,
            annee: new Date().getFullYear(),
            SAE: false,
            Lese: false,
            CasParticulier: false,
            Remarque: ''
          };
          this.updateStudent(etudiant);
        }
      }
    }
  },
  async mounted() {
    this.fetchStudentsData();
  }
};
</script>

<style scoped>
.search-elements {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

.classes-checkboxes label {
  margin-right: 15px;
  cursor: pointer;
}

.search-bar {
  position: relative;
  margin-top: 10px;
}

.search-input {
  padding: 8px;
  width: 100%;
  box-sizing: border-box;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.pfp-selection select {
  width: 50%;
}

.table-dark-gray {
  background-color: #343a40;
  color: #fff;
}

.table-dark-gray th, .table-dark-gray td {
  border-color: #454d55;
}

.btn-primary {
  background-color: #007bff;
  border-color: #007bff;
}

.btn-primary:hover {
  background-color: #0056b3;
  border-color: #004085;
}

.btn-danger-soft {
  color: #e55353;
  background-color: rgba(229, 83, 83, 0.1);
}

.btn-danger-soft:hover {
  background-color: rgba(229, 83, 83, 0.2);
}

.mt-3 {
  margin-top: 1rem !important;
}

.mt-4 {
  margin-top: 1.5rem !important;
}
</style>
