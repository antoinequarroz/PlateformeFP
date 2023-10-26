<template>
  <div class="col-xl-12">
    <!-- User Progress START -->
    <div class="card bg-transparent border rounded-3 mb-4">
      <!-- Card header -->
      <div class="card-header bg-transparent border-bottom">
        <h3 class="card-header-title mb-0">Mon Progrès</h3>
      </div>
      <!-- Card body START -->
      <div class="card-body">

        <!-- PFP Progress -->
        <div class="mb-4">
          <h5>Progression des PFP:</h5>
          <div class="progress">
            <div class="progress-bar" role="progressbar" :style="{ width: pfpProgress + '%' }" :aria-valuenow="pfpProgress" aria-valuemin="0" aria-valuemax="100">{{ pfpProgress }}%</div>
          </div>
        </div>

        <!-- Internships Completed -->
        <div class="mb-4">
          <h5>Stages validés:</h5>
          <div class="d-flex align-items-center">
            <i class="bi bi-briefcase me-2" style="font-size: 1.5rem;"></i>
            <span>{{ internshipsCompleted }} stages validés</span>
          </div>
        </div>

        <!-- School Reference Teacher -->
        <div class="mb-4">
          <h5>Professeur référent:</h5>
          <div class="d-flex align-items-center">
            <i class="bi bi-person-circle me-2" style="font-size: 1.5rem;"></i>
            <span>{{ referenceTeacher }}</span>
          </div>
        </div>

        <!-- Internship Criteria -->
        <div class="mb-4">
          <h5>Critères de stage à remplir:</h5>
          <ul class="list-group">
            <li v-for="criteria in internshipCriteria" :key="criteria.id" class="list-group-item">
              {{ criteria.description }}
            </li>
          </ul>
        </div>
      </div>
      <!-- Card body END -->
    </div>
    <!-- User Progress END -->
  </div>
</template>

<script>
export default {
  name: 'HomeUserProfile',
  data() {
    return {
      pfpProgress: 60,  // Exemple de valeur
      internshipsCompleted: 2,  // Exemple de valeur
      referenceTeacher: 'M. Dupont',  // Exemple de valeur
      internshipCriteria: [  // Liste d'exemple
        { id: 1, description: 'Critère 1 à remplir' },
        { id: 2, description: 'Critère 2 à remplir' },
        // ... Ajoutez d'autres critères si nécessaire
      ]
    };
  }
}
</script>

<style scoped>
/* Styles spécifiques au composant HomeUserProfile ici */
</style>
