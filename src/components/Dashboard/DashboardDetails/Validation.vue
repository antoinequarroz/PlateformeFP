<template>
  <div class="container">
    <section class="pt-5">
      <div class="container">

        <!-- Menu de sélection PFP -->
        <div class="mb-3">
          <h1>Validation de la répartition </h1>

          <label for="classInput" class="form-label">Classe : B22 </label> <br>
          <label for="classInput" class="form-label">PFP : PFP2</label> <br>
          <label for="classInput" class="form-label">Année académique : 23</label> <br>

        


        </div>


        <table class="table table-striped">
          <thead>
            <tr>
              
              <th>ETUDIANT </th>
              <th>Institution</th>
              <th>Secteur</th>
              <th>Praticien Formateur</th>
              <th>Cas particulier</th>

            </tr>
          </thead>
          <tbody>
            <tr v-for="(stage, index) in stages" :key="index">
              <td>{{ stage.id }}</td>
              <td>{{ stage.institution }} - </td>
              <td>{{ stage.canton }} -</td>
              <td>{{ stage.lieu }}</td>
              <td>{{ stage.lieu }}</td>
              <td>{{ stage.lieu }}</td>
           
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
      // Modifier le chemin pour pointer vers les données de votation
      const studentName = "nom_de_l_etudiant"; // Remplacez par le nom de l'étudiant concerné
      const votationRef = ref(db, `votation/23/PFP2/${studentName}`);

      const snapshot = await get(votationRef);
      if (snapshot.exists()) {
        // Supposons que les données soient sous la forme d'un tableau de stages
        this.stages = Object.values(snapshot.val().choices);

        console.log("Stages récupérés :", this.stages);
      } else {
        console.error(`Aucun stage trouvé pour votation/23/PFP2/${studentName}`);
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
  