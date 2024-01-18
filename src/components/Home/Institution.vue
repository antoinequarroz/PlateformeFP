<template>
  <section class="position-relative overflow-hidden pt-5 pt-lg-3">
    <div class="container">
      <div class="row">
        <div class="col-lg-8 col-xl-9">
          <h1>Institutions</h1>
          <br>
          <div class="row mb-4 align-items-center">
            <div class="col-xl-6">
              <form class="border rounded p-2">
                <div class="input-group input-borderless">
                  <input class="form-control me-1" type="search" placeholder="Trouver l'institution">
                  <button type="button" class="btn btn-primary mb-0 rounded z-index-1"><i class="fas fa-search"></i></button>
                </div>
              </form>
            </div>
            <div class="col-xl-3 mt-3 mt-xl-0">
              <form class="border rounded p-2 input-borderless">
                <select class="form-select form-select-sm js-choice border-0" aria-label=".form-select-sm">
                  <option value="">Derniers ajoutés</option>
                  <option>Premier ajouté</option>
                </select>
              </form>
            </div>
            <div class="col-12 col-xl-3 d-flex justify-content-between align-items-center mt-3 mt-xl-0">
              <button class="btn btn-primary mb-0 d-lg-none" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasSidebar" aria-controls="offcanvasSidebar">
                <i class="fas fa-sliders-h me-1"></i> Voir le filtre
              </button>
              <p class="mb-0 text-end">voir les {{ displayedRangeStart }}-{{ displayedRangeEnd }} sur {{ totalInstitutions }} résultats</p>
            </div>
          </div>
          <div class="row g-4">
            <div class="col-sm-6 col-xl-4" v-for="institution in paginatedInstitutions" :key="institution.id">
              <div class="card shadow h-100" @click.stop="goToDetails(institution.id)">
                <img :src="institution.imageUrl || 'https://eduport.webestica.com/assets/images/courses/4by3/10.jpg'" class="card-img-top img-card" :alt="institution.Name">
                <div class="card-body pb-0">
                  <div class="d-flex justify-content-between mb-2">
                    <a href="#" class="badge bg-purple bg-opacity-10 text-purple">{{ institution.Canton }}</a>
                  </div>
                  <h5 class="card-title fw-normal">
                    {{ institution.Name }}
                  </h5>
                  <p class="mb-2 text-truncate-2">{{ institution.Description }}</p>
                  <span class="h6 fw-light mb-0">{{ institution.Street }}</span>
                </div>
                <div class="card-footer pt-0 pb-3">
                  <hr>
                  <div class="d-flex justify-content-between">
                    <span class="h6 fw-light mb-0">{{ institution.Lieu }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
        <div class="col-lg-4 col-xl-3 pt-7">
          <div class="offcanvas-lg offcanvas-end" tabindex="-1" id="offcanvasSidebar">
            <div class="offcanvas-header bg-light">
              <h5 class="offcanvas-title" id="offcanvasNavbarLabel">Filtre avancé</h5>
              <button type="button" class="btn-close" data-bs-dismiss="offcanvas" data-bs-target="#offcanvasSidebar" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body p-3 p-lg-0">
              <form>
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
                <div class="card card-body shadow p-4 mb-4">
                  <h4 class="mb-3">PFP</h4>
                  <ul class="list-inline mb-0">
                    <li class="list-inline-item mb-2" v-for="(value, key) in level" :key="key">
                      <input type="checkbox" class="btn-check" :id="'btn-check-' + key">
                      <label class="btn btn-light btn-primary-soft-check" :for="'btn-check-' + key">{{ key }}</label>
                    </li>
                  </ul>
                </div>
                <div class="card card-body shadow p-4 mb-4">
                  <h4 class="mb-3">Langues</h4>
                  <ul class="list-inline mb-0 g-3">
                    <li class="list-inline-item mb-2" v-for="(value, key) in language" :key="key">
                      <input type="checkbox" class="btn-check" :id="'btn-check-' + key">
                      <label class="btn btn-light btn-primary-soft-check" :for="'btn-check-' + key">{{ key }}</label>
                    </li>
                  </ul>
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
import { getDownloadURL, ref as storageRef } from "firebase/storage"; // Importez getDownloadURL et ref de 'firebase/storage'

export default {
  name: 'Institution',
  data() {
    return {
      allInstitutions: [],
      institutionDetailsPath: '/institution/',
      institutions: [],
      currentPage: 1,
      itemsPerPage: 21,
      totalInstitutions: 0,
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
      language: {
        Français: false,
        Allemand: false,
        Anglais: false,
      },
      level: {
        PFP1A: false,
        PFP1B: false,
        PFP2: false,
        PFP3: false,
        PFP4: false,
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
    paginatedInstitutions() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredInstitutions.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.filteredInstitutions.length / this.itemsPerPage);
    },
    displayedRangeStart() {
      return (this.currentPage - 1) * this.itemsPerPage + 1;
    },
    displayedRangeEnd() {
      return Math.min(this.currentPage * this.itemsPerPage, this.totalInstitutions);
    },
    filteredInstitutions() {
      return this.allInstitutions.filter(institution => {
        let matchesCategory = true;
        let matchesCanton = true;
        let matchesLanguage = true;
        let matchesLevel = true;

        const selectedCategories = Object.keys(this.category.categories).filter(key => this.category.categories[key]);
        if (selectedCategories.length) {
          matchesCategory = selectedCategories.every(category => {
            return institution.checkBoxItems.includes(category) || institution[category] === "x";
          });
        }

        const selectedCantons = Object.keys(this.canton.cantons).filter(key => this.canton.cantons[key]);
        if (selectedCantons.length) {
          matchesCanton = selectedCantons.includes(institution.Canton);
        }

        const selectedLanguages = Object.keys(this.language).filter(key => this.language[key]);
        if (selectedLanguages.length) {
          matchesLanguage = selectedLanguages.some(lang => institution.Language && institution.Language.includes(lang));
        }

        const selectedLevels = Object.keys(this.level).filter(key => this.level[key]);
        if (selectedLevels.length) {
          matchesLevel = selectedLevels.includes(institution.Level);
        }

        return matchesCategory && matchesCanton && matchesLanguage && matchesLevel;
      });
    }
  },
  mounted() {
    this.fetchInstitutionsFromFirebase();
  },
  methods: {
    fetchInstitutionsFromFirebase() {
      const institutionsRef = ref(db, 'institutions/');
      onValue(institutionsRef, async (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const imagePromises = Object.keys(data).map(async key => {
            const institution = { id: key, ...data[key] };
            if (institution.imagePath) {
              const imageRef = storageRef(storage, institution.imagePath);
              institution.imageSrc = await getDownloadURL(imageRef).catch(() => 'https://eduport.webestica.com/assets/images/courses/4by3/21.jpg');
            } else {
              institution.imageSrc = 'https://eduport.webestica.com/assets/images/courses/4by3/21.jpg'; // Chemin d'une image par défaut si aucune image n'est fournie
            }
            return institution;
          });
          this.allInstitutions = await Promise.all(imagePromises);
          this.totalInstitutions = this.allInstitutions.length;
        } else {
          this.allInstitutions = [];
          this.totalInstitutions = 0;
        }
      });
    },
    applyFilters() {
      this.institutions = this.filteredInstitutions;
      this.totalInstitutions = this.institutions.length;
      this.currentPage = 1;
    },
    resetFilters() {
      Object.keys(this.category.categories).forEach(key => this.category.categories[key] = false);
      Object.keys(this.language).forEach(key => this.language[key] = false);
      Object.keys(this.level).forEach(key => this.level[key] = false);
      Object.keys(this.canton.cantons).forEach(key => this.canton.cantons[key] = false);
      this.institutions = [...this.allInstitutions];
      this.currentPage = 1;
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
    },
    goToDetails(id) {
      if (id) {
        this.$router.push({ name: 'InstitutionDetail', params: { id: id } });
      } else {
        console.error("ID is undefined for this institution.");
      }
    }
  }
}
</script>

<style scoped>
.card {
  cursor: pointer;
}

.img-card{
  width: 100%;
  height: 220px;
  border-radius: 0.5rem;
  object-fit: cover;
}
</style>
