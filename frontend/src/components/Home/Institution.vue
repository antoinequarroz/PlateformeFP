<template>
  <section class="position-relative overflow-hidden pt-5 pt-lg-3">
    <div class="container">
      <div class="row">
        <div class="col-lg-8 col-xl-9">
          <h1>Place de formation pratique (PFP)</h1>
          <br>

          <!-- Search option START -->
          <div class="row mb-4 align-items-center">
            <!-- Search bar -->
            <div class="col-xl-6">
              <form class="border rounded p-2">
                <div class="input-group input-borderless">
                  <input class="form-control me-1" type="search" placeholder="Trouver l'institution">
                  <button type="button" class="btn btn-primary mb-0 rounded z-index-1"><i class="fas fa-search"></i></button>
                </div>
              </form>
            </div>

            <!-- Select option -->
            <div class="col-xl-3 mt-3 mt-xl-0">
              <form class="border rounded p-2 input-borderless">
                <select class="form-select form-select-sm js-choice border-0" aria-label=".form-select-sm">
                  <option value="">Derniers ajouté</option>
                  <option>Premier ajouté</option>
                </select>
              </form>
            </div>

            <!-- Content -->
            <div class="col-12 col-xl-3 d-flex justify-content-between align-items-center mt-3 mt-xl-0">
              <!-- Advanced filter responsive toggler START -->
              <button class="btn btn-primary mb-0 d-lg-none" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasSidebar" aria-controls="offcanvasSidebar">
                <i class="fas fa-sliders-h me-1"></i> Voirt le filtre
              </button>
              <!-- Advanced filter responsive toggler END -->
              <p class="mb-0 text-end">voir les {{ displayedRangeStart }}-{{ displayedRangeEnd }} sur {{ totalInstitutions }} résultats</p>
            </div>
          </div>
          <!-- Search option END -->

          <!-- Content START -->
          <div class="row g-4">
            <!-- Card item START -->
            <div class="col-sm-6 col-xl-4" v-for="institution in paginatedInstitutions" :key="institution.id">
              <div class="card shadow h-100">
                <!-- Image -->
                <img :src="institution.src" class="card-img-top" alt="institution image">
                <!-- Card body -->
                <div class="card-body pb-0">
                  <!-- Badge and favorite -->
                  <div class="d-flex justify-content-between mb-2">
                    <a href="#" class="badge bg-purple bg-opacity-10 text-purple">{{ institution.Canton }}</a>
                  </div>
                  <!-- Title -->
                  <h5 class="card-title fw-normal"><a :href="institutionDetailsPath + institution.id">{{ institution.Name }}</a></h5>
                  <p class="mb-2 text-truncate-2">{{ institution.Description }}</p>
                  <span class="h6 fw-light mb-0">{{ institution.Street }}</span>
                </div>
                <!-- Card footer -->
                <div class="card-footer pt-0 pb-3">
                  <hr>
                  <div class="d-flex justify-content-between">
                    <span class="h6 fw-light mb-0">{{ institution.Lieu }}</span>
                  </div>
                </div>
              </div>
            </div>
            <!-- Card item END -->
          </div>

          <!-- Pagination -->
          <div class="col-12">
            <nav class="mt-4 d-flex justify-content-center" aria-label="navigation">
              <ul class="pagination pagination-primary-soft d-inline-block d-md-flex rounded mb-0">
                <li class="page-item">
                  <button class="page-link shadow-sm" @click="previousPage" :disabled="currentPage === 1">
                    <i class="fas fa-chevron-left"></i>
                  </button>
                </li>
                <li class="page-item" v-for="page in totalPages" :key="page" :class="{ active: page === currentPage }">
                  <button class="page-link shadow-sm" @click="currentPage = page">{{ page }}</button>
                </li>
                <li class="page-item">
                  <button class="page-link shadow-sm" @click="nextPage" :disabled="currentPage === totalPages">
                    <i class="fas fa-chevron-right"></i>
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <!-- Right sidebar START -->
        <div class="col-lg-4 col-xl-3 pt-7">
          <!-- Responsive offcanvas body START -->
          <div class="offcanvas-lg offcanvas-end" tabindex="-1" id="offcanvasSidebar">
            <div class="offcanvas-header bg-light">
              <h5 class="offcanvas-title" id="offcanvasNavbarLabel">Filtre avancé</h5>
              <button  type="button" class="btn-close" data-bs-dismiss="offcanvas" data-bs-target="#offcanvasSidebar" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body p-3 p-lg-0">
              <form>
                <div class="card card-body shadow p-4 mb-4">
                  <!-- Title -->
                  <h4 class="mb-3">{{ category.title }}</h4>
                  <!-- Category group -->
                  <div class="col-12">
                    <!-- Checkbox -->
                    <div class="d-flex justify-content-between align-items-center" v-for="(value, key) in category.categories" :key="key">
                      <div class="form-check">
                        <input class="form-check-input" type="checkbox" v-model="category.categories[key]" :id="key">
                        <label class="form-check-label" :for="key">{{ key }}</label>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="card card-body shadow p-4 mb-4">
                  <!-- Title -->
                  <h4 class="mb-3">{{ canton.title }}</h4>
                  <!-- Category group -->
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


                <!-- Skill level START -->
                <div class="card card-body shadow p-4 mb-4">
                  <!-- Title -->
                  <h4 class="mb-3">PFP</h4>
                  <ul class="list-inline mb-0">
                    <!-- Item -->
                    <li class="list-inline-item mb-2">
                      <input type="checkbox" class="btn-check" id="btn-check-12">
                      <label class="btn btn-light btn-primary-soft-check" for="btn-check-12">PFP1</label>
                    </li>
                    <!-- Item -->
                    <li class="list-inline-item mb-2">
                      <input type="checkbox" class="btn-check" id="btn-check-9">
                      <label class="btn btn-light btn-primary-soft-check" for="btn-check-9">PFP2</label>
                    </li>
                    <!-- Item -->
                    <li class="list-inline-item mb-2">
                      <input type="checkbox" class="btn-check" id="btn-check-10">
                      <label class="btn btn-light btn-primary-soft-check" for="btn-check-10">PFP3</label>
                    </li>
                    <!-- Item -->
                    <li class="list-inline-item mb-2">
                      <input type="checkbox" class="btn-check" id="btn-check-11">
                      <label class="btn btn-light btn-primary-soft-check" for="btn-check-11">PFP4</label>
                    </li>
                  </ul>
                </div>
                <!-- Skill level END -->

                <!-- Language START -->
                <div class="card card-body shadow p-4 mb-4">
                  <!-- Title -->
                  <h4 class="mb-3">Langues</h4>
                  <ul class="list-inline mb-0 g-3">
                    <!-- Item -->
                    <li class="list-inline-item mb-2">
                      <input type="checkbox" class="btn-check" id="btn-check-1">
                      <label class="btn btn-light btn-primary-soft-check" for="btn-check-1">Français</label>
                    </li>
                    <!-- Item -->
                    <li class="list-inline-item mb-2">
                      <input type="checkbox" class="btn-check" id="btn-check-2">
                      <label class="btn btn-light btn-primary-soft-check" for="btn-check-2">Allemand</label>
                    </li>

                    <li class="list-inline-item mb-2">
                      <input type="checkbox" class="btn-check" id="btn-check-3">
                      <label class="btn btn-light btn-primary-soft-check" for="btn-check-3">Bilingue</label>
                    </li>
                  </ul>
                </div>
                <!-- Language END -->

                <!-- Apply button -->
                <div class="d-flex justify-content-center">
                  <button class="btn btn-primary mb-0" type="button">Appliquer</button>
                </div>
              </form>
            </div>
          </div>
          <!-- Responsive offcanvas body END -->
        </div>
        <!-- Right sidebar END -->
      </div>
    </div>
  </section>
