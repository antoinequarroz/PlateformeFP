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
              <th>ID Stage</th>
              <th>Active</th>
              <th>ID Institution</th>
              <th>Secteur</th>
              <th>Praticien Formateur</th>
              <th>Nom Institution</th>
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
              <td>{{ stage.id }}</td>
              <td>{{ getInstitutionName(stage.idInstitution) }}</td>
              <td>{{ stage.idInstitution }}</td>
              <td>{{ stage.NpmPractitionerTrainer }}</td>
              <td>{{ stage.Sector }}</td>
              <td>{{ stage.AIGU }}</td>
              <td>{{ stage.REA }}</td>
              <td>{{ stage.REA }}</td>
              <td>{{ stage.MSQ }}</td>
              <td>{{ stage.SYSINT }}</td>
              <td>{{ stage.NEUROGER }}</td>
              <td>{{ stage.AMBU }}</td>
        

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

    };
  },

  watch: {
    anneeAcademique: 'fetchAnneeCivilRef',
    selectedPFP: 'fetchAnneeCivilRef',

  },

  methods: {
    displayValue(index) {
      return this.aiguValues[index];
    },

    async getAiguValue(stage_id, index) {
      const stagesRef = ref(db, 'stages');  // Assurez-vous que 'db' est correctement initialisé
      const stagesSnapshot = await get(stagesRef);
      console.log(index);
      console.log("bla");
      if (stagesSnapshot.exists()) {
        const stagesData = stagesSnapshot.val();
        const institutionIds = [];
        console.log("ble");

        for (const stageKey in stagesData) {
          const stage = stagesData[stageKey];
          console.log(stage.placedestages);
          const stage2 = stage.placedestages;
          console.log("blu");

          for (const stageKey2 in stage2) {
            const stage3 = stage2[stageKey2];
            console.log(stage);
            console.log("blo");

            for (const stageKey3 in stage3) {
              const stage4 = stage3[stageKey3];
              console.log(stage4);
              console.log("bloi");
              console.log(stage4.id + " - bla - " + stage_id);

              if (stage4.id === stage_id) {
                console.log("ok12ka");
                institutionIds.push(stage4);
                console.log("bli");

                console.log("ok12ka");
                console.log(stage4.Sector);
                console.log(institutionIds[index]);
                this.aiguValues[index] = "fds - 12";  // Mettre à jour la propriété réactive
              }
            }
          }





        }

        console.error('No matching stage found for given stage_id');
        return null;  // Retourner null si aucun stage correspondant n'est trouvé
      } else {
        console.error('No data available');
        return null;  // Retourner null si aucune donnée n'est disponible
      }
    },
    // ... autres méthodes ...


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
      console.log( this.institutions[idInstitution]?.Name);
      return this.institutions[idInstitution]?.Name || 'Nom inconnu';
    },
  },
  // Dans la section script
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

  mounted: async function () {
    console.log("okkkas");
    await this.fetchAndFilterStages();
    console.log("xy2z")

    await this.updateAllStageData();
    console.log("xyz")
    console.log("vla+ " + this.filteredStages);
    for (let index = 0; index < this.filteredStages.length; index++) {
      const stage = this.filteredStages[index];
      console.log(this.filteredStages[index]);
      console.log("okk112" + stage.id);
      await this.getAiguValue(stage.id, index);  // Appeler getAiguValue pour chaque stage
    }

    const institutionsRef = ref(db, 'institutions/');

    onValue(institutionsRef, (snapshot) => {
      if (snapshot.exists()) {
        this.institutions = snapshot.val();
      } else {
        console.error('Pas d’institutions disponibles');
        this.institutions = {};
      }
    });
  }

};
</script>

<style scoped>
/* Vos styles CSS ici si nécessaire */
</style>
