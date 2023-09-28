<template>
  <div class="container">
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
                <tr v-for="place in places"  :key="place.id">
                  <td>{{ place.idInstitution }}</td>
                  <td>{{ place.Sector }}</td>
                  <td>{{ place.NpmPractitionerTrainer }}</td>
                  <td>{{ getInstitutionName(place.idInstitution) }}</td>

                  <td><input type="checkbox" :checked="place.AIGU" @change="updateFirebase('AIGU', place)" /></td>
                  <td><input type="checkbox" :checked="place.REA" @change="updateFirebase('REA', place)" /></td>
                  <td><input type="checkbox" :checked="place.MSQ" @change="updateFirebase('MSQ', place)" /></td>
                  <td><input type="checkbox" :checked="place.SYSINT" @change="updateFirebase('SYSINT', place)" /></td>
                  <td><input type="checkbox" :checked="place.NEUROGER" @change="updateFirebase('NEUROGER', place)" /></td>
                  <td><input type="checkbox" :checked="place.AMBU" @change="updateFirebase('AMBU', place)" /></td>

                  <td><input type="checkbox" :checked="place.PFP2" @change="updateFirebase('PFP2', place)" /></td>
                  <td><input type="checkbox" :checked="place.PFP1A" @change="updateFirebase('PFP1A', place)" /></td>
                  <td><input type="checkbox" :checked="place.PFP1B" @change="updateFirebase('PFP1B', place)" /></td>
                  <td><input type="checkbox" :checked="place.PFP4" @change="updateFirebase('PFP4', place)" /></td>
                  <td><input type="checkbox" :checked="place.PFP3" @change="updateFirebase('PFP3', place)" /></td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
        <p v-else>Pas de places de stage disponibles</p>
      </div>
    </section>
  </div>
</template>



<script>
import { db } from '../../../../firebase.js';
import { ref, onValue, set, off, update } from "firebase/database";
import { watch } from 'vue'; // Importer le hook 'watch'
export default {
  name: 'PlaceDetails',
  data() {
    return {
      placedestages: [],
      institutions: {},

    };
  },

  methods:
  {

    async updateFirebase(field, place) {
      const placeRef = ref(db, `placedestage/${place.idInstitution}/${place.id}`); // Mettez à jour avec le chemin réel à votre place dans Firebase
      try {
        await update(placeRef, { [field]: !place[field] }); // Mettre à jour la valeur dans Firebase
      } catch (error) {
        console.error('Erreur de mise à jour de Firebase:', error);
      }
    },


    getInstitutionName(idInstitution) {
      return this.institutions[idInstitution]?.Name || 'Nom incondnu';
    },
  },
  mounted() {
    // Configurer Firebase
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
