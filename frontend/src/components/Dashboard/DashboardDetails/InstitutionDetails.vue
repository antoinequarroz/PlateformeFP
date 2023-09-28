
<template>
  <div class="container">
    <section class="pt-5">
      <div class="container">
        <div class="row g-4 g-sm-5">
          <!-- ... comme précédemment pour la partie Left Sidebar ... -->
          <div class="col-xl-4">
            <div class="row justify-content-center">
              <div class="col-md-8 col-xl-12">
                <!-- Card START -->
                <div class="card shadow">
                  <div class="rounded-3">
                    <img :src="institution.Cyberlearn" alt="Image placeholder" />
                  </div>
                </div>
                <br>
                <div>
                  <button class="btn btn-primary-soft me-1 mb-1 mb-md-0 mb-3 col-3">Réserver</button>
                </div>
              </div>
            </div>
          </div>
          <!-- Main content START -->
          <div class="col-xl-8">
            <h1 class="mb-4">{{ institution.Name }}</h1>
            <div class="d-flex align-items-center mb-4">
              <h2 class="me-3 mb-0">{{ institution.Lieu }}</h2>
              <div>
                <a class="badge bg-primary bg-opacity-10 text-primary">{{ institution.Canton }}</a>
              </div>
            </div>

            <div class="mb-3">
              <label for="name">Nom:</label>
              <input type="text" id="name" v-model="institution.Name" class="form-control" />
            </div>

            <div class="mb-3">
              <label for="cyberlearn">Cyberlearn:</label>
              <input type="text" id="cyberlearn" v-model="institution.Cyberlearn" class="form-control" />
            </div>

            <div class="mb-3">
              <label for="lieu">Lieu:</label>
              <input type="text" id="lieu" v-model="institution.Lieu" class="form-control" />
            </div>

            <div class="mb-3">
              <label for="canton">Canton:</label>
              <input type="text" id="canton" v-model="institution.Canton" class="form-control" />
            </div>



            <div class="mb-3">
              <label for="street">Street:</label>
              <input type="text" id="street" v-model="institution.Street" class="form-control" />
            </div>

            <div class="mb-3">
              <label for="url">URL:</label>
              <input type="text" id="url" v-model="institution.URL" class="form-control" />
            </div>

            <div class="mb-3">
              <label for="nomResponsablePhysio">Nom Responsable Physio:</label>
              <input type="text" id="nomResponsablePhysio" v-model="institution.NomResponsablePhysio"
                class="form-control" />
            </div>

            <div class="mb-3">
              <label for="phoneResponsablePhysio">Téléphone Responsable Physio:</label>
              <input type="text" id="phoneResponsablePhysio" v-model="institution.PhoneResponsablePhysio"
                class="form-control" />
            </div>

            <div class="mb-3">
              <label for="emailResponsablePhysio">Email Responsable Physio:</label>
              <input type="email" id="emailResponsablePhysio" v-model="institution.EmailResponsablePhysio"
                class="form-control" />
            </div>

            <div class="mb-3 form-check">
              <input type="checkbox" id="aigu" v-model="institution.AIGU" class="form-check-input" />
              <label for="aigu" class="form-check-label">AIGU</label>
            </div>

            <div class="mb-3 form-check">
              <input type="checkbox" id="rea" v-model="institution.REA" class="form-check-input" />
              <label for="rea" class="form-check-label">REA</label>
            </div>

            <div class="mb-3 form-check">
              <input type="checkbox" id="ambu" v-model="institution.AMBU" class="form-check-input" />
              <label for="ambu" class="form-check-label">AMBU</label>
            </div>

            <div class="mb-3 form-check">
              <input type="checkbox" id="msq" v-model="institution.MSQ" class="form-check-input" />
              <label for="msq" class="form-check-label">MSQ</label>
            </div>

            <div class="mb-3 form-check">
              <input type="checkbox" id="neuroger" v-model="institution.NEUROGER" class="form-check-input" />
              <label for="neuroger" class="form-check-label">NEUROGER</label>
            </div>

            <div class="mb-3 form-check">
              <input type="checkbox" id="sysint" v-model="institution.SYSINT" class="form-check-input" />
              <label for="sysint" class="form-check-label">SYSINT</label>
            </div>

            <div>
              <ul v-if="placedestages && placedestages.length">
                <li v-for="placedestage in placedestages" :key="placedestage.id">
                  <h2>{{ placedestage.Sector }}</h2>
                  <ul>
                    <li>{{ placedestage.AIGU }}</li>
                    <li>{{ placedestage.AMBU }}</li>
                    <li>{{ placedestage.MSQ }}</li>
                    <li>{{ placedestage.NEUROGER }}</li>
                    <li>{{ placedestage.NpmPractitionerTrainer }}</li>
                    <li>{{ placedestage.REA }}</li>
                    <li>{{ placedestage.SYSINT }}</li>
                    <li>{{ placedestage.Sector }}</li>
                    <li>{{ placedestage.idInstitution }}</li>
                  </ul>
                </li>
              </ul>
              <p v-else>Pas de places de stage disponibles</p>
            </div>


            <div v-for="(stage, index) in stages" :key="index">
              <!-- Afficher les données de stage ici -->
            </div>
            <button @click="supprimerTousLesStages" class="btn btn-danger">Supprimer tous les stages</button>


            <div class="mb-3">
              <button @click="ajouterPlaceDeStage" class="btn btn-primary" :disabled="isStageAdded">Ajouter une place de
                stage</button>
            </div>

            <div v-for="(stage, index) in institution.stages" :key="index">
              <div class="mb-3">
                <label for="sector">Secteur:</label>
                <input type="text" :id="'sector-' + index" v-model="stage.Sector" class="form-control" />
              </div>

              <div class="mb-3">
                <label for="npmPractitionerTrainer">NPM Praticien Formateur:</label>
                <input type="text" :id="'npmPractitionerTrainer-' + index" v-model="stage.NpmPractitionerTrainer"
                  class="form-control" />
              </div>

              <!-- Les 5 Checkbox -->
              <div class="mb-3 form-check">
                <div v-for="(item, index) in institution.checkBoxItems" :key="index" class="mb-3 form-check">
                  <input type="checkbox" :id="item + '-' + index" v-model="stage[item]" class="form-check-input" />
                  <label :for="item + '-' + index" class="form-check-label">{{ item }}</label>
                </div>
                <div class="mb-3">
                  <button @click="envoyerDonnees" class="btn btn-primary">Envoyer les Données de Stage</button>
                </div>

              </div>
              <!-- ... autres checkbox ... -->
            </div>
          </div>
          <!-- Main content END -->
        </div>
      </div>
    </section>
  </div>
