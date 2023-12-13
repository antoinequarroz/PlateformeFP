<template>
  <div class="container">
    <section class="pt-5">
      <div class="container">

        <!-- Menu de sélection PFP -->
        <div class="mb-3">
          <h1>Créer une PFP</h1>
          <label for="pfpSelection" class="form-label">Sélectionnez un PFP</label>
          <select class="form-select" id="pfpSelection" v-model="selectedPFP" @change="filterPlacedestage">
            <option value="">Tous les PFPs</option>
            <option value="PFP1A">PFP1A</option>
            <option value="PFP1B">PFP1B</option>
            <option value="PFP2">PFP2</option>
            <option value="PFP3">PFP3</option>
            <option value="PFP4">PFP4</option>
          </select>
        </div>
        <div class="mb-3">
          <label for="classInput" class="form-label">Classe d'Étudiants SAE</label>
          <input type="text" id="classInput" v-model="classInput" class="form-control" @input="fetchStudents" />
          <label for="classInput" class="form-label">Date de début</label>

          <input type="date" v-model="dateDebut" class="form-control" placeholder="Date de début" />
          <label for="classInput" class="form-label">Date de fin</label>

          <input type="date" v-model="dateFin" class="form-control" placeholder="Date de fin" />
          <label for="classInput" class="form-label">Année Académique</label>

          <input type="text" v-model="anneeAcademique" class="form-control" placeholder="Année Académique" />

        </div>


        <table class="table table-striped">
          <thead>
            <tr>
              <th>Nom Institution</th>
              <th>Secteur</th>
              <th>Praticien Formateur</th>
              <th>AIGU </th>
              <th>REA </th>
              <th>MSQ </th>
              <th>SYSINT </th>
              <th>NEUROGER </th>
              <th>AMBU </th>
              <th>Cas particulier</th>
              <th>Étudiant SAE</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="stage in filteredStages" :key="stage.name">
              <td>{{ getInstitutionName(stage.idInstitution) }} </td>
              <td>{{ stage.NpmPractitionerTrainer }}</td>
              <td>{{ stage.sector }}</td>
              <td> <input type="checkbox" v-model="stage.AIGU"></td>
              <td> <input type="checkbox" v-model="stage.REA"></td>
              <td> <input type="checkbox" v-model="stage.MSQ"></td>
              <td> <input type="checkbox" v-model="stage.SYSINT"></td>
              <td> <input type="checkbox" v-model="stage.NEUROGER"></td>
              <td> <input type="checkbox" v-model="stage.AMBU"></td>


              <td>
                <input type="checkbox" v-model="stage.SAE">
              </td>
              <td v-if="stage.SAE">
                <select v-model="stage.selectedStudent" @change="handleStudentSelection(stage)">
                  <option v-for="student in etudiants" :value="student.id">{{ student.name }}</option>
                </select>
              </td>



            </tr>
          </tbody>
        </table>

        <button @click="createPFP" class="btn btn-primary">Créer PFP</button>

      </div>
    </section>
  </div>
</template>



