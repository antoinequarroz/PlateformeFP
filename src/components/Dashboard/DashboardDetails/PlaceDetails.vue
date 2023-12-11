<template>
  <div class="container">
    <div class="row">
      <h1>Définissez les PFP</h1>

      <div class="col-8">
        <label for="annee_civil">Année Académique :</label>
        <select v-model="annee_civil" id="annee_civil">
          <option v-for="annee in anneescivils" :key="annee" :value="annee">{{ annee }}</option>
        </select>
        <div class="mt-3">
          <button @click="ajouterAnneecivil" class="btn btn-primary-soft">Ajouter Année Académique</button>
        </div>
      </div>
      <section class="pt-5">
        <div class="container">
          <div v-if="Object.keys(placedestages).length">
            <table class="table table-striped">
              <thead>
                <tr>
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
                  <th>PFP2</th>
                  <th>PFP1A </th>
                  <th>PFP1B </th>
                  <th>PFP4 </th>
                  <th>PFP3 </th>

                </tr>
              </thead>
              <tbody>
                <template v-for="(places, id) in placedestages">
                  <tr v-for="place in places" :key="place.id">
                    <td>{{ place.idInstitution }}</td>
                    <td>{{ place.Sector }}</td>
                    <td>{{ place.NpmPractitionerTrainer }}</td>
                    <td>{{ getInstitutionName(place.idInstitution) }}</td>

                    <td><input type="checkbox" :checked="place.AIGU" @change="updateFirebase('AIGU', place)" /></td>
                    <td><input type="checkbox" :checked="place.REA" @change="updateFirebase('REA', place)" /></td>
                    <td><input type="checkbox" :checked="place.MSQ" @change="updateFirebase('MSQ', place)" /></td>
                    <td><input type="checkbox" :checked="place.SYSINT" @change="updateFirebase('SYSINT', place)" /></td>
                    <td><input type="checkbox" :checked="place.NEUROGER" @change="updateFirebase('NEUROGER', place)" />
                    </td>
                    <td><input type="checkbox" :checked="place.AMBU" @change="updateFirebase('AMBU', place)" /></td>

                    <td>
                      <input type="checkbox" :checked="isStageChecked('PFP2', place.id)"
                        @change="toggleStage('PFP2', place.id, place, $event.target.checked)" />

                    </td>

                    <td>
                      <input type="checkbox" :checked="isStageChecked('PFP1A', place.id)"
                        @change="toggleStage('PFP1A', place.id, place, $event.target.checked)" />
                    </td>
                    <td>
                      <input type="checkbox" :checked="isStageChecked('PFP1B', place.id)"
                        @change="toggleStage('PFP1B', place.id, place, $event.target.checked)" />
                    </td>
                    <td>
                      <input type="checkbox" :checked="isStageChecked('PFP3', place.id)"
                        @change="toggleStage('PFP3', place.id, place, $event.target.checked)" />
                    </td>
                    <td>
                      <input type="checkbox" :checked="isStageChecked('PFP4', place.id)"
                        @change="toggleStage('PFP4', place.id, place, $event.target.checked)" />
                    </td>
                  </tr>
                </template>
              </tbody>
            </table>
          </div>
          <p v-else>Pas de places de stage disponibles</p>
        </div>
      </section>
    </div>
  </div>
</template>



<script>
import { db } from '../../../../firebase.js';
import { ref, onValue, set, off, get, update } from "firebase/database";
import { watch } from 'vue'; // Importer le hook 'watch'
import { reactive } from 'vue';

