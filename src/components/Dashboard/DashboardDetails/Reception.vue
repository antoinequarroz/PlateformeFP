<template>
  <div class="container">
    <section class="pt-5">
      <div class="container">

        <!-- Menu de sélection PFP -->
        <div class="mb-3">
          <h1>Reception Votatation</h1>

          <label for="classInput" class="form-label">Classe : 22</label> <br>
          <label for="classInput" class="form-label">PFP : PFP2 </label> <br>
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
              <td>XX - YY </td>
              <td>{{ stage.institution }} -</td>
              <td>{{ stage.canton }} - </td>
          
           
        
            </tr>
          </tbody>

        </table>

        <button @click="createPFP" class="btn btn-primary">Choisir ses choix pour la PFP</button>

      </div>
    </section>
  </div>
</template>
  
  
  
<script>
import { db } from '../../../../firebase.js';
import { ref, onValue, set, off, update, push, get, child } from "firebase/database";
import { watch, reactive } from 'vue';
export default {
  name: 'Reception',
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
.table-responsive {
  overflow-x: auto;
}

.table {
  width: 100%;
  max-width: 100%;
  margin-bottom: 1rem;
  background-color: transparent;
}

.table th,
.table td {
  padding: 0.5rem;
  vertical-align: top;
  border-top: 1px solid #dee2e6;
  font-size: 0.8rem; /* Réduire la taille de la police */
}

/* Assurez-vous que les cellules ne prennent pas plus de place que nécessaire */
.table td {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Pour les petits écrans, vous pouvez utiliser une requête média pour ajuster la taille de la police et la largeur des colonnes */
@media (max-width: 768px) {
  .table th,
  .table td {
    padding: 0.3rem;
    font-size: 0.7rem; /* Encore plus petit sur les appareils mobiles */
  }
}

/* Vos styles CSS ici si nécessaire */
</style>
  