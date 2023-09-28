<template>
  <section class="position-relative overflow-hidden pt-5 pt-lg-3">
    <div class="container">
      <h1>Institution</h1>
      <div class="row">
        <div class="col-md-4 mb-4" v-for="institution in institutions" :key="institution.id">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">{{ institution.Name }}</h5>
              <p class="card-text">
                Rue: {{ institution.Street }}<br>
                Lieu: {{ institution.Lieu }}<br>
                Canton: {{ institution.Canton }}<br>
                URL: <a :href="institution.URL" target="_blank">{{ institution.URL }}</a>
              </p>
              <button class="btn btn-sm btn-success-soft me-1 mb-1 mb-md-0"
                      @click="goToDetails(institution.id)">Détails</button>
              <button class="btn btn-sm btn-danger-soft me-1 mb-1 mb-md-0">Supprimer</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>

export default {
  name: 'Institution',
  data() {
    return {
      institutions: [] // pour stocker vos données depuis Firebase
    }
  },
  mounted() {
    const institutionsRef = ref(db, 'institutions/');
    onValue(institutionsRef, (snapshot) => {
      const data = snapshot.val();
      this.institutions = data ? Object.keys(data).map(key => ({ id: key, ...data[key] })) : [];
    });
  },
  methods: {
    goToDetails(instSlug) {
      this.$router.push({ name: 'institution-details', params: { instSlug } });
    },
  }
};
</script>

<style scoped>
/* Si vous avez des styles dans "style.css", vous pouvez les intégrer ici. */
.card {
  margin-top: 20px;
}
</style>
