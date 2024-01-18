<template>
  <div class="container">
    <section class="pt-5">
      <div class="container">

        <!-- Menu de sélection PFP -->
        <div class="mb-3">
          <h1>Votez pour votre place de PFP</h1>
        
        </div>


        <table class="table table-striped">
          <thead>
            <tr>
              <th>Institution</th>
              <th>Canton</th>
              <th>Lieu</th>
              <th>Langue</th>
              <th>Secteur</th>
              <th>Praticien Formateur</th>
              <th>AIGU </th>
              <th>REA </th>
              <th>MSQ </th>
              <th>SYSINT </th>
              <th>NEUROGER </th>
              <th>AMBU </th>

              <th>Choix 1 </th>
              <th>Choix 2 </th>
              <th>Choix 3 </th>
              <th>Choix 4 </th>
              <th>Choix 5 </th>

              <th> </th>

              <th>ET Choix 1 </th>
              <th>ET Choix 2 </th>
              <th>ET Choix 3 </th>
              <th>ET Choix 4 </th>
              <th>ET Choix 5 </th>
              <th>ET Choix : Total</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(stage, index) in stages" :key="index">
              <td>{{ getInstitutionName(stage.idInstitution) }} </td>
              <td>{{ getInstitutionCanton(stage.idInstitution) }} </td>
              <td>{{ getInstitutionLieu(stage.idInstitution) }} </td>
              <td>{{ getInstitutionLangue(stage.idInstitution) }} </td>


              <td>{{ stage.sector }} -</td>
              <td>{{ stage.NpmPractitionerTrainer }}</td>
              <td> <input type="checkbox" v-model="stage.AIGU" disabled></td>
              <td> <input type="checkbox" v-model="stage.REA" disabled></td>
              <td> <input type="checkbox" v-model="stage.MSQ" disabled></td>
              <td> <input type="checkbox" v-model="stage.SYSINT" disabled></td>
              <td> <input type="checkbox" v-model="stage.NEUROGER" disabled></td>
              <td> <input type="checkbox" v-model="stage.AMBU" disabled></td>

              <td v-for="n in 5" :key="n">
                <div class="mb-3 form-check">
                  <input type="checkbox" class="form-check-input" :checked="stage[`choice${n}`]"
                    :disabled="activeChoices[index] && activeChoices[index] !== n"
                    @change="() => handleCheckboxChange(index, n)" />
                </div>
              </td>
              <td> </td>
              <td>5</td>
              <td>5</td>
              <td>5</td>
              <td>5</td>
              <td>5</td>
              <td>55</td>

            </tr>
          </tbody>

        </table>

        <button @click="choice" class="btn btn-primary">Choisir ses choix pour la PFP</button>

      </div>
    </section>
  </div>
</template>
    
    
    
<script>
import { db } from '../../../../firebase.js';
import { ref, onValue, set, off, update, push, get, child } from "firebase/database";
import { watch, reactive } from 'vue';
export default {
  name: 'Votation',
  data() {
    return {
      stages: [], // Ici seront stockées les informations des stages
      choiceStates: {}, // Pour gérer l'état des choix
      activeChoices: {}, // Suivi des choix actifs pour chaque ligne
      selectedClasse: 'B22',
      selectedPFP: 'PFP2',
      selectedAnneeAcademique: '23',

    };
  },




  methods: {
    async choice() {
      try {
        // Créer un objet pour stocker les choix de l'étudiant
        const now = new Date();
        const formattedTime = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();

        const studentChoices = {
          studentName: "test " + formattedTime,
          choices: []
        };

        // Parcourir les stages et ajouter les ID des stages sélectionnés
        this.stages.forEach((stage, index) => {
          for (let i = 1; i <= 5; i++) {
            if (stage[`choice${i}`]) {
              studentChoices.choices.push(stage.id);
            }
          }
        });

        // Référence de la base de données Firebase pour enregistrer les choix
        const votationRef = ref(db, `votation/23/PFP2/${studentChoices.studentName}`);

        // Enregistrement des choix dans Firebase
        await set(votationRef, studentChoices);

        console.log("Choix enregistrés avec succès :", studentChoices);
      } catch (error) {
        console.error("Erreur lors de l'enregistrement des choix :", error);
      }
    },

    handleCheckboxChange(stageIndex, choiceIndex) {
      // Désactivez tous les choix pour cette ligne
      for (let i = 1; i <= 5; i++) {
        this.stages[stageIndex][`choice${i}`] = false;
      }

      // Activez la case à cocher sélectionnée
      this.stages[stageIndex][`choice${choiceIndex}`] = true;

      // Réinitialiser les choix pour les autres lignes dans la même colonne
      this.stages.forEach((stage, idx) => {
        if (idx !== stageIndex) {
          stage[`choice${choiceIndex}`] = false;
        }
      });
    },


    async fetchStages() {
      try {
        const stagesRef = ref(db, 'lieustage/23-PFP2/');
        const snapshot = await get(stagesRef);
        if (snapshot.exists()) {
          const stagesData = snapshot.val();
          // Filtrer les stages où 'selectedStudent' est vide
          this.stages = Object.values(stagesData).filter(stage => !stage.selectedStudent);

          console.log("Stages filtrés :", this.stages);
        } else {
          console.error('Aucun stage trouvé dans lieustage/23-PFP1A');
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des stages:', error);
      }
    },

    getInstitutionName(idInstitution) {
      return this.institutions[idInstitution]?.Name || 'Nom inconnu';
    },

    getInstitutionCanton(idInstitution) {
      return this.institutions[idInstitution]?.Canton || 'Canton inconnu';
    },

    getInstitutionLieu(idInstitution) {
      return this.institutions[idInstitution]?.Lieu || 'Lieu inconnu';
    },

    getInstitutionLangue(idInstitution) {
      return this.institutions[idInstitution]?.Langue || 'Langue inconnue';
    },
  },

  mounted() {
    this.fetchStages();

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



};
</script>
    
<style scoped>
/* Style pour les cases à cocher */
input[type="checkbox"] {
  /* Augmenter la taille de la case à cocher */
  width: 20px;
  height: 20px;

  /* Ajouter une bordure pour une meilleure visibilité */
  border: 2px solid #28a745;
  /* Vert */

  /* Ajouter un peu d'espace autour de la case à cocher */
  margin: 5px;
}

/* Style pour les cases à cocher cochées */
input[type="checkbox"]:checked {
  /* Changer la couleur de fond en vert lorsque la case est cochée */
  background-color: #28a745;
  /* Vert */
  border-color: #218838;
  /* Vert plus foncé */

  /* Pour conserver l'apparence de la coche (le "check") */
  -webkit-appearance: none;
  /* Pour Chrome et Safari */
  appearance: none;
  /* Standard */

  /* Créer une coche personnalisée */
  position: relative;
}

/* Style de la coche personnalisée */
input[type="checkbox"]:checked:after {
  content: '✔';
  /* Caractère de la coche */
  position: absolute;
  top: 1px;
  left: 4px;
  font-size: 18px;
  color: white;
}

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
  font-size: 0.8rem;
  /* Réduire la taille de la police */
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
    font-size: 0.7rem;
    /* Encore plus petit sur les appareils mobiles */
  }
}

/* Vos styles CSS ici si nécessaire */
</style>
    