export default {
  name: 'PlaceDetails',
  data() {
    return {
      annee_civil: '',  // ajoutez cette ligne
      institutions: {},
      anneescivils: [],
      placedestages: [],
      stages: reactive({}),
    };
  },
  computed: {

  },
  watch: {
    async annee_civil(newValue) {
      console.log('Année académique sélectionnée:', newValue);
      await this.fetchStages(newValue);
    },
  },




  methods:

  {
    async toggleStage(pfp, stageId, place, isChecked) {
      try {
        console.log('toggleStage called', { pfp, stageId, place, isChecked });

        const annee = this.annee_civil;
        const stageRef = ref(db, `annees_civils/${annee}/${pfp}/${stageId}`);

        // Créer un objet avec toutes les informations à stocker
        const stageData = {
          active: isChecked,
          NpmPractitionerTrainer: place.NpmPractitionerTrainer,
          idInstitution: place.idInstitution,
          sector: place.Sector,
          NpmPractitionerTrainer: place.NpmPractitionerTrainer,
          AIGU:place.AIGU,
          REA: place.REA,
          MSQ: place.MSQ,
          SYSINT: place.SYSINT,
          NEUROGER: place.NEUROGER,
          AMBU: place.AMBU,
        };

        // Mettre à jour la valeur dans la base de données avec l'objet complet
        await set(stageRef, stageData);

        // Vérifiez que this.stages[pfp] et this.stages[pfp][stageId] sont bien définis
        if (!this.stages[pfp]) {
          this.stages[pfp] = {};
        }
        if (!this.stages[pfp][stageId]) {
          this.stages[pfp][stageId] = stageData;
        } else {
          this.stages[pfp][stageId] = stageData;
        }

        await this.fetchStages(this.annee_civil);  // re-fetch data after a change
      } catch (error) {
        console.error('Erreur lors de la mise à jour de l’état du stage dans la base de données:', error);
      }
    },





    async fetchStages(annee) {
      const stagesRef = ref(db, `annees_civils/${annee}`);
      onValue(stagesRef, (snapshot) => {
        if (snapshot.exists()) {
          this.stages = snapshot.val();
        } else {
          console.error('Pas de données de stage disponibles pour cette année académique');
          this.stages = {};
        }
      });
    },

    isStageChecked(pfp, stageId) {
      return this.stages[pfp]?.[stageId]?.active || false;
    },



    async ajouterAnneecivil() {
      const annee = prompt('Veuillez entrer la nouvelle année académique:');
      const nouvelleAnneeRef = ref(db, `annees_civils/${annee}`);



      if (annee) {
        try {
          // Récupérez tous les ID de stages de la table placedestage
          const placedestageRef = ref(db, 'placedestage/');
          let stagesIds = {};

          await onValue(placedestageRef, (snapshot) => {
            if (snapshot.exists()) {
              const allPlacedestage = snapshot.val();
              for (const id in allPlacedestage) {
                const places = allPlacedestage[id];
                for (const placeId in places) {
                  if (!stagesIds[placeId]) stagesIds[placeId] = {}; // Initialisez stagesIds[placeId] comme un objet si ce n'est pas déjà le cas
                  stagesIds[placeId].active = false; // Maintenant, vous pouvez assigner une propriété à stagesIds[placeId]
                  stagesIds[placeId].idInstitution = allPlacedestage[id].idInstitution; // Maintenant, vous pouvez assigner une propriété à stagesIds[placeId]
                  stagesIds[placeId].ra = "ra"; // Maintenant, vous pouvez assigner une propriété à stagesIds[placeId]
                }
              }
            }
          });


          // Créer une référence pour la nouvelle année académique dans Firebase
          await set(nouvelleAnneeRef, {
            PFP1A: stagesIds, // Ajoutez les ID de stages en tant qu'enfants de chaque PFP
            PFP2: stagesIds,
            PFP1B: stagesIds,
            PFP3: stagesIds,
            PFP4: stagesIds,
          });

          alert(`Année académique ${annee} ajoutée avec succès!`);
        } catch (error) {
          console.error('Erreur lors de l’ajout de l’année académique:', error);
          alert('Erreur lors de l’ajout de l’année académique. Veuillez réessayer.');
        }
      }
    },



    async updateFirebase(field, place) {
      const placeRef = ref(db, `placedestage/${place.idInstitution}/${place.id}`); // Mettez à jour avec le chemin réel à votre place dans Firebase
      try {
        await update(placeRef, { [field]: !place[field] }); // Mettre à jour la valeur dans Firebase
      } catch (error) {
        console.error('Erreur de mise à jour de Firebase:', error);
      }
    },


    getInstitutionName(idInstitution) {
      return this.institutions[idInstitution]?.Name || 'Nom inconnu';
    },
  },




  async mounted() {
    // Configurer Firebase
    await this.fetchStages(this.annee_civil);

    const annee = this.annee_civil;
    const stagesRef = ref(db, `annees_civils/${annee}`);

    const pfp2Ref = ref(db, `annees_civils/${this.annee_civil}/PFP2`);
    onValue(pfp2Ref, (snapshot) => {
      if (snapshot.exists()) {
        this.stages.PFP2 = snapshot.val();
      }
    });

    // Écouter les changements en temps réel et mettre à jour la propriété 'stages'
    // Écouter les changements en temps réel et mettre à jour la propriété 'stages'
    onValue(stagesRef, (snapshot) => {
      if (snapshot.exists()) {
        this.stages = snapshot.val();
      }
    });


    // Récupérer les années académiques de Firebase
    const anneescivilsRef = ref(db, 'annees_civils');
    onValue(anneescivilsRef, (snapshot) => {
      if (snapshot.exists()) {
        this.anneescivils = Object.keys(snapshot.val()); // Mettre à jour la propriété anneescivils avec les clés de l'objet récupéré
      } else {
        console.error('Pas d’années académiques disponibles');
        this.anneescivils = [];
      }
    });

    const placedestageRef = ref(db, 'placedestage/');
    console.log("ffd");


    onValue(placedestageRef, (snapshot) => {
      if (snapshot.exists()) {
        const allPlacedestage = snapshot.val();
        const validPlacedestage = {};

        // Filtrer les objets sans idInstitution valide
        for (const id in allPlacedestage) {
          const places = allPlacedestage[id];
          validPlacedestage[id] = Object.values(places).filter(place => place.idInstitution);
        }

        // Mettre à jour les données en temps réel
        this.placedestages = validPlacedestage;


      } else {
        console.error('Pas de placedestages disponibles');
        this.placedestages = [];
      }
    });


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
