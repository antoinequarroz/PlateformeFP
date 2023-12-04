<template>
  <div class="container">
    <section class="pt-5">
      <div class="container">

        <!-- Menu de sélection PFP -->
        <div class="mb-3">
          <h1>Valider la PFP</h1>

          <label for="classInput" class="form-label">Classe : </label> <br>
          <label for="classInput" class="form-label">PFP : </label> <br>
          <label for="classInput" class="form-label">Année académique</label> <br>
          <label for="classInput" class="form-label">Votre Email</label>

        


        </div>


        <table class="table table-striped">
          <thead>
            <tr>
              <th>Stage</th>
              <th>Institution</th>
              <th>Canton</th>
              <th>Lieu</th>
              <th>Langue</th>
              <th>Secteur</th>
              <th>Praticien Formateur</th>
              <th>Nom Institution</th>
              <th>AIGU </th>
              <th>REA </th>
              <th>MSQ </th>
              <th>SYSINT </th>
              <th>NEUROGER </th>
              <th>AMBU </th>
              <th>SAE </th>
              <th>ETUDIANT </th>

            </tr>
          </thead>
          <tbody>
            <tr v-for="(stage, index) in stages" :key="index">
              <td>{{ stage.id }}</td>
              <td>{{ stage.institution }} - </td>
              <td>{{ stage.canton }} -</td>
              <td>{{ stage.lieu }}</td>
              <td>{{ stage.langue }} -</td>
              <td>{{ stage.sector }} - </td>
              <td>{{ stage.NpmPractitionerTrainer }}</td>
              <td>{{ stage.nomInstitution }} -</td>
              <td>{{ stage.AIGU }}</td>
              <td>{{ stage.REA }}</td>
              <td>{{ stage.MSQ }}</td>
              <td>{{ stage.SYSINT }}</td>
              <td>{{ stage.NEUROGER }}</td>
              <td>{{ stage.AMBU }}</td>
     
              <td>{{ stage.SAE }} -</td>
              <td>{{ stage.STUDENT }} -</td>
            </tr>
          </tbody>

        </table>

        <button @click="createPFP" class="btn btn-primary">Valider PFP</button>

      </div>
    </section>
  </div>
</template>
  
  
  
<script>
import { db } from '../../../../firebase.js';
import { ref, onValue, set, off, update, push, get, child } from "firebase/database";
import { watch, reactive } from 'vue';
export default {
  name: 'Validation',
  data() {
    return {
      stages: [], // Ici seront stockées les informations des stages
    };
  },




  methods: {
    async fetchStages() {
      try {
        const stagesRef = ref(db, 'lieustage/23-PFP1A /');
        const snapshot = await get(stagesRef);
        if (snapshot.exists()) {
          this.stages = Object.values(snapshot.val());
          console.log("Okk");
          console.log("VAL : " + Object.values(snapshot.val()));
          console.log(this.stages);
        } else {
          console.error('Aucun stage trouvé dans lieustage/23-PFP1A');
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des stages:', error);
      }
    },
  },

  mounted() {
    this.fetchStages();
  },


};
</script>
  
<style scoped>
/* Vos styles CSS ici si nécessaire */
</style>
  