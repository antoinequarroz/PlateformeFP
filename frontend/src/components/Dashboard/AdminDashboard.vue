<template>
  <div class="dashboard">
    <nav class="navbar sidebar navbar-expand-xl navbar-dark bg-dark">
      <!-- Navbar brand for xl START -->
      <div class="d-flex align-items-center">
        <a class="navbar-brand" href="#">
          <img class="navbar-brand-item" src="assets/images/FR-DE_HEDS.png" alt="">
        </a>
      </div>

      <div class="offcanvas offcanvas-start flex-row custom-scrollbar h-100" data-bs-backdrop="true" tabindex="-1" id="offcanvasSidebar">
        <div class="offcanvas-body sidebar-content d-flex flex-column bg-dark">
          <!-- Navbar brand for xl END -->

          <!-- Sidebar menu START -->
          <ul class="navbar-nav flex-column" id="navbar-sidebar">

            <!-- Menu item 1 -->
            <li class="nav-item nav-link active"><i class="bi bi-house fa-fw me-2"></i>Dashboard</li>
            <hr>


            <!-- menu item 2 -->
            <li class="nav-item"> <a class="nav-link"><i class="fas fa-regular fa-school fa-fw me-2"></i>Étudiant</a></li>

            <!-- Menu item 3 -->
            <li class="nav-item"> <a class="nav-link"><i class="fas fa-regular fa-hospital fa-fw me-2"></i>Institution</a></li>

            <!-- Menu item 4 -->
            <li class="nav-item"> <a class="nav-link"><i class="fas fa-football-ball fa-fw me-2"></i>SAE</a></li>

            <!-- Menu item 6 -->
            <li class="nav-item"> <a class="nav-link"><i class="fas fa-align-center fa-fw me-2"></i>Validation</a></li>

            <!-- Menu item 7 -->
            <li class="nav-item"> <a class="nav-link"> <i class="fas fa-user fa-fw me-2"></i>Nouvel utilisateur</a></li>

            <!-- Menu item 8 -->
            <li class="nav-item"> <a class="nav-link"> <i class="fas fa-stamp fa-fw me-2"></i>Statistiques</a></li>

            <!-- Menu item 9 -->
            <li class="nav-item"> <a class="nav-link"> <i class="fas fa-question fa-fw me-2"></i>FAQ's</a></li>

          </ul>
          <!-- Sidebar menu end -->

          <!-- Sidebar footer START -->
          <div class="px-3 mt-auto pt-3">
            <div class="d-flex align-items-center justify-content-between text-primary-hover">
              <a class="h5 mb-0 text-body" href="admin-setting.html" data-bs-toggle="tooltip" data-bs-placement="top" title="Settings">
                <i class="bi bi-gear-fill"></i>
              </a>
              <a class="h5 mb-0 text-body" href="/" data-bs-toggle="tooltip" data-bs-placement="top" title="Home">
                <i class="bi bi-globe"></i>
              </a>
              <a class="h5 mb-0 text-body" href="/" data-bs-toggle="tooltip" data-bs-placement="top" title="Sign out">
                <i class="bi bi-power"></i>
              </a>
            </div>
          </div>
          <!-- Sidebar footer END -->
        </div>
      </div>
    </nav>

    <!-- Page content START -->
    <div class="page-content">
      <!-- Page main content START -->
      <div class="page-content-wrapper border">

        <!-- Title -->
        <div class="row">
          <div class="col-12 mb-3">
            <h1 class="h3 mb-2 mb-sm-0">Admin Dashboard</h1>
          </div>
        </div>
        <CounterBoxes/>
        <StatsBox :chartId="'1'" :chartData="charts[0]" :chartTitle="`Stats PFP1A`" />

        <div class="row g-4">
          <TeamSection/>
          <FaqBox/>
        </div>

      </div>
    </div>

  </div>
</template>
<script>

import CounterBoxes from "./DashboardItems/CounterBoxes.vue";
import StatsBox from "./DashboardItems/StatsBox.vue";
import TeamSection from "./DashboardItems/TeamSection.vue";
import FaqBox from "./DashboardItems/FaqBox.vue";
import Institution from "../Home/Institution.vue";

export default {
  name: 'AminDashboard',
  data() {
    return {
      charts: [
        [
          {
            name: "Réussite",
            data: [10, 41, 35, 51, 49, 62, 69, 91, 148, 12, 4, 4]
          },
          {
            name: "Échec",
            data: [12, 32, 23, 75, 49, 52, 69, 51, 38, 120, 84, 4]
          }
        ],
        // plus de données de graphique ici si nécessaire
      ],

    }
  },
  components: {
    Institution,
    FaqBox,
    TeamSection,
    StatsBox,
    CounterBoxes
    // importez vos composants ici
  },
};
</script>

<style scoped>
/* Ajoutez vos styles CSS ici si nécessaire */
</style>
