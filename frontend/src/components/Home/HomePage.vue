<template>
  <div>
    <InformationView />
    <InformationUtilisation />
    <Faq />

  </div>
</template>

<script>
import InformationView from "./InformationView.vue";
import Faq from "./Faq.vue";
import InformationUtilisation from "./InformationUtilisation.vue";

export default {
  name: "HomePage",
  components: {
    InformationView,
    Faq,
    InformationUtilisation,
  },
  // Ajoutez votre logique Vue.js ici si nécessaire
}
</script>

<style scoped>
/* Ajoutez vos styles CSS ici si nécessaire */
</style>
