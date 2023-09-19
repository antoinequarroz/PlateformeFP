<template>
  <section class="position-relative overflow-hidden pt-5 pt-lg-3">
    <div class="container">
      <h1>Institution</h1>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Institution',
  data() {
    return {

    }
  },
  mounted() {
    this.initMap();
    this.addLocationsToMap();
  },
  methods: {
    },
}
</script>

<style scoped>
/* Si vous avez des styles dans "style.css", vous pouvez les intégrer ici. */
</style>