</template>

<script>
import { db } from '../../../firebase.js';
import { ref, onValue } from "firebase/database";

export default {
  name: 'Institution',
  data() {
    return {
      institutionDetailsPath: '/institution_details/',
      institutions: [],
      currentPage: 1,
      itemsPerPage: 21,
      totalInstitutions: 0,
      displayedRange: {
        start: 1,
        end: 21
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
  computed: {
    paginatedInstitutions() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.institutions.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.institutions.length / this.itemsPerPage);
    },
    displayedRangeStart() {
      return (this.currentPage - 1) * this.itemsPerPage + 1;
    },
    displayedRangeEnd() {
      return Math.min(this.currentPage * this.itemsPerPage, this.totalInstitutions);
    },
    totalPages() {
      return Math.ceil(this.institutions.length / this.itemsPerPage);
    }
  },
  mounted() {
    this.fetchInstitutionsFromFirebase();
  },
  methods: {
    fetchInstitutionsFromFirebase() {
      const institutionsRef = ref(db, 'institutions/');
      onValue(institutionsRef, (snapshot) => {
        const data = snapshot.val();
        this.institutions = data ? Object.keys(data).map(key => ({ id: key, ...data[key] })) : [];
        this.totalInstitutions = this.institutions.length; // Mettre à jour le total ici
      });
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    }
  }
}
</script>

<style scoped>
/* Si vous avez des styles dans "style.css", vous pouvez les intégrer ici. */
</style>