<template>
  <section class="position-relative overflow-hidden pt-5 pt-lg-3">
    <div class="container">
      <h1>Carte interactive</h1>
      <p>Liste des différentes places de formation pratique de la filière physiothérapie de la HES-SO Valais-Wallis</p>
      <div class="row">
        <div class="col-lg-8 col-xl-9">
          <div class="row mb-4 align-items-center">
            <div class="col-xl-6">
              <form class="border rounded p-2">
                <div class="input-group input-borderless">
                  <input class="form-control me-1" type="search" v-model="searchQuery" placeholder="Trouver l'institution">
                  <button type="button" class="btn btn-primary mb-0 rounded z-index-1" @click="applySearchFilter"><i class="fas fa-search"></i></button>
                </div>
              </form>
            </div>
          </div>
          <div id="map" style="height: 600px; border-radius: 2%;"></div>
          <div v-if="selectedInstitution" class="mt-4">
            <div class="card">
              <div class="card-body">
                <h3 class="card-title">{{ selectedInstitution.Name }}</h3>
                <p class="mb-2">
                  <i class="fas fa-map-marker-alt text-primary"></i>
                  Lieu: {{ selectedInstitution.Lieu }}
                </p>
                <p class="mb-2">
                  <i class="fas fa-flag text-primary"></i>
                  Canton: {{ selectedInstitution.Canton }}
                </p>
                <a :href="selectedInstitution.URL.startsWith('https://') ? selectedInstitution.URL : 'https://' + selectedInstitution.URL" class="btn btn-primary" target="_blank">
                  <i class="fas fa-globe"></i>
                  Site Web
                </a>
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
      markers: [],
      allInstitutions: [],
      institutions: [],
      selectedInstitution: null,
      searchQuery: '',
      category: {
        title: "Catégories",
        categories: {
          AIGU: false,
          AMBU: false,
          MSQ: false,
          NEURO_GER: false,
          REA: false,
          SYSINT: false,
        }
      },
      canton: {
        title: "Cantons",
        cantons: {
          AG: false,
          AI: false,
          AR: false,
          BE: false,
          BL: false,
          BS: false,
          FL: false,
          FR: false,
          GE: false,
          GL: false,
          GR: false,
          JU: false,
          LU: false,
          NE: false,
          NW: false,
          OW: false,
          SG: false,
          SH: false,
          SO: false,
          SZ: false,
          TG: false,
          TI: false,
          UR: false,
          VD: false,
          VS: false,
          ZH: false,
          ZG: false,
          Étranger: false,
        }
      }
    };
  },
  computed: {
    filteredInstitutions() {
      return this.allInstitutions.filter(institution => {
        let matchesCategory = true;
        let matchesCanton = true;
        let matchesSearch = true;

        const selectedCategories = Object.keys(this.category.categories).filter(key => this.category.categories[key]);
        if (selectedCategories.length) {
          matchesCategory = selectedCategories.some(category => institution[category] === "x");
        }

        const selectedCantons = Object.keys(this.canton.cantons).filter(key => this.canton.cantons[key]);
        if (selectedCantons.length) {
          matchesCanton = selectedCantons.includes(institution.Canton);
        }

        if (this.searchQuery) {
          matchesSearch = institution.Name.toLowerCase().includes(this.searchQuery.toLowerCase());
        }

        return matchesCategory && matchesCanton && matchesSearch;
      });
    }
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
        this.allInstitutions = data ? Object.keys(data).map(key => ({ id: key, ...data[key] })) : [];
        this.addLocationsToMap();
      });
    },
    clearMarkers() {
      this.markers.forEach(marker => {
        this.map.removeLayer(marker);
      });
      this.markers = [];
    },
    addLocationsToMap() {
      this.clearMarkers();
      this.filteredInstitutions.forEach(element => {
        const marker = new L.Marker([element.Latitude, element.Longitude]).addTo(this.map)
            .on('click', () => {
              this.selectedInstitution = element;
            });
        this.markers.push(marker);
      });
    },
    applyFilters() {
      this.addLocationsToMap();
    }
  }
}
</script>

<style scoped>
</style>
