
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

            <div v-for="(stage, index) in stages" :key="stage.id">
              <h2>Place de stage </h2>
              <br> Secteur :
              <input type="text" v-model="stage.Sector" @change="updateStage(stage, 'Sector')"> <br>
              Praticien Formateur : <input type="text" v-model="stage.NpmPractitionerTrainer"
                @change="updateStage(stage, 'NpmPractitionerTrainer')"><br>

              <input type="checkbox" v-model="stage.AIGU" @change="updateStage(stage, 'AIGU')"> AIGU<br>
              <input type="checkbox" v-model="stage.AMBU" @change="updateStage(stage, 'AMBU')"> AMBU<br>
              <input type="checkbox" v-model="stage.MSQ" @change="updateStage(stage, 'MSQ')"> MSQ<br>
              <input type="checkbox" v-model="stage.NEUROGER" @change="updateStage(stage, 'NEUROGER')"> NEUROGER<br>
              <input type="checkbox" v-model="stage.REA" @change="updateStage(stage, 'REA')"> REA<br>
              <input type="checkbox" v-model="stage.SYSINT" @change="updateStage(stage, 'SYSINT')"> SYSINT<br>

              <input type="checkbox" v-model="stage.active" @change="updateStage(stage, 'active')"> Active
              <br>
              <button @click="supprimerStage(stage.id)">Supprimer</button>
              <!-- Ajoutez d'autres champs ici en fonction des propriétés de votre objet stage -->
              <!-- ... -->
            </div>


<br> <br> <br> 

            <div class="mb-3">
              <button @click="ajouterPlaceDeStage" class="btn btn-primary">Ajouter une place de
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
import { ref, onValue, set ,remove } from "firebase/database";
import { watch } from 'vue';

