<template>
  <div class="container">
    <section class="pt-5">
      <div class="container">

        <!-- Menu de sélection PFP -->
        <div class="mb-3">
          <h1>Preview des votations</h1>

          <label for="classInput" class="form-label">Classe : B22</label> <br>
          <label for="classInput" class="form-label">PFP : PFP2</label> <br>
          <label for="classInput" class="form-label">Année académique: 23</label> <br>

          <h3>Nombre d'étudiants ayant voté: {{ nombreEtudiantsVotants }}</h3>


        </div>


        <table class="table table-striped">
          <thead>
            <tr>
              <th>ETUDIANT</th>
              <th>Choix 1</th>
              <th>Choix 2</th>
              <th>Choix 3</th>
              <th>Choix 4</th>
              <th>Choix 5</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(votation, index) in votations" :key="index">
              <td>{{ votation.studentName }}</td>
              <td v-for="(choice, choiceIndex) in votation.choices" :key="choiceIndex"> {{
                getInstitutionName(getIdInstitution(choice) )}}  -  {{
                (getSector(choice) )}}
              </td>
            </tr>
          </tbody>
        </table>

        <button @click="algo" class="btn btn-primary">Lancer l'algo</button>

      </div>
    </section>
  </div>
</template>
  
  
  
<script>
import { db } from '../../../../firebase.js';
import { ref, onValue, set, off, update, push, get, child } from "firebase/database";
import { watch, reactive } from 'vue';
export default {
  name: 'Votation Preview',
  data() {
    return {
      votations: [], // Pour stocker les données de votation     
      institutions: [], // Pour stocker les données de votation     

      placedestages: [], // Ici seront stockées les informations des stages

    };
  },

  computed:{
    nombreEtudiantsVotants() {
      return this.votations.length;
    }
  },


  methods: {


    async fetchVotations() {
      try {
        const votationRef = ref(db, 'votation/23/PFP2');
        const snapshot = await get(votationRef);
        if (snapshot.exists()) {
          const votationData = snapshot.val();
          this.votations = Object.entries(votationData).map(([studentName, data]) => {
            return {
              studentName: studentName,
              choices: data.choices
            };
          });

          console.log("Votations récupérées :", this.votations);
        } else {
          console.error('Aucune votation trouvée pour 23/PFP2');
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des votations:', error);
      }
    },

    getIdInstitution(stageId) {
      console.log("yassdas");
      console.log(stageId);
      console.log(this.placedestages);
      return this.placedestages[stageId].idInstitution || 'ID inconnu';
    },

    getInstitutionName(idInstitution) {
      return this.institutions[idInstitution]?.Name || 'Nom inconnu';
    },

    getSector(stageId) {
      console.log("yassdas");
      console.log(stageId);
      console.log(this.placedestages);
      return this.placedestages[stageId].Sector || 'ID inconnu';
    },


  },
  mounted() {


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


    const placedestageRef = ref(db, 'placedestage');
    onValue(placedestageRef, (snapshot) => {
      if (snapshot.exists()) {
        const allStages = snapshot.val();
        const processedStages = {};

        for (const key in allStages) {
          const stage = allStages[key];
          console.log("Clé du stage principal :", key);

          // Créer un nouvel objet pour chaque stage

          // Parcourir tous les sous-éléments du stage  
          for (const subKey in stage) {
            console.log("Clé du sous-élément :", subKey, "; Valeur :", stage[subKey]);

            // Stocker les informations nécessaires dans processedStages
            processedStages[subKey] = stage[subKey];
          }
        }

        this.placedestages = processedStages;
        console.log("Stages traités :", this.placedestages);
      } else {
        console.error('Aucun placedestage trouvé');
        this.placedestages = {};
      }
    });



    this.fetchVotations();
  },


};
</script>
  
<style scoped>
/* Vos styles CSS ici si nécessaire */
</style>
  