<template>
    <section class="py-0 bg-blue h-100px align-items-center d-flex h-200px rounded-0" >
      <div class="container">
        <div class="row">
          <div class="col-12 text-center">
            <h1 class="text-white">Soumettre une nouvelle institution</h1>
          </div>
        </div>
      </div>
    </section>

    <section>
      <div class="container">
        <div class="row">
          <div class="col-md-8 mx-auto text-center">
            <p class="text-center">Utilisez cette interface pour ajouter un nouveau cours au portail. Une fois que vous avez terminé d'ajouter l'élément, il sera examiné pour la qualité. Si approuvé, votre cours apparaîtra à la vente et vous serez informé par e-mail que votre cours a été accepté.</p>
          </div>

          <div class="card bg-transparent rounded-3 mb-5">
            <div id="stepper" class="bs-stepper stepper-outline">
              <div class="card-header bg-light border-bottom px-lg-5">
                <div class="bs-stepper-header" role="tablist">
                  <div class="step" data-target="#step-1">
                    <div class="d-grid text-center align-items-center">
                      <button type="button" class="btn btn-link step-trigger mb-0" role="tab" id="steppertrigger1" aria-controls="step-1">
                        <span class="bs-stepper-circle">1</span>
                      </button>
                      <h6 class="bs-stepper-label d-none d-md-block">Détail de l'institution</h6>
                    </div>
                  </div>
                  <div class="line"></div>

                  <div class="step" data-target="#step-2">
                    <div class="d-grid text-center align-items-center">
                      <button type="button" class="btn btn-link step-trigger mb-0" role="tab" id="steppertrigger2" aria-controls="step-2">
                        <span class="bs-stepper-circle">2</span>
                      </button>

                      <h6 class="bs-stepper-label d-none d-md-block">Informations supplémentaires</h6>
                    </div>
                  </div>
                  <div class="line"></div>

                  <div class="step" data-target="#step-3">
                    <div class="d-grid text-center align-items-center">
                      <button type="button" class="btn btn-link step-trigger mb-0" role="tab" id="steppertrigger3" aria-controls="step-3">
                        <span class="bs-stepper-circle">3</span>
                      </button>
                      <h6 class="bs-stepper-label d-none d-md-block">Médias de l'institution</h6>
                    </div>
                  </div>
                  <div class="line"></div>

                  <div class="step" data-target="#step-4">
                    <div class="d-grid text-center align-items-center">
                      <button type="button" class="btn btn-link step-trigger mb-0" role="tab" id="steppertrigger4" aria-controls="step-4">
                        <span class="bs-stepper-circle">4</span>
                      </button>
                      <h6 class="bs-stepper-label d-none d-md-block">Description</h6>
                    </div>
                  </div>
                </div>
              </div>

              <div class="card-body">
                <div class="bs-stepper-content">
                  <form onsubmit="return false">
                    <div id="step-1" role="tabpanel" class="content fade" aria-labelledby="steppertrigger1">
                      <h4>Détail de l'institution</h4>
                      <hr>
                      <div class="row g-4">
                        <!-- Champs de l'ancienne base de données -->
                        <div class="col-12">
                          <label for="name">Nom:</label>
                          <input type="text" id="name" v-model="institution.Name" class="form-control" />
                        </div>

                        <div class="col-12">
                          <label for="cyberlearn">Cyberlearn:</label>
                          <input type="text" id="cyberlearn" v-model="institution.Cyberlearn" class="form-control" />
                        </div>

                        <div class="col-6">
                          <label for="lieu">Lieu:</label>
                          <input type="text" id="lieu" v-model="institution.Lieu" class="form-control" />
                        </div>

                        <div class="col-6">
                          <label for="canton">Canton:</label>
                          <select id="canton" v-model="institution.Canton" class="form-control">
                            <option value="">-</option>
                            <option v-for="canton in cantons" :key="canton.code" :value="canton.code">{{ canton.name }}</option>
                          </select>
                        </div>

                        <div class="col-6">
                          <label for="street">Rue:</label>
                          <input type="text" id="street" v-model="institution.Street" class="form-control" />
                        </div>

                        <div class="col-3">
                          <label for="latitude">Latitude:</label>
                          <input type="text" id="latitude" v-model="institution.Latitude" class="form-control" placeholder="Ex: 48.8566" />
                        </div>

                        <div class="col-3">
                          <label for="longitude">Longitude:</label>
                          <input type="text" id="longitude" v-model="institution.Longitude" class="form-control" placeholder="Ex: 2.3522" />
                        </div>

                        <div class="col-12">
                          <label for="url">URL:</label>
                          <input type="text" id="url" v-model="institution.URL" class="form-control" />
                        </div>

                        <div class="d-flex justify-content-end mt-3">
                          <button class="btn btn-primary next-btn mb-0" @click="goToNextStep">Suivant</button>
                        </div>
                      </div>

                    </div>

                    <div id="step-2" role="tabpanel" class="content fade" aria-labelledby="steppertrigger2">

                      <h4>Informations supplémentaires</h4>
                      <hr>
                      <div class="row g-4">
                        <div class="col-8">
                          <label for="nomResponsablePhysio">Nom Responsable Physio:</label>
                          <input type="text" id="nomResponsablePhysio" v-model="institution.NomResponsablePhysio" class="form-control" />
                        </div>
                        <div class="col-4">
                          <label for="language">Langue:</label>
                          <select id="language" v-model="institution.Langue" class="form-control">
                            <option value="">-</option>
                            <option v-for="language in languages" :key="language" :value="language">{{ language }}</option>
                          </select>
                        </div>

                        <div class="col-4">
                          <label for="phoneResponsablePhysio">Téléphone Responsable Physio:</label>
                          <input type="text" id="phoneResponsablePhysio" v-model="institution.PhoneResponsablePhysio" class="form-control" />
                        </div>

                        <div class="col-4">
                          <label for="emailResponsablePhysio">Email Responsable Physio:</label>
                          <input type="email" id="emailResponsablePhysio" v-model="institution.EmailResponsablePhysio" class="form-control" />
                        </div>

                        <div class="col-4">
                          <label>Options :</label>
                          <div class="checkboxes-horizontal" v-for="item in institution.checkBoxItems" :key="item">
                            <input type="checkbox" :id="item" v-model="institution[item]" />
                            <label :for="item">{{ item }}</label>
                          </div>

                        </div>

                        <div class="d-flex justify-content-end mt-3">
                          <button class="btn btn-secondary prev-btn mb-0" @click="goToPrevStep">Précédent</button>
                          <button class="btn btn-primary next-btn mb-0" @click="goToNextStep">Suivant</button>
                        </div>
                      </div>
                    </div>

                    <div id="step-3" role="tabpanel" class="content fade" aria-labelledby="steppertrigger3">

                      <h4>Médias de l'institution</h4>
                      <hr>
                      <div class="row">
                        <div class="col-12">
                          <div class="text-center justify-content-center align-items-center p-4 p-sm-5 border border-2 border-dashed position-relative rounded-3">
                            <img src="" class="h-50px" alt="">
                            <div>
                              <h6 class="my-2">Téléchargez l'image du cours ici, ou <a href="#!" class="text-primary">Parcourir</a></h6>
                              <label style="cursor:pointer;">
                              <span>
                                <input class="form-control stretched-link" type="file" name="my-image" id="image" accept="image/gif, image/jpeg, image/png" />
                               </span>
                              </label>
                              <p class="small mb-0 mt-2"><b>Note:</b> Seulement JPG, JPEG et PNG. Nos dimensions suggérées sont 600px * 450px. Une image plus grande sera recadrée en 4:3 pour s'adapter à nos vignettes/aperçus.</p>
                            </div>
                          </div>

                          <div class="d-sm-flex justify-content-end mt-2">
                            <button type="button" class="btn btn-sm btn-danger-soft mb-3">Supprimer l'image</button>
                          </div>
                        </div>

                        <div class="col-12">
                          <h5>Télécharger l'image</h5>
                          <div class="col-12 mt-4 mb-5">
                            <label class="form-label">URL de l'image</label>
                            <input class="form-control" type="text" placeholder="Entrez l'URL de l'image">
                          </div>
                        </div>

                        <div class="d-flex justify-content-between mt-3">

                          <button class="btn btn-secondary prev-btn mb-0" @click="goToPrevStep">Précédent</button>
                          <button class="btn btn-primary next-btn mb-0" @click="goToNextStep">Suivant</button>

                        </div>
                      </div>

                    </div>
                    <div id="step-4" role="tabpanel" class="content fade" aria-labelledby="steppertrigger4">
                      <h4>Place de stage</h4>
                      <hr>

                      <div class="col-12">
                        <label for="description">Description du lieu:</label>
                        <textarea id="description" v-model="institution.Description" class="form-control" rows="5" placeholder="Entrez la description du lieu ici..."></textarea>
                      </div>

                      <div class="col-12 mt-4">
                        <h5>Place de Stage</h5>
                      </div>

                      <div class="col-6">
                        <label for="sector">Secteur:</label>
                        <input type="text" id="sector" v-model="institution.Sector" class="form-control" placeholder="Entrez le secteur ici..." />
                      </div>

                      <div class="col-6">
                        <label for="npmPractitionerTrainer">Npm Practitioner Trainer:</label>
                        <input type="text" id="npmPractitionerTrainer" v-model="institution.NpmPractitionerTrainer" class="form-control" placeholder="Entrez le Npm Practitioner Trainer ici..." />
                      </div>

                      <div class="d-flex justify-content-end mt-3">
                        <button class="btn btn-secondary prev-btn mb-0" @click="goToPrevStep">Précédent</button>
                        <button class="btn btn-primary next-btn mb-0" @click="envoyerDonnees">Envoyer</button>
                      </div>
                    </div>


                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