export default {
  name: 'InstitutionFormModif',
  data() {
    return {
      stepper: null,
      isStageAdded: false,
      placedestages: [],
      institution: {
        Cyberlearn: '',
        Name: '',
        Lieu: '',
        Canton: '',
        Description: '',
        Street: '',
        URL: '',
        Latitude: '',
        Longitude: '',
        Langue: '',
        AIGU: false,
        REA: false,
        AMBU: false,
        MSQ: false,
        NEUROGER: false,
        SYSINT: false,
        NomResponsablePhysio: '',
        PhoneResponsablePhysio: '',
        EmailResponsablePhysio: '',
        checkBoxItems: ['AIGU', 'REA', 'AMBU', 'MSQ', 'NEUROGER', 'SYSINT'],
        stages: [],
      },
      cantons: [
        { code: 'AG', name: 'Argovie' },
        { code: 'AI', name: 'Appenzell Rhodes-Intérieures' },
        { code: 'AR', name: 'Appenzell Rhodes-Extérieures' },
        { code: 'BE', name: 'Berne' },
        { code: 'BL', name: 'Bâle-Campagne' },
        { code: 'BS', name: 'Bâle-Ville' },
        { code: 'FR', name: 'Fribourg' },
        { code: 'GE', name: 'Genève' },
        { code: 'GL', name: 'Glaris' },
        { code: 'GR', name: 'Grisons' },
        { code: 'JU', name: 'Jura' },
        { code: 'LU', name: 'Lucerne' },
        { code: 'NE', name: 'Neuchâtel' },
        { code: 'NW', name: 'Nidwald' },
        { code: 'OW', name: 'Obwald' },
        { code: 'SG', name: 'Saint-Gall' },
        { code: 'SH', name: 'Schaffhouse' },
        { code: 'SO', name: 'Soleure' },
        { code: 'SZ', name: 'Schwytz' },
        { code: 'TG', name: 'Thurgovie' },
        { code: 'TI', name: 'Tessin' },
        { code: 'UR', name: 'Uri' },
        { code: 'VD', name: 'Vaud' },
        { code: 'VS', name: 'Valais' },
        { code: 'ZG', name: 'Zoug' },
        { code: 'ZH', name: 'Zurich' },
        { code: 'ET', name: 'Étranger' }
      ],
      languages: ['Allemand', 'Français', 'Bilingue'],
    };
  },
  methods: {

    chargerStages() {
    const stagesRef = ref(db, `/placedestage/${this.$route.params.id}`);
    onValue(stagesRef, (snapshot) => {
      if (snapshot.exists()) {
        this.stages = Object.values(snapshot.val());
        this.showStages = true; // Affichez les stages une fois chargés
      } else {
        console.error('Pas de stages trouvés');
      }
    });
  },

    supprimerStage(stageId) {
      // Logique pour supprimer la place de stage
      const stageRef = ref(db, `/placedestage/${this.$route.params.id}/${stageId}`);
      remove(stageRef)
        .then(() => {
          console.log('Stage supprimé avec succès');
          // Mettre à jour la liste des stages localement après la suppression
          this.stages = this.stages.filter(stage => stage.id !== stageId);
        })
        .catch((error) => {
          console.error('Erreur lors de la suppression:', error);
        });
    },

    updateStage(stage, field) {
      // Mettre à jour la base de données Firebase pour ce stage spécifique
      const stageRef = ref(db, `placedestage/${stage.idInstitution}/${stage.id}`);
      set(stageRef, stage)
        .then(() => {
          console.log(`Stage ${field} mis à jour avec succès`);
        })
        .catch((error) => {
          console.error('Erreur lors de la mise à jour:', error);
        });
    },

    async supprimerTousLesStages() {
      try {
        const stageRef = ref(db, 'placedestage/' + this.$route.params.id + "/");
        await set(stageRef, []); // Videz les stages dans Firebase
        this.institution.stages = [];
        this.showSuccessMessage = true;
        this.successMessage = 'Tous les stages ont été supprimés avec succès.';
      } catch (error) {
        this.showErrorMessage = true;
        this.errorMessage = 'Erreur lors de la suppression des stages: ' + error.message;
      }
    },

    async envoyerDonnees() {
      if (this.validateFormData()) { // Ajouter une méthode de validation si nécessaire
        try {
          const stageRef = ref(db, 'placedestage/' + this.$route.params.id + "/");
          await set(stageRef, this.institution.stages);
          this.showSuccessMessage = true;
          this.successMessage = 'Les données de stage ont été envoyées avec succès.';
        } catch (error) {
          this.showErrorMessage = true;
          this.errorMessage = 'Erreur lors de l’envoi des données de stage: ' + error.message;
        }
      }
    },

    ajouterPlaceDeStage() {
      this.isStageAdded = false;

      const newStage = {
        id: `stage-${Date.now()}`,
        Sector: '',
        NpmPractitionerTrainer: '',

        AIGU: false,
        AMBU: false,
        MSQ: false,
        NEUROGER: false,
        REA: false,
        SYSINT: false,
        PFP1A: false,
        PFP1B: false,
        PFP2: false,
        PFP3: false,
        active: true,
        idInstitution: this.$route.params.id,
      };

      // Ajoutez le nouveau stage au tableau de stages

      // Envoi des données à Firebase (exemple de code)
      // Assurez-vous d'avoir une référence correcte à votre base de données
      const stageRef = ref(db, `placedestage/${this.$route.params.id}/${newStage.id}`);
      set(stageRef, newStage)
        .then(() => {
          console.log('Stage ajouté avec succès');
        })
        .catch((error) => {
          console.error('Erreur lors de l\'ajout du stage:', error);
        });
    },


    // fonction envoie sur firebase databsae realtime /place de stage/idInstution/
  },

  validateFormData() {
    // Implémenter la logique de validation ici
    // Retournez true si le formulaire est valide, sinon false
    return false

  },


  mounted() {
  // ... Votre logique existante ...
  this.fetchEtudiants();
},


  beforeMount() {
  const stagesRef = ref(db, `/placedestage/${this.$route.params.id}`);
  onValue(stagesRef, (snapshot) => {
    if (snapshot.exists()) {
      this.stages = Object.values(snapshot.val());
    } else {
      console.error('Pas de stages trouvés');
    }
  });
},



  async mounted() {
    const instId = this.$route.params.id; // L'ID de l'institution est passé en tant que paramètre de route
    const instRef = ref(db, 'institutions/' + instId);




    const stagesRef = ref(db, `/placedestage/${this.$route.params.id}`);
 

  
    onValue(stagesRef, (snapshot) => {
  if (snapshot.exists()) {
    console.log("Données récupérées :", snapshot.val());
    this.stages = Object.values(snapshot.val());
  } else {
    console.error('Pas de stages trouvés');
  }
});



    // Récupérer la valeur initiale de l'institution depuis la base de données
    onValue(instRef, (snapshot) => {
      if (snapshot.exists()) {
        this.institution = snapshot.val();
        // Après avoir récupéré les données, activez le bouton pour ajouter des stages
        this.isStageAdded = false;
      } else {
        console.error('Institution does not exist');
      }
    }, {
      onlyOnce: true,
    });

    const placedestageRef = ref(db, 'placedestage'); // Ajustement ici

    onValue(placedestageRef, (snapshot) => {
      if (snapshot.exists()) {
        const allPlaces = snapshot.val();
        this.placesDeStage = Object.values(allPlaces)
          .filter(place => place.institutionId === instId);
      } else {
        console.error('Pas de places de stage disponibles');
      }
    });


    // Mettre en place un watcher sur l'objet institution
    watch(() => this.institution, async (newVal) => {
      try {
        await set(instRef, newVal); // Mettre à jour la base de données à chaque changement
      } catch (error) {
        console.error('Error updating institution:', error);
      }
    }, { deep: true }); // L'option deep: true permet d'observer les propriétés imbriquées de l'objet institution
  },
};
</script>


<style scoped>
.stages-container {
  /* Styles pour le conteneur des stages */
}

.stage {
  border: 1px solid #ccc;
  padding: 15px;
  margin-bottom: 10px;
}

.field {
  margin-bottom: 10px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input[type="text"] {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.checkboxes {
  margin-bottom: 10px;
}

.checkboxes div {
  margin-bottom: 5px;
}
</style>