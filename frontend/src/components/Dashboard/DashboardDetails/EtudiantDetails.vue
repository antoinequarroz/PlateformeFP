<template>
  <div class="container">
    <section class="pt-5">
      <div class="container">
        <div class="row g-4 g-sm-5">
          <!-- Left sidebar START -->
          <div class="col-xl-4">
            <div class="row justify-content-center">
              <div class="col-md-8 col-xl-12">
                <!-- Card START -->
                <div class="card shadow">
                  <!-- Image -->
                  <div class="rounded-3">
                    <img :src="yourImagePath" alt="Image placeholder">
                  </div>
                </div>
                <br>
                <!-- Card END -->
                <div>
                  <button class="btn btn-primary-soft me-1 mb-1 mb-md-0 mb-3 col-3">Réserver</button>
                </div>
              </div>
            </div>
          </div>
          <!-- Left sidebar END -->

          <!-- Main content START -->
          <div class="col-xl-8">
            <!-- Title -->
            <h1 class="mb-4">Titre</h1>

            <!-- Rating -->
            <div class="d-flex align-items-center mb-4">
              <h2 class="me-3 mb-0">Lieu</h2>
              <div>
                <a class="badge bg-primary bg-opacity-10 text-primary">Catégorie</a>
              </div>
            </div>

            <!-- Content -->
            <h5>Description</h5>
            <p>Description ici</p>

            <!-- Additional info -->
            <div class="row mb-3">
              <!-- Vous pouvez ajouter des informations supplémentaires ici si nécessaire -->
            </div>

            <!-- Book detail START -->
            <div class="col-12">
              <!-- Tabs START -->
              <ul class="nav nav-pills nav-pills-bg-soft px-3" id="book-pills-tab" role="tablist">
                <!-- Vous pouvez ajouter des onglets ici si nécessaire -->
              </ul>
              <!-- Tabs END -->

              <!-- Tab contents START -->
              <div class="tab-content pt-4 px-3" id="book-pills-tabContent">
                <!-- Vous pouvez ajouter du contenu d'onglet ici si nécessaire -->
              </div>
              <!-- Tab contents END -->
            </div>
            <!-- Book detail END -->
          </div>
          <!-- Main content END -->
        </div> <!-- Row END -->
      </div>
    </section>
  </div>
</template>

<script>
import yourImage from '../../../assets/images/event/10.jpg';
export default {
  data() {
    return {
      yourImagePath: yourImage
    };
  }
};
</script>

<style scoped>
/* Vos styles CSS ici si nécessaire */
</style>