<script>
import { db } from '../../../../firebase.js';
import { ref, onValue, set, off, update, push, get, child } from "firebase/database";
import { watch, reactive } from 'vue';
export default {
  name: 'PFPDetails',
  data() {
    return {
      anneeAcademique: '',
      selectedPFP: '',
      filteredPlacedestages: {}, // ou [] si c'est un tableau
      institutionIds: [],  // un tableau pour stocker les stages filtrés
      stageData: reactive({}),  // Utilisation de reactive pour une réactivité profonde
      fetchedData: null,  // pour stocker les données récupérées
      filteredStages: [],  // pour stocker les stages filtrés
      aiguValues: [],  // Assurez-vous que c'est bien initialisé
      institutions: {},
      students: [], // Liste d'étudiants à récupérer depuis votre base de données
      etudiants: [], // Ici seront stockés les étudiants


    };
  },

  watch: {
    anneeAcademique: 'fetchAnneeCivilRef',
    selectedPFP: 'fetchAnneeCivilRef',


  },

  methods: {

    initializePfpData() {
      this.pfpData = {};
      this.filteredStages.forEach(stage => {
        this.pfpData[stage.id] = { ...stage };
      });
    },
   
    async createPFP() {
      try {
        // Construisez l'identifiant pour l'année-PFP (par exemple, "23-PFP1A")
        const anneePFP = `${this.anneeAcademique}-${this.selectedPFP}`;
        console.log(anneePFP);
        // Construisez l'objet à enregistrer
        const pfpData = {};
        this.filteredStages.forEach(stage => {
          pfpData[stage.id] = { ...stage };  // Copiez chaque stage dans pfpData
        });

        // Chemin de référence dans Firebase où vous voulez sauvegarder les données
        const pfpRef = ref(db, `lieustage/${anneePFP}`);

        // Enregistrez les données dans Firebase
        await set(pfpRef, pfpData);
        console.log('PFP créé avec succès:', anneePFP);
      } catch (error) {
        console.error('Erreur lors de la création du PFP:', error);
      }
    },




    async fetchEtudiants() {
      try {
        const etudiantsRef = ref(db, 'etudiants');
        const snapshot = await get(etudiantsRef);
        if (snapshot.exists()) {
          const data = snapshot.val();
          this.etudiants = Object.keys(data).map(key => ({
            id: key,
            name: `${data[key].Prenom} ${data[key].Nom}`,
            ...data[key]
          }));
        } else {
          console.error('Aucun étudiant trouvé');
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des étudiants:', error);
      }
    },


    handleStudentSelection(stage, event) {
      // Logique pour gérer la sélection d'un étudiant
      const selectedStudentId = event.target.value;
      // Vous pouvez maintenant utiliser selectedStudentId pour mettre à jour votre base de données ou effectuer d'autres actions
    },

    displayValue(index) {
      return this.aiguValues[index];
    },

  

    async fetchAndFilterStagess() {
      const stagesRef = ref(db, 'stages');  // Assurez-vous que 'db' est correctement initialisé
      const stagesSnapshot = await get(stagesRef);

      if (stagesSnapshot.exists()) {
        const stagesData = stagesSnapshot.val();
        const filteredStages = [];

        for (const stageKey in stagesData) {
          const stage = stagesData[stageKey];

          if (stage.anneeAcademique === '22' && stage.classInput === 'BA23') {
            for (const stageKey2 in stage) {
              const stage2 = stage[stageKey2];
              console.log("oki1212");
              console.log(stage2);
              for (const stageKey3 in stage2) {
                const stageF = stage2[stageKey3];
                console.log("oki1212");
                console.log(stageF);
                for (const stageKey4 in stageF) {
                  const stageD = stageF[stageKey4];
                  console.log("----a---- ");
                  console.log(stageD);
                  filteredStages.push(stageD);

                }
              }
            }

          }
        }

        // Mise à jour des variables de data
        this.filteredStages = filteredStages;
        console.log(filteredStages.placedestages);
      } else {
        console.error('No data available');
      }
    },

    async fetchStages() {
      const stageRef = ref(db, `annees_civils/${this.anneeAcademique}/${this.selectedPFP}`);
      const stageSnapshot = await get(stageRef);

      if (stageSnapshot.exists()) {
        const stagesData = stageSnapshot.val();
        const stagesArray = [];

        for (const stageKey in stagesData) {
          for (const stageName in stagesData[stageKey]) {
            stagesArray.push({ name: stageName, details: stagesData[stageKey][stageName].details });
          }
        }

        this.filteredStages = stagesArray;
      } else {
        console.error('No data available');
      }
    },
    filterPlacedestage() {
      this.fetchStages();
    },


    async preloadStageData() {
      const promises = this.filteredStages.map(stage => this.fetchStagesMatchingId(stage.id));
      const results = await Promise.all(promises);
      results.forEach((result, index) => {
        this.stageData[this.filteredStages[index].id] = result;
      });
    },

    async updateAllStageData() {
      const promises = this.filteredStages.map(stage => this.fetchStagesMatchingId(stage.id));
      const results = await Promise.all(promises);
      results.forEach((result, index) => {
        this.stageData[this.filteredStages[index].id] = result;
      });
    },


    async waitFetch(id) {
      const result = await this.fetchStagesMatchingId(id);
      console.log(result.AIGU);
      return result;  // maintenant, result contiendra les données, pas une Promesse
    },

    async fetchStagesMatchingId(stageId) {
      const stagesRef = ref(db, 'stages');

      // Récupérer tous les éléments de 'stage'
      const stagesSnapshot = await get(stagesRef);

      if (stagesSnapshot.exists()) {
        console.log("oui");

        const stagesData = stagesSnapshot.val();
        for (const stageKey in stagesData) {
          console.log(stageKey);

          const placedestageRef = child(stagesRef, `${stageKey}/placedestages`);

          // Récupérer tous les éléments de 'placedestage' pour le stage courant
          const placedestageSnapshot = await get(placedestageRef);

          if (placedestageSnapshot.exists()) {
            const placedestageData = placedestageSnapshot.val();
            console.log(placedestageData);
            for (const institutionId in placedestageData) {
              const institutionData = placedestageData[institutionId];

              // Vérifier chaque stage sous l'institution courante
              for (const innerStageId in institutionData) {
                const innerStageData = institutionData[innerStageId];

                if (innerStageData.id === stageId) {
                  // Trouvé une correspondance
                  console.log(`Match found:`, innerStageData);
                  this.stageData[stageId] = innerStageData;  // Mettez à jour stageData lorsque vous trouvez une correspondance

                  return innerStageData;  // retournez les données au lieu de les loguer

                }
              }
            }
          }
          else {
            console.log("no");
          }
        }
      } else {
        console.error('No data available');
      }
    },

    filterAnnee_civilRef() {
      // Transformez this.annee_civilRef en un tableau
      this.filteredStages = Object.entries(this.annee_civilRef).map(([id, stageData]) => ({
        id,
        ...stageData
      }));
      console.log(this.filteredStages);  // pour vérifier les données dans la console
    },

    fetchAnneeCivilRef() {
      if (this.anneeAcademique && this.selectedPFP) {
        console.log(`annees_civils/${this.anneeAcademique}/${this.selectedPFP}`);
        const refPath = `annees_civils/${this.anneeAcademique}/${this.selectedPFP}`;
        const anneeRef = ref(db, refPath);
        onValue(anneeRef, (snapshot) => {
          if (snapshot.exists()) {
            this.annee_civilRef = snapshot.val();
            this.filterAnnee_civilRef();
            console.log(refPath);
            console.log("okk");
            console.log(this.annee_civilRef);
            // je veux avoir this.annee_civilRef visible

          } else {
            console.error('Pas de données disponibles');
            this.annee_civilRef = {};
          }
        });
      } else {
        console.error('Année académique ou type de PFP non défini');
      }
    },

    getInstitutionName(idInstitution) {
      console.log(this.institutions[1]);
      console.log(idInstitution);
      return this.institutions[idInstitution]?.Name || 'Nom insconnu';
    },
  },
  // Dans la section script
  async mounted() {
    // ... Votre logique existante ...
    this.fetchEtudiants();
    this.initializePfpData();

    const institutionsRef = ref(db, 'institutions/');

    onValue(institutionsRef, (snapshot) => {
      if (snapshot.exists()) {
        this.institutions = snapshot.val();
        console.log
      } else {
        console.error('Pas d’institutions disponibles');
        this.institutions = {};
      }
    });

  },

  computed: {
    // ... autres propriétés calculées ...
    displayValues() {
      return this.aiguValues;
    },
    displayData() {
      // Créez une structure de données optimisée pour l'affichage
      return this.filteredStages.map(stage => ({
        ...stage,
        ...this.stageData[stage.id]
      }));
    }
  },

  

};
</script>

<style scoped>
/* Vos styles CSS ici si nécessaire */
</style>