</template>

<script>

import { db } from '../../../../firebase.js';
import { ref, onValue, set, off, update } from "firebase/database";
import { watch } from 'vue'; // Importer le hook 'watch'

export default {
  name: 'InstitutionDetails',
  data() {
    return {
      isStageAdded: false,
      placedestages: [
        // ici, vous allez initialiser vos données de place de stage
        {
          AIGU: false,
          AMBU: false,
          MSQ: false,
          NEUROGER: false,
          NpmPractitionerTrainer: "fasd",
          REA: false,
          SYSINT: false,
          Sector: "fdsa",
          id: "stage-1695746026635",
          idInstitution: "-Neh_TtoZ491E9bvxjZQ"
        },
        // Ajoutez d'autres objets de stage si nécessaire
      ],
      institution: {
        Cyberlearn: '',
        Name: '',
        Lieu: '',
        Canton: '',
        Description: '',
        Street: '',
        URL: '',
        AIGU: false,
        REA: false,
        AMBU: false,
        MSQ: false,
        NEUROGER: false,
        SYSINT: false,
        NomResponsablePhysio: '',
        PhoneResponsablePhysio: '',
        EmailResponsablePhysio: '',

        // ... autres propriétés ...
        checkBoxItems: ['AIGU', 'REA', 'AMBU', 'MSQ', 'NEUROGER', 'SYSINT'],

        stages: [], // Assurez-vous que c'est bien un tableau vide
      },
      // Autres propriétés de l'institution ici

    };
  },
  methods: {




    supprimerTousLesStages() {
      this.institution.stages = [];
    },


    async envoyerDonnees() {
      try {
        const stageRef = ref(db, 'placedestage/' + this.$route.params.instSlug + "/");
        const newStageData = {};
        for (const stage of this.institution.stages) {
          newStageData[stage.id] = stage; // Structurer les données pour Firebase avec des ID uniques
        }
        await update(stageRef, newStageData); // Envoyer les données de stages à la table 'placedestage'
        this.institution.stages = [];
      } catch (error) {
        console.error('Erreur lors de l’envoi des données de stage:', error);
      }
    },


    ajouterPlaceDeStage() {
      this.isStageAdded = false; // Désactiver le bouton après avoir ajouté une place de stage

      const newStage = {
        id: `stage-${Date.now()}`, // Ajouter un ID unique basé sur le timestamp actuel
        Sector: '',
        NpmPractitionerTrainer: '',
        idInstitution: this.$route.params.instSlug,
      };

      for (const item of this.institution.checkBoxItems) {
        newStage[item] = false;
      }

      this.institution.stages.push(newStage);
    },
    // ... autres méthodes ...



  },




  async mounted() {

    // Configuration Firebase
    const instId = this.$route.params.instSlug; // Supposant que l'ID est passé en tant que paramètre de route
    console.log(instId);
    const instRef = ref(db, 'institutions/' + instId);

    // Récupérer la valeur initiale de l'institution depuis la base de données
    onValue(instRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        Object.assign(this.institution, data);
      } else {
        console.error('Institution does not exist');
      }
    }, {
      onlyOnce: true,
    });

    const placedestageRef = ref(db, 'placedestage/-Neh_TtoZ491E9bvxjZQ/');
    console.log("11d");

    onValue(placedestageRef, (snapshot) => {
      console.log("11a");

      if (snapshot.exists()) {
        console.log("11");
        const allPlacedestage = snapshot.val();
        const matchedPlacedestage = Object.values(allPlacedestage).filter(
          placedestage => placedestage.idInstitution === this.$route.params.instSlug

        );

        // Mettre à jour les données en temps réel
        this.placedestages = matchedPlacedestage;
        console.log("ffd");
      } else {
        console.error('Pas de placedestagess ddidsponibles');
        this.placedestages = [];
      }
    });


    // Mettre en place un watcher sur l'objet institution
    watch(() => this.institution, async (newVal) => {
      try {
        await set(instRef, newVal); // Mettre à jour la base de données à chaque changement
      } catch (error) {
        console.error('Error updatsing institution:', error);
      }
    }, { deep: true }); // L'option deep: true permet d'observer les propriétés imbriquées de l'objet institution
  },
  beforeUnmount() {
    if (this.placedestageRef) off(this.placedestageRef); // Detach the listener when the component is unmounted

  }

};

</script>

<style scoped>
/* Vos styles CSS ici si nécessaire */
</style>
