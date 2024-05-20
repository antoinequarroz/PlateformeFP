<template>
  <div class="container-fluid mt-4">
    <div class="search-elements mb-3">
      <div class="class-selection text-center mb-3">
        <select v-model="selectedClass" class="form-select" @change="fetchStudentsData">
          <option disabled value="">Sélectionnez une classe</option>
          <option value="ba23">BA23</option>
          <option value="ba22">BA22</option>
          <option value="ba21">BA21</option>
          <option value="PRO">PRO</option>
        </select>
      </div>
      <div class="pfp-selection text-center mb-3">
        <select v-model="selectedPFP" class="form-select" @change="fetchStudentsData">
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

    <div v-if="selectedPFP && selectedClass" class="table-responsive">
      <h3 class="mb-3">Étudiants sélectionnés en tant que Lesé</h3>
      <table class="table table-dark-gray align-middle p-4 mb-0 table-hover w-100 text-center">
        <thead>
          <tr>
            <th scope="col" class="border-0 rounded-start">Nom</th>
            <th scope="col" class="border-0">Prénom</th>
            <th scope="col" class="border-0">Classe</th>
            <th scope="col" class="border-0">Responsable stage</th>
            <th scope="col" class="border-0">E-Mail</th>
            <th scope="col" class="border-0">Remarque</th>
            <th scope="col" class="border-0">Place Sélectionnée</th>
            <th scope="col" class="border-0 rounded-end">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="etudiant in filteredEtudiants" :key="etudiant.id">
            <td>{{ etudiant.Nom }}</td>
            <td>{{ etudiant.Prenom }}</td>
            <td>{{ etudiant.Classe }}</td>
            <td>{{ etudiant.responsableDeStage }}</td>
            <td>{{ etudiant.Email }}</td>
            <td>{{ etudiant.PFPinfo[selectedPFP]?.Remarque }}</td>
            <td>{{ etudiant.PFPinfo[selectedPFP]?.selectedStageName }}</td>
            <td>
              <button class="btn btn-sm btn-danger-soft me-1 mb-1 mb-md-0"
                @click="deleteStudent(etudiant.id, etudiant.Classe)">Supprimer</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="selectedPFP && selectedClass" class="table-responsive mt-4">
      <h3 class="mb-3">Toutes les places de stages</h3>
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Institution</th>
            <th>Canton</th>
            <th>Lieu</th>
            <th>Secteur</th>
            <th>FR</th>
            <th>DE</th>
            <th>AIGU</th>
            <th>REA</th>
            <th>MSQ</th>
            <th>SYSINT</th>
            <th>Neuro</th>
            <th>AMBU</th>
            <th>Choisir</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(stage, index) in stages" :key="index">
            <td>{{ stage.Institution }}</td>
            <td>{{ stage.Canton }}</td>
            <td>{{ stage.Lieu }}</td>
            <td>{{ stage.domaine }}</td>
            <td v-if="stage.FR">&#9989;</td>
            <td v-else>&#10060;</td>
            <td v-if="stage.ALL">&#9989;</td>
            <td v-else>&#10060;</td>
            <td v-if="stage.Secteur.AIGU">&#9989;</td>
            <td v-else>&#10060;</td>
            <td v-if="stage.Secteur.REA">&#9989;</td>
            <td v-else>&#10060;</td>
            <td v-if="stage.Secteur.MSQ">&#9989;</td>
            <td v-else>&#10060;</td>
            <td v-if="stage.Secteur.SYSINT">&#9989;</td>
            <td v-else>&#10060;</td>
            <td v-if="stage.Secteur.NEUROGER">&#9989;</td>
            <td v-else>&#10060;</td>
            <td v-if="stage.Secteur.AMBU">&#9989;</td>
            <td v-else>&#10060;</td>
            <td>
              <input type="radio" :name="'stage-selection'" @change="selectStage(stage)">
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="d-flex justify-content-center mt-4">
      <button class="btn btn-primary" @click="submitVotes">Voter</button>
    </div>

    <div class="mt-4">
      <h4>Total des étudiants Lesé: {{ filteredEtudiants.length }}</h4>
    </div>
  </div>
</template>

<script>
import { db } from '../../../../firebase.js';
import { ref, onValue, set } from "firebase/database";

export default {
  name: "VotationLese",
  data() {
    return {
      etudiants: [],
      selectedClass: '',
      search: '',
      selectedPFP: '',
      stages: [],
      selectedStage: null
    };
  },
  computed: {
    filteredEtudiants() {
      return this.etudiants.filter(etudiant => {
        const matchesClass = etudiant.Classe === this.selectedClass;
        const matchesLese = etudiant.PFPinfo && etudiant.PFPinfo[this.selectedPFP] && etudiant.PFPinfo[this.selectedPFP].Lese;
        const searchLower = this.search.toLowerCase();
        const matchesSearch = (etudiant.Nom ? etudiant.Nom.toLowerCase().includes(searchLower) : false) || (etudiant.Prenom ? etudiant.Prenom.toLowerCase().includes(searchLower) : false);
        return matchesClass && matchesLese && matchesSearch;
      });
    }
  },
  methods: {
    async fetchStudentsData() {
      if (!this.selectedPFP || !this.selectedClass) return;

      this.etudiants = [];
      const starCountRef = ref(db, `students/${this.selectedClass}`);
      onValue(starCountRef, (snapshot) => {
        const studentsData = snapshot.val();
        if (studentsData) {
          const transformedData = Object.keys(studentsData).map(key => ({
            id: key,
            Classe: this.selectedClass,
            PFPinfo: {},
            ...studentsData[key]
          }));
          this.etudiants = transformedData;
        }
      });
    },
    async fetchStagesData() {
      const dbRef = ref(db, '/PFP3');
      onValue(dbRef, (snapshot) => {
        if (snapshot.exists()) {
          this.stages = Object.values(snapshot.val());
        } else {
          console.log("No stages data available");
        }
      }, (error) => {
        console.error("Error fetching stages data:", error);
      });
    },
    updateStudent(etudiant) {
      const studentRef = ref(db, `students/${etudiant.Classe}/${etudiant.id}`);
      set(studentRef, etudiant);
    },
    selectStage(stage) {
      this.selectedStage = stage;
      for (const etudiant of this.filteredEtudiants) {
        etudiant.PFPinfo[this.selectedPFP].selectedStageName = `${stage.Institution} - ${stage.Lieu}`;
        etudiant.PFPinfo[this.selectedPFP].selectedStageId = stage.id;
        this.updateStudent(etudiant);
      }
    },
    submitVotes() {
      alert("Votes enregistrés avec succès!");
      // Vous pouvez ajouter des actions supplémentaires ici, telles que la redirection de l'utilisateur.
    }
  },
  async mounted() {
    this.fetchStudentsData();
    this.fetchStagesData();
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

.class-selection select {
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
