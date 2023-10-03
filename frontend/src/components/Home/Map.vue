<template>
  <section class="position-relative overflow-hidden pt-5 pt-lg-3">
    <div class="container">
      <h1>Map</h1>
      <h3>Liste des différentes places de stages en Suisse</h3>
      <div class="row">
        <div class="col-lg-8 col-xl-9">
          <div class="row mb-4 align-items-center">
            <div class="col-xl-6">
              <form class="border rounded p-2">
                <div class="input-group input-borderless">
                  <input class="form-control me-1" type="search" placeholder="Trouver l'institution">
                  <button type="button" class="btn btn-primary mb-0 rounded z-index-1"><i class="fas fa-search"></i></button>
                </div>
              </form>
            </div>
          </div>
          <div id="map" style="height: 600px;"></div>
          <div v-if="selectedInstitution" class="mt-4">
            <div class="card">
              <div class="card-body">
                <h3>{{ selectedInstitution.Name }}</h3>
                <p>Lieu: {{ selectedInstitution.Lieu }}</p>
                <p>Canton: {{ selectedInstitution.Canton }}</p>
                <button class="btn btn-primary">
                  <a :href="selectedInstitution.URL.startsWith('https://') ? selectedInstitution.URL : 'https://' + selectedInstitution.URL" style="color: white" target="_blank">Site Web</a>
                </button>

              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-xl-3">
          <div class="offcanvas-lg offcanvas-end" tabindex="-1" id="offcanvasSidebar">
            <div class="offcanvas-header bg-light">
              <h5 class="offcanvas-title" id="offcanvasNavbarLabel">Filtre avancé</h5>
              <button type="button" class="btn-close" data-bs-dismiss="offcanvas" data-bs-target="#offcanvasSidebar" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body p-3 p-lg-0">
              <form>
                <div class="card card-body shadow p-4 mb-4">
                  <h4 class="mb-3">{{ category.title }}</h4>
                  <div class="col-12">
                    <div class="d-flex justify-content-between align-items-center" v-for="(value, key) in category.categories" :key="key">
                      <div class="form-check">
                        <input class="form-check-input" type="checkbox" v-model="category.categories[key]" :id="key">
                        <label class="form-check-label" :for="key">{{ key }}</label>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="card card-body shadow p-4 mb-4">
                  <h4 class="mb-3">{{ canton.title }}</h4>
                  <div class="row">
                    <div class="col-6" v-for="(value, key) in canton.cantons" :key="key">
                      <div class="d-flex justify-content-between align-items-center">
                        <div class="form-check">
                          <input class="form-check-input" type="checkbox" v-model="canton.cantons[key]" :id="key">
                          <label class="form-check-label" :for="key">{{ key }}</label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="d-flex justify-content-center">
                  <button class="btn btn-primary mb-0" type="button">Appliquer</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { db } from '../../../firebase.js';
import { ref, onValue } from "firebase/database";

export default {
  name: 'Map',
  data() {
    return {
      map: null,
      tileLayer: null,
      institutions: [],
      selectedInstitution: null,
      totalInstitutions: 0,
      displayedRange: {
        start: 1,
        end: 20
      },
      category: {
        title: "Catégories",
        categories: {
          AIGU: false,
          REA: false,
          MSQ: false,
          SYSINT: false,
          NEURO_GER: false,
          AMBU: false,
        }
      },
      canton: {
        title: "Cantons",
        cantons: {
          VD: false,
          VS: false,
          GE: false,
          FR: false,
          NE: false,
          JU: false,
          BE: false,
          SO: false,
          BS: false,
          BL: false,
          AG: false,
          ZH: false,
          SH: false,
          TG: false,
          TI: false,
          GR: false,
          LU: false,
          OW: false,
          NW: false,
          UR: false,
          SZ: false,
          ZG: false,
          GL: false,
          SG: false,
          AR: false,
          AI: false,
          FL: false,
          Étranger: false,
        }
      }
    };

  },
  mounted() {
    this.initMap();
    this.fetchInstitutionsFromFirebase();
  },
  methods: {
    initMap() {
      let mapOptions = {
        center: [46.22292, 7.3668],
        zoom: 10
      };
      this.map = new L.map('map', mapOptions);
      this.tileLayer = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
      this.tileLayer.addTo(this.map);
    },
    fetchInstitutionsFromFirebase() {
      const institutionsRef = ref(db, 'institutions/');
      onValue(institutionsRef, (snapshot) => {
        const data = snapshot.val();
        this.institutions = data ? Object.keys(data).map(key => ({ id: key, ...data[key] })) : [];
        this.totalInstitutions = this.institutions.length; // Mettre à jour le total ici
        this.addLocationsToMap();
      });
    },
    addLocationsToMap() {
      this.institutions.forEach(element => {
        new L.Marker([element.Latitude, element.Longitude]).addTo(this.map)
            .on('click', () => {
              this.selectedInstitution = element;
            });
      });
    },
  }
}
</script>

<style scoped>
</style>