</template>

<script>
import { db } from '../../../../firebase.js';
import { ref, onValue, set, off, update } from "firebase/database";
import { watch } from 'vue';

export default {
  name: 'InstitutionForm',
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
        Sector: '',
        NpmPractitionerTrainer: ''
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
        {code : 'ET', name: 'Étranger'}
      ],
      languages: ['Allemand', 'Français', 'Bilingue'],
    };
  },
  mounted() {
    this.stepper = new Stepper(document.querySelector('.bs-stepper'));
    const instId = this.$route.params.instSlug;
    const instRef = ref(db, 'institutions/' + instId);
    onValue(instRef, (snapshot) => {
      const data = snapshot.val();
      Object.assign(this.institution, data);
    }, {
      onlyOnce: true,
    });
    const placedestageRef = ref(db, 'placedestage/' + this.$route.params.instSlug + '');
    onValue(placedestageRef, (snapshot) => {
      const allPlacedestage = snapshot.val();
      const matchedPlacedestage = Object.values(allPlacedestage).filter(
          placedestage => placedestage.idInstitution === this.$route.params.instSlug
      );
      this.placedestages = matchedPlacedestage;
    });
    watch(() => this.institution, async (newVal) => {
      await set(instRef, newVal);
    }, { deep: true });
  },
  beforeUnmount() {
    if (this.placedestageRef) off(this.placedestageRef);
  },
  methods: {
    goToNextStep() {
      this.stepper.next();
    },
    goToPrevStep() {
      this.stepper.previous();
    },
    supprimerTousLesStages() {
      this.institution.stages = [];
    },
    async envoyerDonnees() {
      const stageRef = ref(db, 'placedestage/' + this.$route.params.instSlug + "/");
      const newStageData = {};
      for (const stage of this.institution.stages) {
        newStageData[stage.id] = stage;
      }
      await update(stageRef, newStageData);
      this.institution.stages = [];
      this.$router.push({ name: 'InstitutionList' });
    },
    ajouterPlaceDeStage() {
      this.isStageAdded = false;
      const newStage = {
        id: `stage-${Date.now()}`,
        Sector: '',
        NpmPractitionerTrainer: '',
        idInstitution: this.$route.params.instSlug,
      };
      for (const item of this.institution.checkBoxItems) {
        newStage[item] = false;
      }
      this.institution.stages.push(newStage);
    },
    goToStep(stepNumber) {
      this.stepper.to(stepNumber);
    }
  }
};
</script>

<style scoped>

</style>


